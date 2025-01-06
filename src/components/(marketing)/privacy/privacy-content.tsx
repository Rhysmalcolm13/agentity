'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Section {
  id: string;
  title: string;
  content: string;
}

const privacySections: Section[] = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    content: 'We collect information that you provide directly to us, including when you create an account, use our services, or contact us for support. This may include your name, email address, company information, and usage data.'
  },
  {
    id: 'information-use',
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide and improve our services, communicate with you, process payments, and ensure security. We may also use your information to personalize your experience and send you updates about our services.'
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing',
    content: 'We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our platform, processing payments, and analyzing our services. We require these parties to protect your information.'
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.'
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    content: 'We use cookies and similar tracking technologies to analyze trends, administer the website, track user movements around the website, and gather demographic information about our user base as a whole.'
  },
  {
    id: 'user-rights',
    title: 'Your Rights and Choices',
    content: 'You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications and choose whether to share certain information. Contact us to exercise these rights.'
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: 'We retain your information for as long as necessary to provide our services and comply with legal obligations. When we no longer need personal information, we securely delete or anonymize it.'
  },
  {
    id: 'international-transfer',
    title: 'International Data Transfers',
    content: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in these cases.'
  },
  {
    id: 'children',
    title: 'Children\'s Privacy',
    content: 'Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it.'
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.'
  }
];

export function PrivacyContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold">Table of Contents</h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            {privacySections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      setExpandedSection(section.id);
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Card>

      {/* Content Sections */}
      <div className="space-y-4">
        {privacySections.map((section) => (
          <Card
            key={section.id}
            id={section.id}
            className="overflow-hidden transition-all"
          >
            <Button
              variant="ghost"
              className="w-full justify-between p-6 text-left"
              onClick={() =>
                setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )
              }
            >
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </Button>
            {expandedSection === section.id && (
              <div className="px-6 pb-6">
                <p className="text-muted-foreground">{section.content}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
} 