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
import { Bot, Plus, Search } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'error';
  lastActive: string;
  tasks: number;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Assistant Agent',
    type: 'General Purpose',
    status: 'online',
    lastActive: '2 minutes ago',
    tasks: 145,
  },
  {
    id: '2',
    name: 'Data Processor',
    type: 'Data Analysis',
    status: 'online',
    lastActive: '5 minutes ago',
    tasks: 89,
  },
  {
    id: '3',
    name: 'Code Helper',
    type: 'Development',
    status: 'offline',
    lastActive: '1 hour ago',
    tasks: 234,
  },
  {
    id: '4',
    name: 'Research Assistant',
    type: 'Research',
    status: 'error',
    lastActive: '3 minutes ago',
    tasks: 67,
  },
];

export default function AgentsPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === 'all' || agent.type.toLowerCase() === typeFilter;
    const matchesStatus =
      statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground">
            Manage and monitor your AI agents
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="general purpose">General Purpose</SelectItem>
            <SelectItem value="data analysis">Data Analysis</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="research">Research</SelectItem>
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
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="relative overflow-hidden">
            <div
              className={`absolute right-2 top-2 h-2 w-2 rounded-full ${
                agent.status === 'online'
                  ? 'bg-green-500'
                  : agent.status === 'offline'
                  ? 'bg-gray-400'
                  : 'bg-red-500'
              }`}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {agent.name}
              </CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <div className="text-sm font-medium">{agent.type}</div>
                <div className="text-xs text-muted-foreground">
                  Last active: {agent.lastActive}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total tasks: {agent.tasks}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 