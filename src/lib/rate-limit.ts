import { NextResponse } from 'next/server';
import { AuthErrorCode, AuthenticationError } from '@/lib/types/auth';

interface RateLimitConfig {
  windowMs: number;    // Time window in milliseconds
  maxRequests: number; // Maximum number of requests allowed in the window
}

interface RateLimitState {
  timestamp: number;
  tokens: number;
}

type RateLimitError = Record<string, unknown> & {
  resetTime: string;
  retryAfter: number;
};

const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,         // 100 requests per window
};

/**
 * Rate limiting state storage using a Map
 * In production, you would use Redis or a similar distributed store
 */
const rateLimitStore = new Map<string, RateLimitState>();

/**
 * Cleans up expired rate limit states
 * @param windowMs Time window in milliseconds
 */
function cleanupStore(windowMs: number): void {
  const now = Date.now();
  rateLimitStore.forEach((state, key) => {
    if (now - state.timestamp > windowMs) {
      rateLimitStore.delete(key);
    }
  });
}

/**
 * Rate limiting middleware using token bucket algorithm
 * @param identifier Unique identifier for the rate limit (e.g., IP address, user ID)
 * @param config Rate limit configuration
 */
export function rateLimit(
  identifier: string,
  config: Partial<RateLimitConfig> = {}
): void {
  const { windowMs, maxRequests } = { ...defaultConfig, ...config };
  const now = Date.now();

  // Clean up expired states periodically
  if (Math.random() < 0.1) { // 10% chance to cleanup on each request
    cleanupStore(windowMs);
  }

  // Get or create rate limit state
  let state = rateLimitStore.get(identifier);
  if (!state) {
    state = {
      timestamp: now,
      tokens: maxRequests,
    };
  } else {
    // Calculate token replenishment
    const timePassed = now - state.timestamp;
    const tokensToAdd = Math.floor((timePassed / windowMs) * maxRequests);
    state.tokens = Math.min(maxRequests, state.tokens + tokensToAdd);
    state.timestamp = now;
  }

  // Check if rate limit is exceeded
  if (state.tokens <= 0) {
    const resetTime = new Date(state.timestamp + windowMs);
    const errorData: RateLimitError = {
      resetTime: resetTime.toISOString(),
      retryAfter: Math.ceil((state.timestamp + windowMs - now) / 1000),
    };

    throw new AuthenticationError(
      AuthErrorCode.RATE_LIMIT_EXCEEDED,
      'Too many requests, please try again later',
      errorData
    );
  }

  // Consume a token
  state.tokens--;
  rateLimitStore.set(identifier, state);
}

/**
 * Higher-order function to apply rate limiting to an API route
 * @param handler API route handler
 * @param config Rate limit configuration
 * @returns Rate limited API route handler
 */
export function withRateLimit(
  handler: (req: Request) => Promise<NextResponse>,
  config?: Partial<RateLimitConfig>
) {
  return async function rateLimitHandler(req: Request): Promise<NextResponse> {
    try {
      // Get client identifier (IP address in this case)
      // In production, you might want to use a more sophisticated method
      const forwarded = req.headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
      const identifier = `${req.method}:${new URL(req.url).pathname}:${ip}`;

      // Apply rate limiting
      rateLimit(identifier, config);

      // Call the original handler
      return await handler(req);
    } catch (error) {
      if (error instanceof AuthenticationError && error.data) {
        const headers = new Headers();
        const data = error.data as RateLimitError;
        headers.set('Retry-After', String(data.retryAfter));
        headers.set('X-RateLimit-Reset', data.resetTime);

        return NextResponse.json(
          { error: error.toJSON() },
          {
            status: 429,
            headers,
          }
        );
      }
      throw error;
    }
  };
} 