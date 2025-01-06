import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Github, Menu, Search, X } from 'lucide-react';
import { DocsSidebar } from './docs-sidebar';
import { DocsSearch } from './docs-search';
import { DocsToc } from './docs-toc';
import { DocsPagination } from './docs-pagination';
import { DocsFeedback } from './docs-feedback';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface DocsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DocsLayout({ children, className }: DocsLayoutProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <ScrollArea className="h-full py-6 pl-6 pr-6">
                    <DocsSidebar />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            )}
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              Search docs...
              <kbd className="ml-2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex"
              asChild
            >
              <Link href="https://github.com/agentity/docs" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                Edit on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex-1">
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr_200px] md:gap-6 lg:gap-10">
          {/* Sidebar */}
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
              <DocsSidebar />
            </ScrollArea>
          </aside>

          {/* Main Content */}
          <main className={cn("relative py-6 lg:py-8 lg:gap-10", className)}>
            <div className="mx-auto w-full min-w-0">
              {children}
              <DocsFeedback className="mt-8" />
              <DocsPagination className="mt-8" />
            </div>
          </main>

          {/* Table of Contents */}
          <aside className="hidden text-sm xl:block">
            <div className="sticky top-14 -mr-2 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pl-2 pr-8">
              <DocsToc />
            </div>
          </aside>
        </div>
      </div>

      {/* Search Dialog */}
      <DocsSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  );
} 