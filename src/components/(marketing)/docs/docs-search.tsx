import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, FileText } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  section: string;
  url: string;
}

interface DocsSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocsSearch({ open, onOpenChange }: DocsSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recent-doc-searches', []);

  // Simulated search results - replace with actual search implementation
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    // Simulate search results
    const searchResults: SearchResult[] = [
      {
        id: '1',
        title: 'Getting Started with Installation',
        content: 'Learn how to install and set up your first agent...',
        section: 'Getting Started',
        url: '/docs/installation',
      },
      {
        id: '2',
        title: 'Plugin System Overview',
        content: 'Understand how the plugin system works and how to create custom plugins...',
        section: 'Core Features',
        url: '/docs/plugin-system',
      },
      // Add more simulated results
    ].filter(result =>
      result.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      result.content.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    setResults(searchResults);
  }, [debouncedQuery]);

  const handleSelect = (url: string) => {
    router.push(url);
    onOpenChange(false);

    // Add to recent searches
    if (query.trim()) {
      setRecentSearches((prev: string[]) => {
        const newSearches = [query, ...prev.filter(s => s !== query)].slice(0, 5);
        return newSearches;
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search documentation..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List>
            <Command.Empty className="py-6 text-center text-sm">
              No results found.
            </Command.Empty>
            {query && results.length > 0 && (
              <Command.Group heading="Search Results">
                {results.map((result) => (
                  <Command.Item
                    key={result.id}
                    value={result.title}
                    onSelect={() => handleSelect(result.url)}
                    className="flex flex-col items-start gap-1"
                  >
                    <div className="flex w-full items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span className="font-medium">{result.title}</span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {result.section}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {result.content}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
            {!query && recentSearches.length > 0 && (
              <Command.Group heading="Recent Searches">
                {recentSearches.map((search) => (
                  <Command.Item
                    key={search}
                    value={search}
                    onSelect={() => setQuery(search)}
                    className="flex items-center"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {search}
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
} 