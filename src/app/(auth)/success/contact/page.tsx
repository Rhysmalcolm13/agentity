import { CheckCircle } from 'lucide-react';
import { SuccessLayout } from '@/components/shared/success-layout';

export default function ContactSuccessPage(): JSX.Element { 
  return (
    <SuccessLayout
      title="Message Sent!"
      description="Thank you for reaching out. We've received your message and will get back to you within 24 hours."
      primaryAction={{
        label: "Back to Home",
        href: "/",
      }}
      secondaryAction={{
        label: "View FAQs",
        href: "/faq",
      }}
    >
      <CheckCircle className="h-24 w-24 text-primary animate-in zoom-in" />
    </SuccessLayout>
  );
} 