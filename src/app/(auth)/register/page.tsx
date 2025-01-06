'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Github, Loader2 } from 'lucide-react';
import { useForm } from '@/hooks/use-form';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth/auth';
import { AuthErrorCode } from '@/lib/types/auth';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm<RegisterForm>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: (values: Partial<RegisterForm>) => {
      const errors: Record<string, string | undefined> = {};

      if (!values.name) {
        errors.name = 'Name is required';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }

      return errors;
    },
    onSubmit: async (values: RegisterForm) => {
      setIsLoading(true);

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to register');
        }

        // Sign in after successful registration
        const result = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        router.push('/login');
        toast.success('Registration successful! Please check your email to verify your account.');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to register');
        console.error('Registration error:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    try {
      setIsLoading(true);
      const result = await signIn(provider, {
        redirect: false,
      });

      if (result?.error) {
        // Handle specific OAuth errors
        switch (result.error) {
          case AuthErrorCode.OAUTH_POPUP_CLOSED:
            toast.error('Sign in window was closed. Please try again.');
            break;
          case AuthErrorCode.OAUTH_ACCESS_DENIED:
            toast.error('Access was denied. Please try again or use a different sign in method.');
            break;
          case AuthErrorCode.ACCOUNT_EXISTS:
            toast.error('An account with this email already exists. Please sign in with your existing account.');
            break;
          default:
            toast.error('Failed to sign in. Please try again.');
        }
        console.error('OAuth sign in error:', {
          provider,
          error: result.error,
          errorDescription: result.error_description,
        });
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      console.error('OAuth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => handleOAuthSignIn('github')}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            GitHub
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => handleOAuthSignIn('google')}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={isLoading}
              required
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={isLoading}
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              disabled={isLoading}
              required
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-1">{errors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="hover:text-primary underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </CardFooter>
      <Separator className="my-4" />
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="hover:text-primary underline underline-offset-4">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="hover:text-primary underline underline-offset-4">
            Privacy Policy
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
} 