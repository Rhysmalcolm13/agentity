import { Settings2 } from 'lucide-react';
import { SuccessLayout } from '@/components/shared/success-layout';

export default function SettingsSuccessPage(): JSX.Element { 
  return (
    <SuccessLayout
      title="Settings Updated"
      description="Your settings have been updated successfully. The changes are now in effect."
      primaryAction={{
        label: "Back to Settings",
        href: "/dashboard/settings",
      }}
      secondaryAction={{
        label: "Go to Dashboard",
        href: "/dashboard",
      }}
    >
      <Settings2 className="h-24 w-24 text-primary animate-in zoom-in" />
    </SuccessLayout>
  );
} 