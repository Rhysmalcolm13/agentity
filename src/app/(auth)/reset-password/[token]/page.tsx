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
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordFormPage({
  params,
}: {
  params: { token: string };
}): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm<ResetPasswordForm>({
    fields: {
      password: {
        name: 'password',
        label: 'New Password',
        type: 'password',
        validation: {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message:
              'Password must contain at least one uppercase letter, one lowercase letter, and one number',
          },
        },
      },
      confirmPassword: {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        validation: {
          required: 'Please confirm your password',
          pattern: {
            value: new RegExp(`^${password}$`),
            message: 'Passwords do not match',
          },
        },
      },
    },
    onSubmit: async (data) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/auth/reset-password/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: params.token,
            password: data.password,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to reset password');
        }

        router.push('/success/password-reset');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to reset password');
        console.error('Password reset error:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Update the password state when it changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    handleChange('password', newPassword);
  };

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
        <h1 className="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={values.password || ''}
            onChange={handlePasswordChange}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword || ''}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
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