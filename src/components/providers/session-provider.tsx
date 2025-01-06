'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SessionService, SessionOptions } from '@/lib/session/session-service';

interface SessionProviderProps {
  children: React.ReactNode;
  refreshInterval?: number;
  sessionOptions?: SessionOptions;
}

function SessionStateManager({ refreshInterval = 5 * 60, sessionOptions }: Omit<SessionProviderProps, 'children'>) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      const sessionService = SessionService.getInstance();

      const refreshSession = async () => {
        try {
          const sessionToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('next-auth.session-token'))
            ?.split('=')[1];

          if (sessionToken) {
            await sessionService.updateSession(sessionToken, sessionOptions);
          }
        } catch (error) {
          console.error('Failed to refresh session:', error);
        }
      };

      // Set up periodic session refresh
      const refreshTimer = setInterval(refreshSession, refreshInterval * 1000);

      // Clean up on unmount
      return () => {
        clearInterval(refreshTimer);
      };
    }
  }, [session, status, refreshInterval, sessionOptions]);

  return null;
}

export function SessionProvider({ children, refreshInterval, sessionOptions }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider>
      <SessionStateManager refreshInterval={refreshInterval} sessionOptions={sessionOptions} />
      {children}
    </NextAuthSessionProvider>
  );
}