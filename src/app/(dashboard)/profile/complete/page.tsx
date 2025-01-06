'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AvatarUpload } from '@/components/avatar-upload';
import { toast } from 'sonner';
import { useForm } from '@/hooks/use-form';

interface ProfileForm {
  name: string;
  email: string;
  image?: string;
}

export default function ProfileCompletePage(): JSX.Element {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({ percentage: 0, missingFields: [] as string[] });
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    typeof session?.user?.image === 'string' ? session.user.image : undefined
  );

  const { values, errors, handleChange, handleSubmit } = useForm<ProfileForm>({
    initialValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      image: avatarUrl,
    },
    validate: (values: Partial<ProfileForm>) => {
      const errors: Record<string, string | undefined> = {};

      if (!values.name) {
        errors.name = 'Name is required';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },
    onSubmit: async (values: ProfileForm) => {
      setIsLoading(true);

      try {
        const response = await fetch('/api/profile/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, image: avatarUrl }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to update profile');
        }

        // Update session with new profile data
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            ...values,
            image: avatarUrl,
          },
        });

        toast.success('Profile updated successfully');
        router.push('/dashboard');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to update profile');
        console.error('Profile update error:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Handle avatar upload completion
  const handleAvatarUpload = (url: string) => {
    setAvatarUrl(url);
  };

  // Fetch profile completion progress
  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/profile/progress');
      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      }
    } catch (error) {
      console.error('Failed to fetch profile progress:', error);
    }
  };

  // Fetch progress on mount
  useState(() => {
    fetchProgress();
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
        <CardDescription>
          Please provide the following information to complete your profile
        </CardDescription>
        <div className="space-y-2">
          <Progress value={progress.percentage} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Profile completion: {progress.percentage}%
          </p>
          {progress.missingFields.length > 0 && (
            <p className="text-sm text-destructive">
              Missing: {progress.missingFields.join(', ')}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-6">
            <AvatarUpload
              currentImageUrl={avatarUrl}
              onUploadComplete={handleAvatarUpload}
              name={values.name}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={values.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={isLoading}
              required
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={isLoading}
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Complete Profile'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground text-center w-full">
          This information helps us provide you with a better experience
        </p>
      </CardFooter>
    </Card>
  );
} 