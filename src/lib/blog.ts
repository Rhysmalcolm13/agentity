import { posts, categories, tags } from './blog/content';
import type { BlogPost } from './types/blog';

export async function getAllPosts(): Promise<BlogPost[]> {
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return posts.find(post => post.slug === slug) || null;
}

export async function getRecentPosts(count: number = 3): Promise<BlogPost[]> {
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return posts.filter(post => post.featured);
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  return posts.filter(post => post.categories.includes(categorySlug));
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  return posts.filter(post => post.tags.some(tag => tag.slug === tagSlug));
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const searchTerms = query.toLowerCase().split(' ');
  return posts.filter(post => {
    const searchableText = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
    return searchTerms.every(term => searchableText.includes(term));
  });
}

export async function getCategories() {
  return categories;
}

export async function getTags() {
  return tags;
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
} 