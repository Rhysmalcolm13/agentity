'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';

interface ComparisonFeature {
  name: string;
  description: string;
  agentity: boolean;
  competitors: {
    [key: string]: boolean;
  };
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
  competitors: string[];
}

export function ComparisonTable({ features, competitors }: ComparisonTableProps) {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Feature</TableHead>
            <TableHead>Agentity</TableHead>
            {competitors.map((competitor) => (
              <TableHead key={competitor}>{competitor}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">
                <div>
                  {feature.name}
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </TableCell>
              <TableCell>
                {feature.agentity ? (
                  <Check className="h-5 w-5 text-primary" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground" />
                )}
              </TableCell>
              {competitors.map((competitor) => (
                <TableCell key={competitor}>
                  {feature.competitors[competitor] ? (
                    <Check className="h-5 w-5 text-primary" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 