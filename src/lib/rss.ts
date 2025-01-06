import { BlogPost } from './types/blog';

export function generateRSSFeed(posts: BlogPost[]): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://agentity.ai';
  const feedUrl = `${baseUrl}/rss.xml`;
  
  const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author.email} (${post.author.name})</author>
      ${post.categories.map(category => `<category>${category}</category>`).join('')}
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Agentity Blog</title>
    <link>${baseUrl}</link>
    <description>Latest updates and insights from Agentity</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
} 