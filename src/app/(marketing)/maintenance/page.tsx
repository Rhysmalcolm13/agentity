import { Wrench } from 'lucide-react';
import { ErrorLayout } from '@/components/shared/error-layout';

export default function MaintenancePage() {
  return (
    <ErrorLayout
      title="Under Maintenance"
      description="We're currently performing scheduled maintenance to improve our service. Please check back in a few minutes."
      primaryAction={{
        label: "Check Status",
        href: "https://status.agentity.ai",
      }}
      secondaryAction={{
        label: "Contact Support",
        href: "/contact",
      }}
    >
      <Wrench className="h-24 w-24 text-primary animate-pulse" />
    </ErrorLayout>
  );
} 