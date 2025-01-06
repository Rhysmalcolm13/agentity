'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HeroSection } from '@/components/(marketing)/about/hero-section';
import { MissionSection } from '@/components/(marketing)/about/mission-section';
import { RoadmapSection } from '@/components/(marketing)/about/roadmap-section';
import { TeamSection } from '@/components/(marketing)/about/team-section';
import { HeadquartersSection } from '@/components/(marketing)/about/headquarters-section';
import { CareersSection } from '@/components/(marketing)/about/careers-section';
import { PressSection } from '@/components/(marketing)/about/press-section';
import { JoinSection } from '@/components/(marketing)/about/join-section';

export default function AboutPage() {
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
        <HeroSection />

        {/* Mission Section */}
        <div className="mt-24">
          <MissionSection />
        </div>

        {/* Company Timeline */}
        <div className="mt-24">
          <RoadmapSection />
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <TeamSection />
        </div>

        {/* Office Locations */}
        <div className="mt-24">
          <HeadquartersSection />
        </div>

        {/* Career Opportunities */}
        <div className="mt-24">
          <CareersSection />
        </div>

        {/* Press Resources */}
        <div className="mt-24">
          <PressSection />
        </div>

        {/* Join Us Section */}
        <div className="mt-24">
          <JoinSection />
        </div>
      </div>
    </div>
  );
} 