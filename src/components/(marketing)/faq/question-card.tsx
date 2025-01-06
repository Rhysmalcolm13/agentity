'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RelatedQuestion {
  id: string;
  question: string;
}

interface QuestionCardProps {
  question: string;
  answer: string;
  relatedQuestions?: RelatedQuestion[];
  onRelatedQuestionClick: (id: string) => void;
}

export function QuestionCard({
  question,
  answer,
  relatedQuestions,
  onRelatedQuestionClick,
}: QuestionCardProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{question}</h3>
        <p className="mt-2 text-muted-foreground">{answer}</p>

        {/* Related Questions */}
        {relatedQuestions && relatedQuestions.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-muted-foreground">
              Related Questions
            </h4>
            <ul className="mt-2 space-y-1">
              {relatedQuestions.map((related) => (
                <li key={related.id}>
                  <button
                    onClick={() => onRelatedQuestionClick(related.id)}
                    className="text-sm text-primary hover:underline"
                  >
                    {related.question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Feedback Section */}
        <div className="mt-6 flex items-center gap-4 border-t pt-4">
          <span className="text-sm text-muted-foreground">
            Was this helpful?
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={feedback === 'helpful' ? 'bg-primary/10' : ''}
              onClick={() => setFeedback('helpful')}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Yes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={feedback === 'not-helpful' ? 'bg-destructive/10' : ''}
              onClick={() => setFeedback('not-helpful')}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              No
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
} 