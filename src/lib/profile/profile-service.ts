import { prisma } from "@/lib/prisma";
import { AuthenticationError, AuthErrorCode } from "@/lib/types/auth";

export interface ProfileData {
  name?: string;
  email?: string;
  image?: string;
  // Add any additional profile fields here
}

export class ProfileService {
  private static instance: ProfileService;
  private constructor() {}

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
  }

  /**
   * Updates a user's profile
   * @param userId The ID of the user
   * @param data The profile data to update
   */
  async updateProfile(userId: string, data: ProfileData): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        profileCompleted: this.isProfileComplete(data),
      },
    });
  }

  /**
   * Checks if a user's profile is complete
   * @param userId The ID of the user
   * @returns True if profile is complete
   */
  async checkProfileCompletion(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        emailVerified: true,
        profileCompleted: true,
      },
    });

    if (!user) {
      throw new AuthenticationError(
        AuthErrorCode.UNAUTHORIZED,
        'User not found'
      );
    }

    return user.profileCompleted;
  }

  /**
   * Enforces profile completion requirement
   * @param userId The ID of the user
   * @throws AuthenticationError if profile is incomplete
   */
  async enforceProfileCompletion(userId: string): Promise<void> {
    const isComplete = await this.checkProfileCompletion(userId);
    
    if (!isComplete) {
      throw new AuthenticationError(
        AuthErrorCode.PROFILE_INCOMPLETE,
        'Please complete your profile to continue',
        { redirectUrl: '/profile/complete' }
      );
    }
  }

  /**
   * Determines if profile data is complete
   * @param data Profile data to check
   * @returns True if profile data is complete
   */
  private isProfileComplete(data: ProfileData): boolean {
    // Add your profile completion criteria here
    return !!(
      data.name &&
      data.email &&
      // Add additional required field checks here
      true
    );
  }

  /**
   * Gets profile completion progress
   * @param userId The ID of the user
   * @returns Profile completion percentage and missing fields
   */
  async getProfileProgress(userId: string): Promise<{
    percentage: number;
    missingFields: string[];
  }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        emailVerified: true,
        image: true,
      },
    });

    if (!user) {
      throw new AuthenticationError(
        AuthErrorCode.UNAUTHORIZED,
        'User not found'
      );
    }

    const requiredFields = ['name', 'email', 'emailVerified'];
    const missingFields = requiredFields.filter(field => !user[field as keyof typeof user]);
    const percentage = Math.round(
      ((requiredFields.length - missingFields.length) / requiredFields.length) * 100
    );

    return {
      percentage,
      missingFields,
    };
  }
} 