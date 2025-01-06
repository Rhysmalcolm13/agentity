/**
 * Enum for authentication error codes
 * @description Standardized error codes for authentication-related errors
 */
export enum AuthErrorCode {
  // OAuth Errors
  OAUTH_PROVIDER_ERROR = 'auth/oauth-provider-error',
  OAUTH_ACCESS_DENIED = 'auth/oauth-access-denied',
  OAUTH_POPUP_CLOSED = 'auth/oauth-popup-closed',
  OAUTH_CALLBACK_ERROR = 'auth/oauth-callback-error',
  
  // Session Errors
  SESSION_EXPIRED = 'auth/session-expired',
  SESSION_INVALID = 'auth/session-invalid',
  
  // Account Errors
  ACCOUNT_EXISTS = 'auth/account-exists',
  ACCOUNT_DISABLED = 'auth/account-disabled',
  ACCOUNT_LOCKED = 'auth/account-locked',
  
  // General Auth Errors
  UNAUTHORIZED = 'auth/unauthorized',
  INVALID_CREDENTIALS = 'auth/invalid-credentials',
  RATE_LIMIT_EXCEEDED = 'auth/rate-limit-exceeded',
  PROFILE_INCOMPLETE = 'auth/profile-incomplete',
  
  // Upload Errors
  UPLOAD_ERROR = 'auth/upload-error',
}

/**
 * Interface for authentication errors
 * @description Standardized error structure for authentication-related errors
 */
export interface AuthError extends Error {
  code: AuthErrorCode;
  data?: Record<string, unknown>;
}

/**
 * Class for creating standardized authentication errors
 * @description Used to create consistent error objects across the authentication system
 */
export class AuthenticationError extends Error implements AuthError {
  constructor(
    public code: AuthErrorCode,
    message: string,
    public data?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }

  /**
   * Creates a JSON representation of the error
   * @returns Object containing error details
   */
  toJSON() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}

/**
 * Type for OAuth provider names
 */
export type OAuthProvider = 'github' | 'google';

/**
 * Interface for OAuth profile data
 */
export interface OAuthProfile {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  provider: OAuthProvider;
} 