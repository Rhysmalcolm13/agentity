import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActionProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface ErrorLayoutProps {
  title: string;
  description: string;
  primaryAction?: ActionProps;
  secondaryAction?: ActionProps;
  className?: string;
  children?: React.ReactNode;
}

export function ErrorLayout({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  children,
}: ErrorLayoutProps): JSX.Element {
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
            primaryAction.href ? (
              <Button asChild>
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
            ) : (
              <Button onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Button variant="outline" asChild>
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
} 