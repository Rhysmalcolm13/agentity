'use client';

import { FileQuestion } from 'lucide-react';
import { ErrorLayout } from '@/components/shared/error-layout';

export default function NotFound() {
  return (
    <ErrorLayout
      title="Page not found"
      description="Sorry, we couldn't find the page you're looking for. Please check the URL or try navigating back."
      primaryAction={{
        label: "Go Home",
        href: "/",
      }}
      secondaryAction={{
        label: "Contact Support",
        href: "/contact",
      }}
    >
      <FileQuestion className="h-24 w-24 text-muted-foreground" />
    </ErrorLayout>
  );
} 