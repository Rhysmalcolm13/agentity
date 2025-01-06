'use client';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6 lg:max-w-2xl lg:px-8">
        <div className="relative h-12 w-12">
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
        <p className="mt-4 text-base text-muted-foreground">
          Loading...
        </p>
      </div>
    </div>
  );
} 