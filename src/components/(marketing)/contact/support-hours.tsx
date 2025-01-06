import { Clock } from 'lucide-react';

const supportHours = [
  {
    timezone: 'AEST (Melbourne)',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
    note: 'Response within 24 hours',
  },
];

export function SupportHours() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Support Hours</h3>
      </div>
      <div className="mt-4 space-y-4">
        {supportHours.map((schedule) => (
          <div key={schedule.timezone}>
            <p className="font-medium">{schedule.timezone}</p>
            <p className="text-sm text-muted-foreground">{schedule.hours}</p>
            <p className="mt-1 text-xs text-muted-foreground">{schedule.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 