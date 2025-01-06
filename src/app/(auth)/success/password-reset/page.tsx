import { KeyRound } from 'lucide-react';
import { SuccessLayout } from '@/components/shared/success-layout';

export default function PasswordResetSuccessPage(): JSX.Element { 
  return (
    <SuccessLayout
      title="Password Reset Complete"
      description="Your password has been reset successfully. You can now sign in with your new password."
      primaryAction={{
        label: "Sign In",
        href: "/login",
      }}
      secondaryAction={{
        label: "Need Help?",
        href: "/contact",
      }}
    >
      <KeyRound className="h-24 w-24 text-primary animate-in zoom-in" />
    </SuccessLayout>
  );
} 