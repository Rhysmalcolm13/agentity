'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingCalculator } from '@/components/(marketing)/pricing/pricing-calculator';
import { EnterpriseForm } from '@/components/(marketing)/pricing/enterprise-form';
import { PricingFAQ } from '@/components/(marketing)/pricing/pricing-faq';
import { PricingToggle } from '@/components/(marketing)/pricing/pricing-toggle';
import { TestimonialCard } from '@/components/(marketing)/pricing/testimonial-card';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small teams getting started with AI agents',
    price: {
      monthly: 49,
      annual: 39,
    },
    features: [
      'Up to 5 AI agents',
      '10 team members',
      'Basic analytics',
      'Standard support',
      'Core integrations',
      'Community access',
    ],
  },
  {
    name: 'Professional',
    description: 'Ideal for growing teams with advanced needs',
    price: {
      monthly: 99,
      annual: 79,
    },
    features: [
      'Up to 20 AI agents',
      'Unlimited team members',
      'Advanced analytics',
      'Priority support',
      'All integrations',
      'API access',
      'Custom training',
      'Audit logs',
    ],
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: {
      monthly: null,
      annual: null,
    },
    features: [
      'Unlimited AI agents',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Advanced security',
      'Custom training',
      'Audit logs',
      'On-premise option',
    ],
  },
];

const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'CTO',
    company: 'TechStart Inc.',
    content: 'The pricing is transparent and the value we get is incredible. The AI agents have transformed our customer support operations.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Engineering Manager',
    company: 'InnovateCorp',
    content: 'We started with the Professional plan and it scaled perfectly with our team. The support team is always helpful.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Director',
    company: 'SaaS Solutions',
    content: 'The enterprise features are exactly what we needed. Custom integrations and dedicated support make all the difference.',
    rating: 5,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const router = useRouter();

  const handleGetStarted = (planName: string) => {
    router.push(`/register?plan=${planName.toLowerCase()}&billing=${isAnnual ? 'annual' : 'monthly'}`);
  };

  const handleContactSales = () => {
    router.push('/contact?type=sales');
  };

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
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="mt-8">
          <PricingToggle
            isAnnual={isAnnual}
            onToggle={setIsAnnual}
          />
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-lg border border-border bg-card p-8"
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-4 flex items-baseline">
                {plan.price.monthly !== null ? (
                  <>
                    <span className="text-3xl font-bold">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /month
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">Custom Pricing</span>
                )}
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {plan.name === 'Enterprise' ? (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleContactSales}
                  >
                    Contact Sales
                  </Button>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={() => handleGetStarted(plan.name)}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Calculator */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Calculate Your Price</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get an estimate based on your specific needs
            </p>
          </div>
          <div className="mt-8 max-w-xl mx-auto">
            <PricingCalculator />
          </div>
        </div>

        {/* Enterprise Form */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Enterprise Solutions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get a customized plan that fits your organization&apos;s needs
            </p>
          </div>
          <div className="mt-8 max-w-2xl mx-auto">
            <EnterpriseForm />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of satisfied teams using Agentity
            </p>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
              />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <PricingFAQ />
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button 
              size="lg"
              onClick={() => handleGetStarted('Starter')}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleContactSales}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 