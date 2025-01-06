import { Wifi } from 'lucide-react';
import { ErrorLayout } from '@/components/shared/error-layout';

export default function NetworkErrorPage() {
  return (
    <ErrorLayout
      title="Network Error"
      description="We're having trouble connecting to our servers. Please check your internet connection and try again."
      primaryAction={{
        label: "Try Again",
        href: "#",
      }}
      secondaryAction={{
        label: "Go Home",
        href: "/",
      }}
    >
      <Wifi className="h-24 w-24 text-destructive" />
    </ErrorLayout>
  );
} 