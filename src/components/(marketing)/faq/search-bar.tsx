'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions?: Array<{
    id: string;
    question: string;
    category: string;
  }>;
}

export function SearchBar({ onSearch, suggestions = [] }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query
  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion.question.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5); // Limit to 5 suggestions

  // Handle clicks outside of the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion: { question: string }) => {
    setQuery(suggestion.question);
    onSearch(suggestion.question);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search questions..."
          className="pl-10"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <Card className="absolute z-50 mt-1 w-full overflow-hidden p-2">
          <div className="space-y-1">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    'w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
                    'hover:bg-muted focus:bg-muted focus:outline-none'
                  )}
                >
                  <span className="block font-medium">{suggestion.question}</span>
                  <span className="text-xs text-muted-foreground">
                    {suggestion.category}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No matching questions
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 