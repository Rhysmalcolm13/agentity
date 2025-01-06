import { prisma } from "@/lib/prisma";
import { AuthenticationError, AuthErrorCode } from "@/lib/types/auth";

export interface SessionOptions {
  maxAge?: number;        // Maximum age of the session in seconds
  updateAge?: number;     // Age at which to update the session token
  rememberMe?: boolean;   // Whether to extend session lifetime
}

const DEFAULT_OPTIONS: Required<SessionOptions> = {
  maxAge: 30 * 24 * 60 * 60,    // 30 days
  updateAge: 24 * 60 * 60,      // 24 hours
  rememberMe: false,
};

export class SessionService {
  private static instance: SessionService;
  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  /**
   * Creates a new session for a user
   * @param userId The ID of the user
   * @param options Session options
   * @returns The created session
   */
  async createSession(userId: string, options: SessionOptions = {}): Promise<any> {
    const { maxAge, rememberMe } = { ...DEFAULT_OPTIONS, ...options };
    const expires = new Date(Date.now() + (rememberMe ? maxAge * 1000 : 24 * 60 * 60 * 1000));

    return await prisma.session.create({
      data: {
        sessionToken: this.generateSessionToken(),
        userId,
        expires,
      },
    });
  }

  /**
   * Validates a session
   * @param sessionToken The session token to validate
   * @returns The session if valid
   * @throws AuthenticationError if session is invalid or expired
   */
  async validateSession(sessionToken: string): Promise<any> {
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session) {
      throw new AuthenticationError(
        AuthErrorCode.SESSION_INVALID,
        'Invalid session'
      );
    }

    if (new Date() > session.expires) {
      await this.deleteSession(sessionToken);
      throw new AuthenticationError(
        AuthErrorCode.SESSION_EXPIRED,
        'Session has expired'
      );
    }

    return session;
  }

  /**
   * Updates a session's expiry time
   * @param sessionToken The session token to update
   * @param options Session options
   */
  async updateSession(sessionToken: string, options: SessionOptions = {}): Promise<void> {
    const { maxAge, rememberMe } = { ...DEFAULT_OPTIONS, ...options };
    const expires = new Date(Date.now() + (rememberMe ? maxAge * 1000 : 24 * 60 * 60 * 1000));

    await prisma.session.update({
      where: { sessionToken },
      data: { expires },
    });
  }

  /**
   * Deletes a session
   * @param sessionToken The session token to delete
   */
  async deleteSession(sessionToken: string): Promise<void> {
    await prisma.session.delete({
      where: { sessionToken },
    });
  }

  /**
   * Deletes all sessions for a user
   * @param userId The ID of the user
   */
  async deleteAllUserSessions(userId: string): Promise<void> {
    await prisma.session.deleteMany({
      where: { userId },
    });
  }

  /**
   * Generates a cryptographically secure session token
   */
  private generateSessionToken(): string {
    return Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('base64url');
  }
} 