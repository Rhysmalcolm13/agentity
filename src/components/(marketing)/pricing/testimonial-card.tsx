'use client';

import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export function TestimonialCard({
  name,
  role,
  company,
  content,
  rating,
}: TestimonialCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'
              }`}
            />
          ))}
        </div>
        <blockquote className="mt-4">
          <p className="text-muted-foreground">{content}</p>
        </blockquote>
        <footer className="mt-4">
          <div className="flex items-center">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-primary/10">
              <div className="flex h-full w-full items-center justify-center text-primary/40">
                {name.charAt(0)}
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">
                {role} at {company}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Card>
  );
} 