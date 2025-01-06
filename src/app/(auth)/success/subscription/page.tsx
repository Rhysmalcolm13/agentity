import { Sparkles } from 'lucide-react';
import { SuccessLayout } from '@/components/shared/success-layout';

export default function SubscriptionSuccessPage(): JSX.Element { 
  return (
    <SuccessLayout
      title="Welcome to Premium!"
      description="Your subscription has been activated successfully. Enjoy all the premium features of your account."
      primaryAction={{
        label: "Explore Features",
        href: "/dashboard/features",
      }}
      secondaryAction={{
        label: "View Plan",
        href: "/dashboard/billing",
      }}
    >
      <Sparkles className="h-24 w-24 text-primary animate-in zoom-in" />
    </SuccessLayout>
  );
} 