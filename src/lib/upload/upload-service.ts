import { AuthenticationError, AuthErrorCode } from "@/lib/types/auth";

export interface UploadConfig {
  maxSize: number;        // Maximum file size in bytes
  allowedTypes: string[]; // Allowed MIME types
}

const AVATAR_CONFIG: UploadConfig = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
};

export class UploadService {
  private static instance: UploadService;
  private constructor() {}

  public static getInstance(): UploadService {
    if (!UploadService.instance) {
      UploadService.instance = new UploadService();
    }
    return UploadService.instance;
  }

  /**
   * Validates a file upload
   * @param file The file to validate
   * @param config Upload configuration
   * @throws AuthenticationError if validation fails
   */
  validateFile(file: File, config: UploadConfig = AVATAR_CONFIG): void {
    if (file.size > config.maxSize) {
      throw new AuthenticationError(
        AuthErrorCode.UPLOAD_ERROR,
        `File size exceeds maximum allowed size of ${config.maxSize / (1024 * 1024)}MB`,
      );
    }

    if (!config.allowedTypes.includes(file.type)) {
      throw new AuthenticationError(
        AuthErrorCode.UPLOAD_ERROR,
        `File type ${file.type} is not allowed. Allowed types: ${config.allowedTypes.join(', ')}`,
      );
    }
  }

  /**
   * Processes an avatar image
   * @param file The image file to process
   * @returns The processed file data
   */
  async processAvatar(file: File): Promise<{ url: string; key: string }> {
    try {
      // Validate the file
      this.validateFile(file);

      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload to your storage service
      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload avatar');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new AuthenticationError(
        AuthErrorCode.UPLOAD_ERROR,
        error instanceof Error ? error.message : 'Failed to process avatar',
      );
    }
  }

  /**
   * Generates a unique file key
   * @param fileName Original file name
   * @returns Unique file key
   */
  private generateFileKey(fileName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = fileName.split('.').pop();
    return `${timestamp}-${random}.${extension}`;
  }
} 