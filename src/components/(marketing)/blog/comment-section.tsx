'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageSquare } from 'lucide-react';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  replies: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

// Sample comments data - replace with actual data from your API
const sampleComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Alex Thompson',
      avatar: '/team/alex.jpg',
    },
    content: 'Great article! The insights about AI agent deployment are particularly helpful.',
    date: '2025-01-03T15:30:00Z',
    likes: 12,
    replies: [
      {
        id: '2',
        author: {
          name: 'Sarah Johnson',
          avatar: '/team/sarah.jpg',
        },
        content: 'Thanks Alex! Glad you found it useful.',
        date: '2025-01-03T16:45:00Z',
        likes: 3,
        replies: [],
      },
    ],
  },
  {
    id: '3',
    author: {
      name: 'Michael Chen',
      avatar: '/team/michael.jpg',
    },
    content: 'Would love to see more examples of real-world applications.',
    date: '2025-01-02T09:15:00Z',
    likes: 8,
    replies: [],
  },
];

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Current User', // Replace with actual user data
        avatar: '/team/default.jpg',
      },
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <Card key={comment.id} className={`mb-4 p-4 ${isReply ? 'ml-12' : ''}`}>
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{comment.author.name}</h4>
            <span className="text-sm text-muted-foreground">
              {new Date(comment.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <p className="mt-1 text-muted-foreground">{comment.content}</p>
          <div className="mt-2 flex items-center gap-4">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ThumbsUp className="mr-1 h-4 w-4" />
              {comment.likes}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageSquare className="mr-1 h-4 w-4" />
              Reply
            </Button>
          </div>
        </div>
      </div>
      {comment.replies.map((reply) => renderComment(reply, true))}
    </Card>
  );

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Comments</h2>
      
      {/* Comment Form */}
      <Card className="mb-8 p-4">
        <Textarea
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSubmitComment}>Post Comment</Button>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => renderComment(comment))}
      </div>
    </div>
  );
} 