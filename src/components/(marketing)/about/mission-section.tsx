import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function MissionSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
      <div>
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          At Agentity, we believe in democratizing AI technology. We're building a
          future where anyone can create and deploy intelligent agents to automate
          tasks, enhance productivity, and unlock new possibilities.
        </p>
        <div className="mt-8">
          <Link href="/contact">
            <Button size="lg">Get in Touch</Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold">Innovation</h3>
          <p className="mt-2 text-muted-foreground">
            Pushing the boundaries of what's possible with AI agents through
            continuous research and development.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold">Accessibility</h3>
          <p className="mt-2 text-muted-foreground">
            Making advanced AI technology accessible to businesses of all sizes
            through intuitive interfaces.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold">Community</h3>
          <p className="mt-2 text-muted-foreground">
            Building a vibrant community of developers and users who share
            knowledge and best practices.
          </p>
        </div>
      </div>
    </div>
  );
} 