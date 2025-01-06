import { ApiResponse, AppError } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Generic fetch wrapper with error handling and typing
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error: AppError = new Error(data.error || 'An error occurred');
      error.status = response.status;
      error.code = data.code;
      error.details = data.details;
      throw error;
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

/**
 * HTTP GET request wrapper
 */
export async function get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * HTTP POST request wrapper
 */
export async function post<T>(
  endpoint: string,
  data: unknown,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * HTTP PUT request wrapper
 */
export async function put<T>(
  endpoint: string,
  data: unknown,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * HTTP DELETE request wrapper
 */
export async function del<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

/**
 * HTTP PATCH request wrapper
 */
export async function patch<T>(
  endpoint: string,
  data: unknown,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
} 