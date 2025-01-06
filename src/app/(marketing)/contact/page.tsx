'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ContactForm } from '@/components/(marketing)/contact/contact-form';
import { SupportHours } from '@/components/(marketing)/contact/support-hours';
import { SocialLinks } from '@/components/(marketing)/contact/social-links';
import { LiveChat } from '@/components/(marketing)/contact/live-chat';
import { OfficeLocation } from '@/components/(marketing)/contact/office-location';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Left Column - Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-8">
            <OfficeLocation />
            <SupportHours />
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      <LiveChat />
    </div>
  );
} 