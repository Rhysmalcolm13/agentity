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

const termsSections: Section[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: 'By accessing or using Agentity\'s services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access or use our services.'
  },
  {
    id: 'service-description',
    title: 'Description of Service',
    content: 'Agentity provides an AI agent platform that enables businesses to create, deploy, and manage automated workflows. Our services include but are not limited to AI agent creation, workflow automation, integration capabilities, and analytics.'
  },
  {
    id: 'account-terms',
    title: 'Account Terms',
    content: 'You must register for an account to access our services. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.'
  },
  {
    id: 'service-rules',
    title: 'Acceptable Use Policy',
    content: 'You agree not to misuse our services or help anyone else do so. You must not use our services for any illegal purpose, to violate any laws, or to infringe on others\' rights. We reserve the right to suspend or terminate accounts that violate these rules.'
  },
  {
    id: 'payment-terms',
    title: 'Payment Terms',
    content: 'Certain aspects of our services may be provided for a fee. You agree to pay all fees in accordance with the pricing established for your selected plan. Fees are non-refundable except as required by law or as explicitly stated in our refund policy.'
  },
  {
    id: 'service-level',
    title: 'Service Level Agreement',
    content: 'We strive to maintain 99.9% uptime for our services. In the event of service disruptions, we will make reasonable efforts to restore service promptly. Credits may be issued for extended downtime as detailed in our SLA documentation.'
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property Rights',
    content: 'Our services and all related content, features, and functionality are owned by Agentity and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of any content you create using our services.'
  },
  {
    id: 'data-ownership',
    title: 'Data Ownership and Usage',
    content: 'You retain all rights to your data. By using our services, you grant us a license to host, store, and process your data solely for the purpose of providing our services to you. We will not access your data except as necessary to maintain or provide the service.'
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content: 'To the maximum extent permitted by law, Agentity shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.'
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    content: 'Any disputes arising from these terms or our services will first be attempted to be resolved through informal negotiation. If that fails, disputes shall be resolved through arbitration in accordance with our dispute resolution policy.'
  },
  {
    id: 'termination',
    title: 'Termination',
    content: 'We may terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms. Upon termination, your right to use our services will immediately cease.'
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    content: 'We reserve the right to modify these terms at any time. We will notify you of significant changes by posting an update on our website or sending you an email. Your continued use of our services after such modifications constitutes acceptance of the updated terms.'
  }
];

export function TermsContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold">Table of Contents</h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            {termsSections.map((section) => (
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
        {termsSections.map((section) => (
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