'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface FeatureFilterProps {
  categories: string[];
  selectedCategories: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCategoryToggle: (category: string) => void;
}

export function FeatureFilter({
  categories,
  selectedCategories,
  searchQuery,
  onSearchChange,
  onCategoryToggle,
}: FeatureFilterProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search features..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryToggle(category)}
              className="gap-2"
            >
              {category}
              {isSelected && <X className="h-3 w-3" />}
            </Button>
          );
        })}
      </div>
      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedCategories.forEach(onCategoryToggle)}
            className="h-5 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
} 