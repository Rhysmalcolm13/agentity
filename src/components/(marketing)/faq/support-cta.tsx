import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function SupportCTA() {
  return (
    <div className="rounded-lg border border-border bg-card p-8 text-center">
      <h2 className="text-2xl font-bold">Still have questions?</h2>
      <p className="mt-4 text-muted-foreground">
        Our support team is here to help. Contact us anytime and we'll get back to
        you as soon as possible.
      </p>
      <div className="mt-8">
        <Link href="/contact">
          <Button size="lg">Contact Support</Button>
        </Link>
      </div>
    </div>
  );
} 