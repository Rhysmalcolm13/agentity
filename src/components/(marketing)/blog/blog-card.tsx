import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block w-full">
      <Card className={cn(
        'group h-full overflow-hidden transition-colors hover:border-primary',
        featured ? 'lg:grid lg:grid-cols-2 lg:gap-4' : '',
        className
      )}>
        <div className={cn(
          'relative aspect-[16/9] overflow-hidden',
          featured ? 'lg:aspect-[4/3]' : ''
        )}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex h-full flex-col">
          <CardContent className={cn(
            'flex-1 space-y-4',
            featured ? 'p-6' : 'p-4'
          )}>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {post.categories.slice(0, 2).map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <h3 className={cn(
                'line-clamp-2 font-semibold tracking-tight',
                featured ? 'text-2xl' : 'text-xl'
              )}>
                {post.title}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className={cn(
            'flex gap-4 text-sm text-muted-foreground',
            featured ? 'px-6 pb-6' : 'px-4 pb-4'
          )}>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
} 