'use client';

import { Badge } from '@/components/ui/badge';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  badge?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 'Q1 2025',
    title: 'Beta Program',
    description: 'Early access program for select partners with core AI agent capabilities.',
    badge: 'Current',
  },
  {
    year: 'Q2 2025',
    title: 'Public Launch',
    description: 'General availability with marketplace, integrations, and community features.',
    badge: 'Next',
  },
  {
    year: 'Q3 2025',
    title: 'Enterprise Suite',
    description: 'Advanced security features, custom training pipelines, and dedicated support.',
  },
  {
    year: 'Q4 2025',
    title: 'Platform Expansion',
    description: 'Developer APIs, SDKs, and international data centers for global reach.',
  },
];

export function RoadmapSection() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Our Roadmap</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          The journey ahead as we build the future of AI technology
        </p>
      </div>

      <div className="mt-12">
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border" />
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`relative flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className="flex w-5/12 items-center">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        {event.year}
                      </span>
                      {event.badge && (
                        <Badge variant="secondary">{event.badge}</Badge>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 