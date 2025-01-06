import { z } from 'zod';
import { FormField } from '@/types';

/**
 * Convert form field validation to Zod schema
 */
export function fieldToZod(field: FormField): z.ZodString | z.ZodNumber {
  if (field.type === 'number') {
    let schema = z.number();

    if (field.validation?.required) {
      schema = schema.min(1, { message: field.validation.required });
    }

    return schema;
  }

  let schema = z.string();

  if (field.validation?.required) {
    schema = schema.min(1, { message: field.validation.required });
  }

  if (field.validation?.pattern) {
    schema = schema.regex(field.validation.pattern.value, {
      message: field.validation.pattern.message,
    });
  }

  if (field.validation?.minLength) {
    schema = schema.min(field.validation.minLength.value, {
      message: field.validation.minLength.message,
    });
  }

  if (field.validation?.maxLength) {
    schema = schema.max(field.validation.maxLength.value, {
      message: field.validation.maxLength.message,
    });
  }

  return schema;
}

/**
 * Common validation schemas
 */
export const validationSchemas = {
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),

  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),

  url: z
    .string()
    .url({ message: 'Invalid URL' })
    .optional()
    .or(z.literal('')),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' })
    .optional()
    .or(z.literal('')),
};

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  phone: /^\+?[1-9]\d{1,14}$/,
};

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  return validationPatterns.email.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  return validationPatterns.password.test(password);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  return validationPatterns.url.test(url);
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  return validationPatterns.phone.test(phone);
} 