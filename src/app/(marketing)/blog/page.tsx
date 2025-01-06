'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BlogCard } from '@/components/(marketing)/blog/blog-card';
import { BlogSearch } from '@/components/(marketing)/blog/blog-search';
import { Button } from '@/components/ui/button';
import type { BlogPost, Category, Tag } from '@/lib/types/blog';
import { getCategories, getTags } from '@/lib/blog';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const loadMetadata = async () => {
      const [categoriesData, tagsData] = await Promise.all([
        getCategories(),
        getTags()
      ]);
      setCategories(categoriesData);
      setTags(tagsData);
    };
    loadMetadata();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, selectedCategory, selectedTag, sortBy, page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedTag && { tag: selectedTag }),
        ...(sortBy && { sort: sortBy }),
      });

      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();

      setPosts(data.posts);
      setTotalPages(data.totalPages);

      // Set featured post (first featured post from the first page)
      if (page === 1 && !searchQuery && !selectedCategory && !selectedTag) {
        const featured = data.posts.find((post: BlogPost) => post.featured);
        setFeaturedPost(featured || null);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handleTagChange = (tagId: string | null) => {
    setSelectedTag(tagId);
    setPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Insights, tutorials, and updates from the Agentity team
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <BlogSearch
            categories={categories}
            tags={tags}
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            onTagChange={handleTagChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Featured Post */}
        {featuredPost && !searchQuery && !selectedCategory && !selectedTag && page === 1 && (
          <div className="mb-12">
            <BlogCard post={featuredPost} featured />
          </div>
        )}

        {/* Post Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts
            .filter((post) => post.id !== featuredPost?.id)
            .map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
        </div>

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              No posts found. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 