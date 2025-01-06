import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DocPage {
  title: string;
  id: string;
  section: string;
}

const docPages: DocPage[] = [
  { title: 'Installation', id: 'installation', section: 'Getting Started' },
  { title: 'Quick Start', id: 'quick-start', section: 'Getting Started' },
  { title: 'Basic Concepts', id: 'basic-concepts', section: 'Getting Started' },
  { title: 'Agent Creation', id: 'agent-creation', section: 'Core Features' },
  { title: 'Plugin System', id: 'plugin-system', section: 'Core Features' },
  { title: 'Training', id: 'training', section: 'Core Features' },
  { title: 'Custom Plugins', id: 'custom-plugins', section: 'Advanced Usage' },
  { title: 'API Integration', id: 'api-integration', section: 'Advanced Usage' },
  { title: 'Advanced Training', id: 'advanced-training', section: 'Advanced Usage' },
  { title: 'REST API', id: 'rest-api', section: 'API Reference' },
  { title: 'WebSocket API', id: 'websocket-api', section: 'API Reference' },
  { title: 'SDK Reference', id: 'sdk-reference', section: 'API Reference' },
];

interface DocsPaginationProps {
  className?: string;
}

export function DocsPagination({ className }: DocsPaginationProps) {
  const pathname = usePathname();
  const currentPageId = pathname.split('/').pop();
  const currentIndex = docPages.findIndex(page => page.id === currentPageId);
  
  const prevPage = currentIndex > 0 ? docPages[currentIndex - 1] : null;
  const nextPage = currentIndex < docPages.length - 1 ? docPages[currentIndex + 1] : null;

  if (!prevPage && !nextPage) {
    return null;
  }

  return (
    <div className={cn("flex flex-row items-center justify-between", className)}>
      {prevPage ? (
        <Button variant="ghost" className="h-auto flex flex-col items-start gap-1 max-w-[45%]" asChild>
          <Link href={`/docs/${prevPage.id}`}>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </div>
            <span className="text-sm font-medium line-clamp-1">{prevPage.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}
      {nextPage ? (
        <Button variant="ghost" className="h-auto flex flex-col items-end gap-1 max-w-[45%]" asChild>
          <Link href={`/docs/${nextPage.id}`}>
            <div className="flex items-center text-sm text-muted-foreground">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
            <span className="text-sm font-medium line-clamp-1">{nextPage.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
} 