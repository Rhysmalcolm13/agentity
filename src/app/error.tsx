'use client';

import { useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { ErrorLayout } from '@/components/shared/error-layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <ErrorLayout
      title="Something went wrong!"
      description={
        process.env.NODE_ENV === 'development'
          ? `Error: ${error.message}`
          : 'An error occurred while processing your request. Please try again later.'
      }
      primaryAction={{
        label: "Try Again",
        onClick: () => reset(),
      }}
      secondaryAction={{
        label: "Go Home",
        href: "/",
      }}
    >
      <XCircle className="h-24 w-24 text-destructive" />
    </ErrorLayout>
  );
} 