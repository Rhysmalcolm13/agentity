'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth/auth';

export default function LogoutPage(): JSX.Element | null {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
      router.refresh();
    });
  }, [router]);

  return null;
} 