import { LogOut } from 'lucide-react';
import { ErrorLayout } from '@/components/shared/error-layout';

export default function SessionExpiredPage() {
  return (
    <ErrorLayout
      title="Session Expired"
      description="Your session has expired for security reasons. Please sign in again to continue."
      primaryAction={{
        label: "Sign In",
        href: "/login",
      }}
      secondaryAction={{
        label: "Go Home",
        href: "/",
      }}
    >
      <LogOut className="h-24 w-24 text-muted-foreground" />
    </ErrorLayout>
  );
} 