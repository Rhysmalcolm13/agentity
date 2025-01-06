import { CreditCard } from 'lucide-react';
import { SuccessLayout } from '@/components/shared/success-layout';

export default function PaymentSuccessPage(): JSX.Element { 
  return (
    <SuccessLayout
      title="Payment Successful!"
      description="Thank you for your payment. Your transaction has been completed successfully."
      primaryAction={{
        label: "View Receipt",
        href: "/dashboard/billing",
      }}
      secondaryAction={{
        label: "Go to Dashboard",
        href: "/dashboard",
      }}
    >
      <CreditCard className="h-24 w-24 text-primary animate-in zoom-in" />
    </SuccessLayout>
  );
} 