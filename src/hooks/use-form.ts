import { useState, useCallback } from 'react';
import { z } from 'zod';
import { fieldToZod } from '@/lib/utils/validation';
import { FormField } from '@/types';

type FormErrors<T> = Partial<Record<keyof T, string | undefined>>;

interface UseFormOptions<T> {
  initialValues?: Partial<T>;
  fields?: Record<keyof T, FormField>;
  schema?: z.ZodType<T>;
  validate?: (values: Partial<T>) => FormErrors<T>;
  onSubmit: (values: T) => Promise<void>;
}

interface UseFormReturn<T> {
  values: Partial<T>;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: unknown) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

export function useForm<T>({
  initialValues = {} as Partial<T>,
  fields,
  schema,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<Partial<T>>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create schema from fields if no schema provided
  const validationSchema = schema || (fields ? z.object(
    Object.entries(fields).reduce((acc, [key, field]) => {
      acc[key] = fieldToZod(field as FormField);
      return acc;
    }, {} as Record<string, z.ZodTypeAny>)
  ) : undefined);

  const validateField = useCallback((name: keyof T, value: unknown) => {
    if (validationSchema) {
      try {
        const partialSchema = z.object({ [name]: (validationSchema as z.ZodObject<any>).shape[name] }).partial();
        partialSchema.parse({ [name]: value });
        return undefined;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find(err => err.path[0] === name);
          return fieldError?.message;
        }
      }
    }
    if (validate) {
      const validationErrors = validate({ ...values, [name]: value });
      return validationErrors[name];
    }
    return undefined;
  }, [validationSchema, validate, values]);

  const handleChange = useCallback((name: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name as keyof T, value);
  }, [handleChange]);

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof T, values[name as keyof T]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let validatedData: T;

      if (validationSchema) {
        validatedData = validationSchema.parse(values) as T;
      } else if (validate) {
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        validatedData = values as T;
      } else {
        validatedData = values as T;
      }

      await onSubmit(validatedData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce(
          (acc, err) => ({
            ...acc,
            [err.path[0]]: err.message,
          }),
          {} as FormErrors<T>
        );
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validationSchema, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleInputChange,
    handleBlur,
    handleSubmit,
    reset,
  };
} 