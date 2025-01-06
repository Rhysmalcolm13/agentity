import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface DocsFeedbackProps {
  className?: string;
}

export function DocsFeedback({ className }: DocsFeedbackProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedback = async (type: 'helpful' | 'not-helpful') => {
    setFeedback(type);
    // Here you would typically send the feedback to your analytics/feedback system
    // await submitFeedback({ type, path: window.location.pathname });
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    // Here you would typically send the comment to your feedback system
    // await submitFeedbackComment({
    //   type: feedback,
    //   comment,
    //   path: window.location.pathname,
    // });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={cn("rounded-lg border bg-card text-card-foreground p-6", className)}>
        <p className="text-center text-sm text-muted-foreground">
          Thank you for your feedback! It helps us improve our documentation.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground p-6", className)}>
      <h3 className="font-medium">Was this page helpful?</h3>
      <div className="mt-4 flex items-center gap-4">
        <Button
          variant={feedback === 'helpful' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFeedback('helpful')}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          Yes
        </Button>
        <Button
          variant={feedback === 'not-helpful' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFeedback('not-helpful')}
        >
          <ThumbsDown className="mr-2 h-4 w-4" />
          No
        </Button>
      </div>
      {feedback && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">Would you like to provide additional feedback?</span>
          </div>
          <Textarea
            placeholder="Your feedback helps us improve our documentation..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="h-24"
          />
          <Button
            className="w-full"
            disabled={!comment.trim()}
            onClick={handleSubmitComment}
          >
            Submit Feedback
          </Button>
        </div>
      )}
    </div>
  );
} 