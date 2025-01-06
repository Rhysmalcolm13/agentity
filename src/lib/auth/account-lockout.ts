import { prisma } from "@/lib/prisma";
import { AuthenticationError, AuthErrorCode } from "@/lib/types/auth";

interface LockoutConfig {
  maxAttempts: number;      // Maximum number of failed attempts before lockout
  lockoutDuration: number;  // Duration of lockout in seconds
  attemptWindow: number;    // Window in seconds to track failed attempts
}

const DEFAULT_CONFIG: LockoutConfig = {
  maxAttempts: 5,
  lockoutDuration: 15 * 60,  // 15 minutes
  attemptWindow: 60 * 60,    // 1 hour
};

export class AccountLockoutService {
  private static instance: AccountLockoutService;
  private constructor() {}

  public static getInstance(): AccountLockoutService {
    if (!AccountLockoutService.instance) {
      AccountLockoutService.instance = new AccountLockoutService();
    }
    return AccountLockoutService.instance;
  }

  /**
   * Records a failed login attempt
   * @param email User's email
   * @throws AuthenticationError if account is locked
   */
  async recordFailedAttempt(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        lockedUntil: true,
        failedAttempts: true,
        lastFailedAttempt: true,
      },
    });

    if (!user) return; // Don't reveal user existence

    // Check if account is locked
    if (user.lockedUntil && new Date() < user.lockedUntil) {
      const remainingTime = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000);
      throw new AuthenticationError(
        AuthErrorCode.ACCOUNT_LOCKED,
        'Account is temporarily locked. Please try again later.',
        { remainingTime }
      );
    }

    // Reset failed attempts if outside window
    const now = new Date();
    const resetAttempts = !user.lastFailedAttempt || 
      (now.getTime() - user.lastFailedAttempt.getTime()) > (DEFAULT_CONFIG.attemptWindow * 1000);

    const failedAttempts = resetAttempts ? 1 : (user.failedAttempts || 0) + 1;
    const shouldLock = failedAttempts >= DEFAULT_CONFIG.maxAttempts;
    const lockedUntil = shouldLock ? new Date(now.getTime() + DEFAULT_CONFIG.lockoutDuration * 1000) : null;

    await prisma.user.update({
      where: { email },
      data: {
        failedAttempts,
        lastFailedAttempt: now,
        lockedUntil,
      },
    });

    if (shouldLock) {
      throw new AuthenticationError(
        AuthErrorCode.ACCOUNT_LOCKED,
        'Too many failed attempts. Account is temporarily locked.',
        { remainingTime: DEFAULT_CONFIG.lockoutDuration }
      );
    }
  }

  /**
   * Resets failed login attempts after successful login
   * @param email User's email
   */
  async resetAttempts(email: string): Promise<void> {
    await prisma.user.update({
      where: { email },
      data: {
        failedAttempts: 0,
        lastFailedAttempt: null,
        lockedUntil: null,
      },
    });
  }

  /**
   * Checks if an account is locked
   * @param email User's email
   * @returns True if account is locked
   */
  async isAccountLocked(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { lockedUntil: true },
    });

    return !!(user?.lockedUntil && new Date() < user.lockedUntil);
  }
} 