'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SearchBar } from '@/components/(marketing)/faq/search-bar';
import { CategoryFilter } from '@/components/(marketing)/faq/category-filter';
import { QuestionCard } from '@/components/(marketing)/faq/question-card';
import { SupportCTA } from '@/components/(marketing)/faq/support-cta';

// Sample data - replace with actual data
const categories = [
  { id: 'general', name: 'General', count: 4 },
  { id: 'account', name: 'Account', count: 3 },
  { id: 'billing', name: 'Billing', count: 3 },
  { id: 'features', name: 'Features', count: 4 },
  { id: 'security', name: 'Security', count: 2 },
];

const faqs = [
  {
    id: '1',
    category: 'general',
    question: 'What is Agentity?',
    answer: 'Agentity is a platform that enables businesses to create and deploy AI agents for various tasks. Our platform makes it easy to automate workflows and enhance productivity using advanced AI technology.',
    relatedQuestions: [
      { id: '2', question: 'How does Agentity work?' },
      { id: '3', question: 'What can I do with Agentity?' }
    ]
  },
  {
    id: '2',
    category: 'general',
    question: 'How does Agentity work?',
    answer: 'Agentity uses advanced AI models and natural language processing to create intelligent agents that can understand and execute tasks. You can define custom workflows, set up automation rules, and integrate with your existing tools and systems.',
    relatedQuestions: [
      { id: '1', question: 'What is Agentity?' },
      { id: '4', question: 'What types of tasks can Agentity automate?' }
    ]
  },
  {
    id: '3',
    category: 'features',
    question: 'What can I do with Agentity?',
    answer: 'With Agentity, you can automate customer support, process documents, analyze data, manage social media, schedule appointments, and much more. Our platform is flexible and can be customized to handle various business processes.',
    relatedQuestions: [
      { id: '4', question: 'What types of tasks can Agentity automate?' },
      { id: '5', question: 'How do I create my first AI agent?' }
    ]
  },
  {
    id: '4',
    category: 'features',
    question: 'What types of tasks can Agentity automate?',
    answer: 'Agentity can automate a wide range of tasks including email responses, data entry, document processing, customer inquiries, appointment scheduling, and more. Our AI agents can be trained to handle specific workflows in your business.',
    relatedQuestions: [
      { id: '3', question: 'What can I do with Agentity?' },
      { id: '6', question: 'How do I integrate Agentity with my existing tools?' }
    ]
  },
  {
    id: '5',
    category: 'account',
    question: 'How do I create my first AI agent?',
    answer: 'Creating an AI agent is simple: 1) Log into your dashboard, 2) Click "Create New Agent", 3) Choose a template or start from scratch, 4) Define your agent\'s tasks and rules, 5) Train your agent with examples, and 6) Deploy it to start working.',
    relatedQuestions: [
      { id: '7', question: 'How long does it take to set up an agent?' },
      { id: '8', question: 'What are agent templates?' }
    ]
  },
  {
    id: '6',
    category: 'features',
    question: 'How do I integrate Agentity with my existing tools?',
    answer: 'Agentity offers various integration options through our API and pre-built connectors. We support popular platforms like Slack, Gmail, Microsoft 365, Salesforce, and more. Our documentation provides detailed integration guides.',
    relatedQuestions: [
      { id: '9', question: 'What platforms do you integrate with?' },
      { id: '10', question: 'Is there an API available?' }
    ]
  },
  {
    id: '7',
    category: 'general',
    question: 'How long does it take to set up an agent?',
    answer: 'Basic agents can be set up in minutes using our templates. Custom agents typically take a few hours to configure and train. Complex workflows might require a few days to perfect, but our support team is here to help.',
    relatedQuestions: [
      { id: '5', question: 'How do I create my first AI agent?' },
      { id: '8', question: 'What are agent templates?' }
    ]
  },
  {
    id: '8',
    category: 'features',
    question: 'What are agent templates?',
    answer: 'Agent templates are pre-configured AI agents designed for specific use cases. They come with built-in rules, workflows, and training data to help you get started quickly. You can customize these templates to match your needs.',
    relatedQuestions: [
      { id: '5', question: 'How do I create my first AI agent?' },
      { id: '7', question: 'How long does it take to set up an agent?' }
    ]
  },
  {
    id: '9',
    category: 'billing',
    question: 'How much does Agentity cost?',
    answer: 'Agentity offers flexible pricing plans starting from $49/month for basic features. Our pricing is based on the number of agents, tasks, and API calls. Custom enterprise plans are available for larger organizations.',
    relatedQuestions: [
      { id: '10', question: 'Is there a free trial?' },
      { id: '11', question: 'What is included in the enterprise plan?' }
    ]
  },
  {
    id: '10',
    category: 'billing',
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start. You can create up to 3 agents during the trial period to test our platform.',
    relatedQuestions: [
      { id: '9', question: 'How much does Agentity cost?' },
      { id: '5', question: 'How do I create my first AI agent?' }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter questions based on search query and selected category
  const filteredQuestions = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleRelatedQuestionClick = (id: string) => {
    const element = document.getElementById(`faq-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Highlight the card briefly
      element.classList.add('ring-2', 'ring-primary');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-primary');
      }, 2000);
    }
  };

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

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about Agentity. Can&apos;t find what you&apos;re
            looking for? Our support team is here to help.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mt-12 space-y-6">
          <SearchBar 
            onSearch={setSearchQuery} 
            suggestions={faqs.map(faq => ({
              id: faq.id,
              question: faq.question,
              category: categories.find(c => c.id === faq.category)?.name || faq.category
            }))}
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* FAQ List */}
        <div className="mt-12 grid gap-6">
          {filteredQuestions.map((faq) => (
            <div key={faq.id} id={`faq-${faq.id}`}>
              <QuestionCard
                question={faq.question}
                answer={faq.answer}
                relatedQuestions={faq.relatedQuestions}
                onRelatedQuestionClick={handleRelatedQuestionClick}
              />
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center">
              <p className="text-muted-foreground">
                No questions found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Support CTA */}
        <div className="mt-16">
          <SupportCTA />
        </div>
      </div>
    </div>
  );
} 