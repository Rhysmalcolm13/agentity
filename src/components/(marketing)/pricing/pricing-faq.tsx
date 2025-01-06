'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'How does the pricing work?',
    answer:
      'Our pricing is based on the number of AI agents and users you need. Each plan includes core features, and you can customize your plan with additional agents and users as needed.',
  },
  {
    question: 'Can I change my plan later?',
    answer:
      'Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will be reflected in your next billing cycle.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes, we offer a 14-day free trial on all plans. No credit card required. You can test all features and see which plan best fits your needs.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For enterprise plans, we also support wire transfers and purchase orders.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with our service, contact our support team for a full refund.',
  },
  {
    question: 'What\'s included in the Enterprise plan?',
    answer:
      'Enterprise plans include custom pricing, dedicated support, advanced security features, custom integrations, and SLA guarantees. Contact our sales team for details.',
  },
];

export function PricingFAQ() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
        <p className="mt-2 text-muted-foreground">
          Everything you need to know about our pricing and plans
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 