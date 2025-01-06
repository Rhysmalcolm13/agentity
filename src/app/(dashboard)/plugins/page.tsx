'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Puzzle, Plus, Search, Check, X } from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  category: string;
  installed: boolean;
  version: string;
  author: string;
}

const mockPlugins: Plugin[] = [
  {
    id: '1',
    name: 'Data Analysis Kit',
    description: 'Advanced data analysis and visualization tools for your agents.',
    category: 'Data Processing',
    installed: true,
    version: '1.2.0',
    author: 'DataTeam',
  },
  {
    id: '2',
    name: 'Code Generator',
    description: 'Generate code snippets and boilerplate automatically.',
    category: 'Development',
    installed: false,
    version: '2.0.1',
    author: 'DevTools Inc.',
  },
  {
    id: '3',
    name: 'Language Translator',
    description: 'Real-time translation support for multiple languages.',
    category: 'Language',
    installed: true,
    version: '1.0.5',
    author: 'LangTech',
  },
  {
    id: '4',
    name: 'Image Processor',
    description: 'Process and analyze images with advanced AI capabilities.',
    category: 'Media',
    installed: false,
    version: '0.9.0',
    author: 'VisualAI',
  },
];

export default function PluginsPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPlugins = mockPlugins.filter((plugin) => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ||
      plugin.category.toLowerCase() === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'installed' && plugin.installed) ||
      (statusFilter === 'not-installed' && !plugin.installed);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plugins</h1>
          <p className="text-muted-foreground">
            Browse and manage agent plugins
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Plugin
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search plugins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="data processing">Data Processing</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="language">Language</SelectItem>
            <SelectItem value="media">Media</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="installed">Installed</SelectItem>
            <SelectItem value="not-installed">Not Installed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlugins.map((plugin) => (
          <Card key={plugin.id} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {plugin.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                {plugin.installed ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
                <Puzzle className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {plugin.description}
                </p>
                <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <div>Category: {plugin.category}</div>
                  <div>Version: {plugin.version}</div>
                  <div>Author: {plugin.author}</div>
                  <div>
                    Status:{' '}
                    <span
                      className={
                        plugin.installed ? 'text-green-500' : undefined
                      }
                    >
                      {plugin.installed ? 'Installed' : 'Not Installed'}
                    </span>
                  </div>
                </div>
                <Button
                  variant={plugin.installed ? 'destructive' : 'default'}
                  size="sm"
                  className="mt-2"
                >
                  {plugin.installed ? 'Uninstall' : 'Install'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 