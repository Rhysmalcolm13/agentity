import { Mail } from 'lucide-react';
import { SuccessLayout } from '@/components/shared/success-layout';

export default function ResetPasswordSuccess(): JSX.Element { 
  return (
    <SuccessLayout
      title="Check Your Email"
      description="We've sent you an email with instructions to reset your password. Please check your inbox and follow the link to complete the process."
      primaryAction={{
        label: "Return to Login",
        href: "/login",
      }}
      secondaryAction={{
        label: "Try again",
        href: "/reset-password", 
      }}
    >
      <Mail className="h-24 w-24 text-primary animate-in zoom-in" />
    </SuccessLayout>
  );
} 