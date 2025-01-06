import { MailCheck } from 'lucide-react';
import { SuccessLayout } from '@/components/shared/success-layout';

export default function EmailVerificationSuccessPage(): JSX.Element { 
  return (
    <SuccessLayout
      title="Email Verified!"
      description="Your email address has been verified successfully. You now have full access to your account."
      primaryAction={{
        label: "Go to Dashboard",
        href: "/dashboard",
      }}
      secondaryAction={{
        label: "Edit Profile",
        href: "/dashboard/profile",
      }}
    >
      <MailCheck className="h-24 w-24 text-primary animate-in zoom-in" />
    </SuccessLayout>
  );
} 