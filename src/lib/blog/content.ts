import type { BlogPost, Category, Tag } from '@/lib/types/blog';

export const categories: Category[] = [
  { id: '1', name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step guides and tutorials' },
  { id: '2', name: 'News', slug: 'news', description: 'Latest updates and announcements' },
  { id: '3', name: 'Case Studies', slug: 'case-studies', description: 'Real-world examples and success stories' }
];

export const tags: Tag[] = [
  { id: '1', name: 'Getting Started', slug: 'getting-started' },
  { id: '2', name: 'AI Agents', slug: 'ai-agents' },
  { id: '3', name: 'Automation', slug: 'automation' },
  { id: '4', name: 'Integration', slug: 'integration' },
  { id: '5', name: 'Customer Support', slug: 'customer-support' },
  { id: '6', name: 'Advanced', slug: 'advanced' },
  { id: '7', name: 'Future of Work', slug: 'future-of-work' },
  { id: '8', name: 'AI Research', slug: 'ai-research' },
  { id: '9', name: 'API', slug: 'api' }
];

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with AI Agents',
    slug: 'getting-started-with-ai-agents',
    excerpt: 'Learn how to create and deploy your first AI agent with Agentity. This guide covers the basics of agent creation, configuration, and deployment.',
    content: `
# Getting Started with AI Agents

Welcome to Agentity! This comprehensive guide will walk you through creating and deploying your first AI agent.

## What is an AI Agent?

An AI agent is an autonomous program that can perceive its environment and take actions to achieve specific goals. With Agentity, you can create powerful AI agents that automate tasks, process information, and interact with users naturally.

## Creating Your First Agent

1. **Sign up for an Account**
   First, create your Agentity account at [dashboard.agentity.ai](https://dashboard.agentity.ai).

2. **Create a New Agent**
   Click the "New Agent" button and choose a template or start from scratch.

3. **Configure Your Agent**
   Set up your agent's basic information:
   - Name and description
   - Input/output channels
   - Processing rules
   - Response templates

4. **Test and Deploy**
   Use our testing environment to verify your agent's behavior, then deploy it to production with a single click.

## Best Practices

- Start with simple use cases
- Test thoroughly in development
- Monitor agent performance
- Iterate based on user feedback

## Next Steps

Now that you've created your first agent, explore our advanced tutorials to learn about:
- Custom workflows
- Integration with external services
- Natural language processing
- Machine learning capabilities

Join our community to share your experiences and learn from other developers!
    `,
    coverImage: '/blog/getting-started.jpg',
    author: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@agentity.ai',
      avatar: '/team/sarah.jpg',
      bio: 'AI Product Manager at Agentity',
      role: 'Product Manager',
      social: {
        twitter: 'sarahj',
        linkedin: 'sarahjohnson',
      },
    },
    category: categories[0], // Tutorials
    categories: ['Tutorials', 'Getting Started'],
    tags: [
      { id: '1', name: 'Getting Started', slug: 'getting-started' },
      { id: '2', name: 'AI Agents', slug: 'ai-agents' },
    ],
    readingTime: 5,
    publishedAt: '2025-01-04T10:00:00Z',
    featured: true,
    views: 1250,
    likes: 48,
  },
  {
    id: '2',
    title: 'Introducing Agentity: The Future of AI Automation',
    slug: 'introducing-agentity',
    excerpt: 'Today, we\'re excited to announce the launch of Agentity, a revolutionary platform that makes AI automation accessible to businesses of all sizes.',
    content: `
# Introducing Agentity: The Future of AI Automation

We're thrilled to announce the launch of Agentity, a groundbreaking platform that democratizes AI automation for businesses of all sizes. Our mission is to make powerful AI capabilities accessible, manageable, and scalable for everyone.

## Why Agentity?

In today's fast-paced digital world, businesses need intelligent automation solutions that can adapt and scale with their needs. Agentity provides:

- **Intuitive Agent Creation**: Build sophisticated AI agents without deep technical expertise
- **Seamless Integration**: Connect with your existing tools and workflows
- **Enterprise-Grade Security**: Bank-level security and compliance features
- **Scalable Infrastructure**: Grow from prototype to production without friction

## Key Features

1. **Visual Agent Builder**
   Create complex workflows with our drag-and-drop interface

2. **Natural Language Processing**
   Advanced NLP capabilities for human-like interactions

3. **Multi-Channel Support**
   Deploy agents across web, mobile, and messaging platforms

4. **Analytics Dashboard**
   Monitor performance and gather insights in real-time

## Getting Started

Visit [agentity.ai](https://agentity.ai) to create your free account and start building your first AI agent today.

Join us in shaping the future of work!
    `,
    coverImage: '/blog/launch-announcement.jpg',
    author: {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@agentity.ai',
      avatar: '/team/michael.jpg',
      bio: 'CEO & Co-founder of Agentity',
      role: 'CEO',
      social: {
        twitter: 'michaelc',
        linkedin: 'michaelchen',
      },
    },
    category: categories[1], // News
    categories: ['News', 'Announcements'],
    tags: [
      { id: '3', name: 'Automation', slug: 'automation' },
      { id: '4', name: 'Integration', slug: 'integration' },
    ],
    readingTime: 3,
    publishedAt: '2025-01-03T09:00:00Z',
    featured: false,
    views: 2500,
    likes: 156,
  },
  {
    id: '3',
    title: 'Advanced Agent Configuration: Best Practices',
    slug: 'advanced-agent-configuration',
    excerpt: 'Learn advanced techniques for configuring AI agents, including custom workflows, advanced triggers, and integration patterns.',
    content: `
# Advanced Agent Configuration: Best Practices

Take your AI agents to the next level with these advanced configuration techniques and best practices.

## Custom Workflows

Learn how to create sophisticated workflows that handle complex business logic:

1. **State Management**
   - Implementing finite state machines
   - Handling edge cases
   - Error recovery strategies

2. **Advanced Triggers**
   - Time-based triggers
   - Event-driven actions
   - Conditional execution

3. **Integration Patterns**
   - Webhook management
   - API authentication
   - Rate limiting and quotas

## Performance Optimization

Tips for maintaining high performance:

- Caching strategies
- Resource management
- Load balancing
- Monitoring and alerts

## Security Considerations

Protecting your agents and data:

- Access control
- Data encryption
- Audit logging
- Compliance requirements

## Deployment Strategies

Best practices for production deployment:

- Blue-green deployments
- Canary releases
- Rollback procedures
- Monitoring setup

Join our advanced users community to share your experiences and learn from others!
    `,
    coverImage: '/blog/advanced-config.jpg',
    author: {
      id: '4',
      name: 'David Kim',
      email: 'david@agentity.ai',
      avatar: '/team/david.jpg',
      bio: 'Technical Lead at Agentity',
      role: 'Engineering',
      social: {
        twitter: 'davidk',
        github: 'davidkim',
      },
    },
    category: categories[0], // Tutorials
    categories: ['Tutorials', 'Advanced'],
    tags: [
      { id: '2', name: 'AI Agents', slug: 'ai-agents' },
      { id: '6', name: 'Advanced', slug: 'advanced' },
    ],
    readingTime: 12,
    publishedAt: '2025-01-01T11:00:00Z',
    featured: false,
    views: 1100,
    likes: 67,
  },
  {
    id: '4',
    title: 'How Company X Automated Customer Support with AI Agents',
    slug: 'company-x-case-study',
    excerpt: 'Discover how Company X achieved 80% faster response times and improved customer satisfaction using Agentity\'s AI automation platform.',
    content: `
# How Company X Revolutionized Customer Support with AI Agents

Learn how Company X, a leading e-commerce platform, transformed their customer support operations using Agentity's AI agents.

## The Challenge

Company X was facing:
- Growing support ticket volume
- Long response times
- Inconsistent service quality
- High support costs

## The Solution

Implementation of Agentity's AI agents:
1. **24/7 First-Line Support**
   - Instant responses to common queries
   - Smart ticket routing
   - Multilingual support

2. **Automated Workflows**
   - Order status tracking
   - Return processing
   - Account management

3. **Integration with Existing Systems**
   - CRM integration
   - Inventory management
   - Payment processing

## The Results

After implementing Agentity:
- 80% faster response times
- 65% reduction in support costs
- 92% customer satisfaction rate
- 45% decrease in support staff workload

## Key Learnings

1. Start with high-volume, repetitive tasks
2. Invest in agent training and optimization
3. Monitor and adjust based on feedback
4. Maintain human oversight for complex issues

Download the full case study for detailed insights and implementation strategies.
    `,
    coverImage: '/blog/case-study-1.jpg',
    author: {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@agentity.ai',
      avatar: '/team/emily.jpg',
      bio: 'Customer Success Lead at Agentity',
      role: 'Customer Success',
      social: {
        twitter: 'emilyr',
        linkedin: 'emilyrodriguez',
      },
    },
    category: categories[2], // Case Studies
    categories: ['Case Studies', 'Customer Support'],
    tags: [
      { id: '2', name: 'AI Agents', slug: 'ai-agents' },
      { id: '5', name: 'Customer Support', slug: 'customer-support' },
    ],
    readingTime: 8,
    publishedAt: '2025-01-02T14:30:00Z',
    featured: false,
    views: 890,
    likes: 32,
  },
  {
    id: '5',
    title: 'The Future of Work: AI Agents and Human Collaboration',
    slug: 'future-of-work',
    excerpt: 'Explore how AI agents are transforming the workplace and creating new opportunities for human-AI collaboration.',
    content: `
# The Future of Work: AI Agents and Human Collaboration

As AI technology continues to evolve, the workplace is undergoing a fundamental transformation. Let's explore how AI agents are reshaping work and creating new opportunities for human-AI collaboration.

## The Evolution of Work

Historical perspective:
- Industrial Revolution: Mechanical automation
- Digital Revolution: Information automation
- AI Revolution: Cognitive automation

## The Role of AI Agents

Modern AI agents are:
- Augmenting human capabilities
- Automating routine tasks
- Enabling data-driven decisions
- Facilitating creative work

## Human-AI Collaboration

Best practices for effective collaboration:
1. Clear role definition
2. Transparent communication
3. Continuous learning
4. Ethical considerations

## Impact on Jobs

How AI is changing the job market:
- New roles emerging
- Skills transformation
- Productivity enhancement
- Work-life balance

## Preparing for the Future

Steps organizations can take:
1. Invest in training
2. Update workflows
3. Foster innovation
4. Embrace change

The future of work is not about replacing humans, but about creating powerful human-AI partnerships.
    `,
    coverImage: '/blog/future-work.jpg',
    author: {
      id: '5',
      name: 'Rachel Thompson',
      email: 'rachel@agentity.ai',
      avatar: '/team/rachel.jpg',
      bio: 'AI Research Lead at Agentity',
      role: 'Research',
      social: {
        twitter: 'rachelt',
        linkedin: 'rachelthompson',
      },
    },
    category: categories[1], // News
    categories: ['News', 'Research'],
    tags: [
      { id: '7', name: 'Future of Work', slug: 'future-of-work' },
      { id: '8', name: 'AI Research', slug: 'ai-research' },
    ],
    readingTime: 7,
    publishedAt: '2024-12-30T15:45:00Z',
    featured: true,
    views: 1800,
    likes: 94,
  },
  {
    id: '6',
    title: 'Building Custom Integrations with Agentity API',
    slug: 'custom-integrations-api',
    excerpt: 'A comprehensive guide to building custom integrations using the Agentity API, with real-world examples and code samples.',
    content: `
# Building Custom Integrations with Agentity API

Learn how to extend your AI agents' capabilities by building custom integrations using the Agentity API.

## API Overview

Key concepts:
- Authentication
- Rate limiting
- Webhooks
- Error handling

## Integration Examples

1. **CRM Integration**
\`\`\`typescript
import { AgentityClient } from '@agentity/sdk';

const client = new AgentityClient({
  apiKey: process.env.AGENTITY_API_KEY
});

async function syncCustomerData() {
  const customers = await getCRMCustomers();
  await client.agents.updateContext({
    agentId: 'customer-support',
    data: { customers }
  });
}
\`\`\`

2. **Slack Integration**
\`\`\`typescript
app.post('/slack/events', async (req, res) => {
  const { event } = req.body;
  
  await client.agents.trigger({
    agentId: 'slack-assistant',
    event: 'message',
    data: event
  });
});
\`\`\`

## Best Practices

1. Error Handling
2. Rate Limiting
3. Security
4. Testing
5. Monitoring

## Advanced Topics

- Custom Actions
- Context Management
- Event Processing
- Data Synchronization

Start building your custom integrations today!
    `,
    coverImage: '/blog/api-integration.jpg',
    author: {
      id: '4',
      name: 'David Kim',
      email: 'david@agentity.ai',
      avatar: '/team/david.jpg',
      bio: 'Technical Lead at Agentity',
      role: 'Engineering',
      social: {
        twitter: 'davidk',
        github: 'davidkim',
      },
    },
    category: categories[0], // Tutorials
    categories: ['Tutorials', 'API'],
    tags: [
      { id: '4', name: 'Integration', slug: 'integration' },
      { id: '9', name: 'API', slug: 'api' },
      { id: '6', name: 'Advanced', slug: 'advanced' },
    ],
    readingTime: 15,
    publishedAt: '2024-12-28T13:20:00Z',
    featured: false,
    views: 950,
    likes: 41,
  }
]; 