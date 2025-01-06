'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PrivacyContent } from '@/components/(marketing)/privacy/privacy-content';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last updated: January 4, 2025
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            This privacy policy explains how we collect, use, and protect your
            personal information.
          </p>
        </div>

        {/* Privacy Content */}
        <PrivacyContent />

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            If you have any questions about this Privacy Policy, please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
} 