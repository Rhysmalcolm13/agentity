import { NextResponse } from 'next/server';
import {
  getAllPosts,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
} from '@/lib/blog';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '9');
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort');

  let posts = await getAllPosts();

  // Apply filters
  if (search) {
    posts = await searchPosts(search);
  }
  if (category) {
    posts = await getPostsByCategory(category);
  }
  if (tag) {
    posts = await getPostsByTag(tag);
  }

  // Apply sorting
  if (sort === 'recent') {
    posts = posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } else if (sort === 'popular') {
    posts = posts.sort((a, b) => b.views - a.views);
  }

  // Calculate pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const totalPages = Math.ceil(posts.length / limit);
  const paginatedPosts = posts.slice(start, end);

  return NextResponse.json({
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    totalPosts: posts.length,
  });
} 