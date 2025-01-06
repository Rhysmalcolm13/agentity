import { UserCheck } from 'lucide-react';
import { SuccessLayout } from '@/components/shared/success-layout';

export default function RegistrationSuccessPage(): JSX.Element { 
  return (
    <SuccessLayout
      title="Registration Complete!"
      description="Your account has been created successfully. Please check your email to verify your account."
      primaryAction={{
        label: "Go to Dashboard",
        href: "/dashboard",
      }}
      secondaryAction={{
        label: "View Docs",
        href: "/docs/getting-started",
      }}
    >
      <UserCheck className="h-24 w-24 text-primary animate-in zoom-in" />
    </SuccessLayout>
  );
} 