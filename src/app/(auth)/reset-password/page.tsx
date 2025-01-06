'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks/use-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';

interface ResetPasswordForm extends Record<string, unknown> {
  email: string;
}

export default function ResetPasswordPage(): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm<ResetPasswordForm>({
    fields: {
      email: {
        name: 'email',
        label: 'Email',
        type: 'email',
        validation: {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
      },
    },
    onSubmit: async (data) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to send reset email');
        }

        router.push('/success/reset-password');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to send reset email');
        console.error('Reset password error:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.push('/login')}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Login
        </Button>
      </div>

      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={values.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link href="/login" className="hover:text-primary underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
} 