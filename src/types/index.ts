// Common Types
export type ID = string;
export type Timestamp = number;

// Auth Types
export interface User {
  id: ID;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// API Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Error Types
export interface AppError extends Error {
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Layout Types
export interface LayoutProps {
  children: React.ReactNode;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  validation?: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
} 