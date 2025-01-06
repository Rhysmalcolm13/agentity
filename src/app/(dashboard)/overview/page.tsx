'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Puzzle, Activity, Users } from 'lucide-react';

const stats = [
  {
    title: 'Active Agents',
    value: '12',
    description: 'Running AI agents',
    icon: <Bot className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Installed Plugins',
    value: '24',
    description: 'Available plugins',
    icon: <Puzzle className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Total Executions',
    value: '1,234',
    description: 'Task executions',
    icon: <Activity className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Active Users',
    value: '56',
    description: 'Connected users',
    icon: <Users className="h-6 w-6 text-primary" />,
  },
];

export default function OverviewPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your AI agents and system performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TODO: Add charts and detailed statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Agent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full rounded-lg bg-muted" />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Plugin Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full rounded-lg bg-muted" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 