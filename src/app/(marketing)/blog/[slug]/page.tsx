'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Eye, ThumbsUp } from 'lucide-react';
import { getPostBySlug, getRecentPosts } from '@/lib/blog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BlogCard } from '@/components/(marketing)/blog/blog-card';
import { SocialShare } from '@/components/(marketing)/blog/social-share';
import { CommentSection } from '@/components/(marketing)/blog/comment-section';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import type { Components } from 'react-markdown';
import type { CSSProperties } from 'react';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('bash', bash);

const components: Partial<Components> = {
  code(props) {
    const { className, children, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const isInline = !match;
    
    if (isInline) {
      return <code className="bg-muted px-1 py-0.5 rounded text-sm" {...rest}>{children}</code>;
    }

    return (
      <div className="relative my-4 rounded-lg bg-muted">
        <div className="absolute right-2 top-2 text-xs text-muted-foreground">{language}</div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          wrapLines
          wrapLongLines
          className="!m-0 !bg-transparent !p-6"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  },
  h1(props) { return <h1 className="mb-8 text-4xl font-bold tracking-tight" {...props} />; },
  h2(props) { return <h2 className="mb-4 mt-12 text-3xl font-semibold tracking-tight" {...props} />; },
  h3(props) { return <h3 className="mb-4 mt-8 text-2xl font-semibold tracking-tight" {...props} />; },
  ul(props) { return <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />; },
  ol(props) { return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />; },
  blockquote(props) { return <blockquote className="mt-6 border-l-4 border-primary pl-6 italic" {...props} />; },
  a(props) {
    return (
      <a
        {...props}
        className="font-medium text-primary underline underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  const relatedPosts = await getRecentPosts(3);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] max-h-[400px] w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          {/* Back Navigation */}
          <Link
            href="/blog"
            className="inline-flex w-fit items-center rounded-md bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          {/* Title and Excerpt */}
          <div className="mx-auto w-full max-w-4xl space-y-4">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-base text-white/90 sm:text-lg">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto w-full max-w-4xl px-4 py-12">
        {/* Article Meta */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {post.readingTime} min read
            </div>
            <div className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              {post.views} views
            </div>
            <div className="flex items-center">
              <ThumbsUp className="mr-2 h-4 w-4" />
              {post.likes} likes
            </div>
          </div>
        </div>

        {/* Categories and Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
          {post.tags.map((tag) => (
            <Badge key={tag.id} variant="outline">
              {tag.name}
            </Badge>
          ))}
        </div>

        {/* Social Share */}
        <div className="mb-8">
          <SocialShare post={post} />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author Bio */}
        <Card className="mt-12 p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{post.author.name}</h3>
              <p className="mb-4 text-muted-foreground">{post.author.bio}</p>
              <div className="flex space-x-4">
                {post.author.social?.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`https://twitter.com/${post.author.social.twitter}`}>
                      Twitter
                    </Link>
                  </Button>
                )}
                {post.author.social?.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`https://linkedin.com/in/${post.author.social.linkedin}`}>
                      LinkedIn
                    </Link>
                  </Button>
                )}
                {post.author.social?.github && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`https://github.com/${post.author.social.github}`}>
                      GitHub
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Separator className="my-12" />

        {/* Related Posts */}
        <div>
          <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <BlogCard 
                  key={relatedPost.id} 
                  post={relatedPost}
                  className="w-full"
                />
              ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Comments Section */}
        <CommentSection postId={post.id} />
      </div>
    </article>
  );
} 