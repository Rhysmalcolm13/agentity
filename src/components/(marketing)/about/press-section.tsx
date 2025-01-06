'use client';

import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PressSection() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Press Resources</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about Agentity
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6 flex flex-col h-full">
          <div>
            <h3 className="text-xl font-semibold">Press Kit</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Download our brand assets and guidelines
            </p>
          </div>
          <Button variant="outline" className="mt-6" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Kit
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 flex flex-col h-full">
          <div>
            <h3 className="text-xl font-semibold">Media Coverage</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See Agentity in the news and media
            </p>
          </div>
          <Button variant="outline" className="mt-6" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Coverage
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 flex flex-col h-full">
          <div>
            <h3 className="text-xl font-semibold">Media Inquiries</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact our communications team
            </p>
          </div>
          <Button variant="outline" className="mt-6" size="sm">
            Contact Press
          </Button>
        </div>
      </div>
    </div>
  );
} 