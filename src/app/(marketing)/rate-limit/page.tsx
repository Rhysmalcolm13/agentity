import { Timer } from 'lucide-react';
import { ErrorLayout } from '@/components/shared/error-layout';

export default function RateLimitPage() {
  return (
    <ErrorLayout
      title="Rate Limit Exceeded"
      description="You've made too many requests in a short period. Please wait a moment before trying again."
      primaryAction={{
        label: "Go Home",
        href: "/",
      }}
      secondaryAction={{
        label: "View Docs",
        href: "/docs/rate-limits",
      }}
    >
      <Timer className="h-24 w-24 text-warning" />
    </ErrorLayout>
  );
} 