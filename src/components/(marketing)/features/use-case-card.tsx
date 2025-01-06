'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface UseCaseCardProps {
  title: string;
  description: string;
  industry: string;
  benefits: string[];
  learnMoreUrl: string;
}

export function UseCaseCard({
  title,
  description,
  industry,
  benefits,
  learnMoreUrl,
}: UseCaseCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-1 flex-col space-y-4 p-6">
        <div className="space-y-2">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {industry}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex-1">
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Key Benefits</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link href={learnMoreUrl}>
          <Button variant="ghost" className="mt-4 w-full justify-between">
            Learn more
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
} 