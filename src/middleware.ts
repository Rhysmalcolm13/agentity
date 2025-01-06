import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SessionService } from '@/lib/session/session-service';
import { AuthenticationError, AuthErrorCode } from '@/lib/types/auth';

// Paths that don't require authentication
const publicPaths = [
  '/login',
  '/register',
  '/reset-password',
  '/verify-email',
  '/auth/error',
];

// Paths that are API routes and don't require authentication
const publicApiPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip session validation for public paths
  if (publicPaths.some(path => pathname.startsWith(path)) ||
      publicApiPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  try {
    // Get session token from cookie
    const sessionToken = request.cookies.get('next-auth.session-token')?.value;
    
    if (!sessionToken) {
      throw new AuthenticationError(
        AuthErrorCode.SESSION_INVALID,
        'No session token found'
      );
    }

    // Validate and potentially refresh the session
    const sessionService = SessionService.getInstance();
    const session = await sessionService.validateSession(sessionToken);

    // Check if session needs to be refreshed
    const now = Date.now();
    const updateAge = 24 * 60 * 60 * 1000; // 24 hours
    if (now - session.expires.getTime() < updateAge) {
      await sessionService.updateSession(sessionToken);
    }

    return NextResponse.next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      // Redirect to login for non-API routes
      if (!pathname.startsWith('/api/')) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
      }

      // Return error response for API routes
      return NextResponse.json(
        { error: error.toJSON() },
        { status: 401 }
      );
    }

    // Handle unexpected errors
    console.error('Middleware error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 