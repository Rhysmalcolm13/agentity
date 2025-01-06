import { Facebook, Linkedin, Mail, Share2, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/types/blog';

interface SocialShareProps {
  post: BlogPost;
}

export function SocialShare({ post }: SocialShareProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out "${post.title}" on Agentity`;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" asChild>
        <span className="cursor-default">
          <Share2 className="h-4 w-4" />
        </span>
      </Button>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="icon"
          asChild
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
          </a>
        </Button>
      ))}
    </div>
  );
} 