'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function FeatureRequest() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    toast.success('Feature request submitted successfully!');
    setTitle('');
    setDescription('');
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Request a Feature</h3>
          <p className="text-sm text-muted-foreground">
            Have an idea for a new feature? Let us know what you need.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Feature title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Describe the feature you'd like to see..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </div>
      </form>
    </Card>
  );
} 