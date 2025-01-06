import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SuccessLayoutProps {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export function SuccessLayout({ 
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  children,
}: SuccessLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className={cn("mx-auto flex max-w-xl flex-col items-center justify-center text-center", className)}>
        <div className="mb-8">
          {children}
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mb-8 text-lg text-muted-foreground">{description}</p>
        <div className="flex space-x-4">
          {primaryAction && (
            <Button asChild>
              <Link href={primaryAction.href}>{primaryAction.label}</Link>
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" asChild>
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 