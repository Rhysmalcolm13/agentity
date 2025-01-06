'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, Brain, Gauge, Lock, Puzzle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeatureDemo } from '@/components/(marketing)/features/feature-demo';
import { ComparisonTable } from '@/components/(marketing)/features/comparison-table';
import { FeatureRequest } from '@/components/(marketing)/features/feature-request';
import { FeatureFilter } from '@/components/(marketing)/features/feature-filter';
import { UseCaseCard } from '@/components/(marketing)/features/use-case-card';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  benefits: string[];
}

const features: Feature[] = [
  {
    title: 'Adaptive Learning',
    description: 'AI agents that learn from every interaction and adapt to your specific needs.',
    icon: Brain,
    benefits: [
      'Personalized behavior based on user interactions',
      'Continuous improvement over time',
      'Pattern recognition and optimization',
      'Customizable learning parameters',
    ],
  },
  {
    title: 'Plugin System',
    description: 'Extend your agents\' capabilities with our powerful plugin ecosystem.',
    icon: Puzzle,
    benefits: [
      'Easy integration with existing tools',
      'Marketplace for pre-built plugins',
      'Custom plugin development',
      'Version control and dependency management',
    ],
  },
  {
    title: 'Real-time Monitoring',
    description: 'Monitor and analyze your agents\' performance in real-time.',
    icon: Gauge,
    benefits: [
      'Live performance metrics',
      'Detailed analytics dashboard',
      'Custom alerts and notifications',
      'Historical data analysis',
    ],
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade security to protect your data and agents.',
    icon: Lock,
    benefits: [
      'End-to-end encryption',
      'Role-based access control',
      'Audit logging',
      'Compliance with industry standards',
    ],
  },
  {
    title: 'High Performance',
    description: 'Lightning-fast response times and efficient resource utilization.',
    icon: Zap,
    benefits: [
      'Distributed processing',
      'Automatic scaling',
      'Load balancing',
      'Resource optimization',
    ],
  },
  {
    title: 'Agent Management',
    description: 'Comprehensive tools for managing your AI agents.',
    icon: Bot,
    benefits: [
      'Centralized control panel',
      'Batch operations',
      'Version control',
      'Deployment management',
    ],
  },
];

const featureCategories = ['AI & ML', 'Security', 'Integration', 'Analytics', 'Management', 'Performance'];

const comparisonFeatures = [
  {
    name: 'Adaptive Learning',
    description: 'AI agents that learn from interactions',
    agentity: true,
    competitors: {
      'Competitor A': false,
      'Competitor B': true,
      'Competitor C': false,
    },
  },
  {
    name: 'Plugin System',
    description: 'Extensible plugin architecture',
    agentity: true,
    competitors: {
      'Competitor A': true,
      'Competitor B': false,
      'Competitor C': false,
    },
  },
  {
    name: 'Real-time Monitoring',
    description: 'Live performance tracking',
    agentity: true,
    competitors: {
      'Competitor A': true,
      'Competitor B': true,
      'Competitor C': true,
    },
  },
];

const useCases = [
  {
    title: 'Customer Support Automation',
    description: 'Enhance customer support with AI agents that learn from every interaction.',
    industry: 'Customer Service',
    benefits: [
      'Reduced response time by 80%',
      'Improved customer satisfaction',
      'Consistent support quality',
      '24/7 availability',
    ],
    learnMoreUrl: '/case-studies/customer-support',
  },
  {
    title: 'Data Analysis & Insights',
    description: 'Automate data analysis and generate actionable insights.',
    industry: 'Business Intelligence',
    benefits: [
      'Automated report generation',
      'Real-time data processing',
      'Pattern recognition',
      'Predictive analytics',
    ],
    learnMoreUrl: '/case-studies/data-analysis',
  },
  {
    title: 'Process Automation',
    description: 'Streamline workflows with intelligent process automation.',
    industry: 'Operations',
    benefits: [
      'Reduced manual work by 60%',
      'Error reduction',
      'Improved efficiency',
      'Cost savings',
    ],
    learnMoreUrl: '/case-studies/process-automation',
  },
];

const demoSteps = [
  {
    title: 'Create an Agent',
    content: 'Start by creating a new AI agent with our intuitive interface.',
    action: 'Create Agent',
  },
  {
    title: 'Configure Behavior',
    content: 'Set up your agent\'s behavior and learning parameters.',
    action: 'Configure',
  },
  {
    title: 'Train & Deploy',
    content: 'Train your agent with sample data and deploy to production.',
    action: 'Deploy',
  },
];

export default function FeaturesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategories.length === 0) return matchesSearch;
    
    // Add category matching logic here if you add categories to your features
    return matchesSearch;
  });

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
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Platform Features
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the powerful features that make Agentity the leading platform
            for AI agent development and deployment.
          </p>
        </div>

        {/* Feature Filter */}
        <div className="mt-12">
          <FeatureFilter
            categories={featureCategories}
            selectedCategories={selectedCategories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCategoryToggle={handleCategoryToggle}
          />
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
            >
              <div className="flex flex-col gap-4">
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <ul className="mt-2 space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="text-sm text-muted-foreground">
                      • {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">See It in Action</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experience how easy it is to get started with Agentity.
            </p>
          </div>
          <div className="mt-8">
            <FeatureDemo
              title="Getting Started with Agentity"
              description="Follow these simple steps to create and deploy your first AI agent."
              steps={demoSteps}
            />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Feature Comparison</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See how Agentity stacks up against the competition.
            </p>
          </div>
          <div className="mt-8">
            <ComparisonTable
              features={comparisonFeatures}
              competitors={['Competitor A', 'Competitor B', 'Competitor C']}
            />
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Use Cases</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover how organizations are using Agentity to transform their operations.
            </p>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <UseCaseCard key={useCase.title} {...useCase} />
            ))}
          </div>
        </div>

        {/* Feature Request */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Request a Feature</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Help us improve Agentity by suggesting new features.
            </p>
          </div>
          <div className="mt-8 max-w-xl mx-auto">
            <FeatureRequest />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your first AI agent today and experience the power of adaptive
            intelligence.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/register">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 