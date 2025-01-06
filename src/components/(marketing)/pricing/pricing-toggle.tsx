'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: (value: boolean) => void;
}

export function PricingToggle({ isAnnual, onToggle }: PricingToggleProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-2">
        <span className={`text-sm ${!isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
          Monthly
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={onToggle}
        />
        <span className={`text-sm ${isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
          Annual
        </span>
        <Badge variant="secondary" className="ml-2">
          Save 20%
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">
        {isAnnual ? 'Billed annually' : 'Billed monthly'}
      </p>
    </div>
  );
} 