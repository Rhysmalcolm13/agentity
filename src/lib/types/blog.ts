export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  role: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  categories: string[];
  tags: Tag[];
  readingTime: number;
  publishedAt: string;
  featured: boolean;
  views: number;
  likes: number;
} 