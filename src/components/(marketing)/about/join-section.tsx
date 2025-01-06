import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function JoinSection() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
      <h2 className="text-3xl font-bold">Join Our Team</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        We're always looking for talented individuals to join our mission. Check out
        our open positions and help us shape the future of AI.
      </p>
      <div className="mt-8">
        <Link href="/careers">
          <Button size="lg">View Open Positions</Button>
        </Link>
      </div>
    </div>
  );
} 