import { generateRSSFeed } from '@/lib/rss';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = await getAllPosts();
  const feed = generateRSSFeed(posts);

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
    },
  });
} 