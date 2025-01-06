'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full shadow-lg"
        size="lg"
      >
        <MessageSquare className="h-5 w-5" />
        <span>Chat with us</span>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 rounded-lg border border-border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h3 className="font-semibold">Live Chat</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-96 p-4">
            <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
              <p>Chat functionality will be implemented soon.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 