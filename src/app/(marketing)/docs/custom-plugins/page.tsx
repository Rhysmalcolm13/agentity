'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const basicPluginCode = `import { Plugin } from 'agentity';

class CustomPlugin extends Plugin {
  name = 'custom-plugin';
  version = '1.0.0';
  
  // Plugin configuration
  config = {
    apiKey: process.env.CUSTOM_API_KEY,
    baseUrl: 'https://api.example.com',
    timeout: 5000,
  };
  
  // Lifecycle hooks
  async onLoad() {
    console.log('Plugin loaded');
    await this.initialize();
  }
  
  async onUnload() {
    console.log('Plugin unloaded');
    await this.cleanup();
  }
  
  // Custom methods
  async initialize() {
    // Set up connections, load data, etc.
  }
  
  async cleanup() {
    // Close connections, clear cache, etc.
  }
  
  // Plugin functionality
  async processMessage(message: string) {
    // Add custom processing logic
    return message;
  }
}`;

const advancedPluginCode = `class AnalyticsPlugin extends Plugin {
  name = 'analytics';
  
  // State management
  private cache = new Map();
  private metrics = {
    messagesProcessed: 0,
    averageResponseTime: 0,
  };
  
  // Event handlers
  async onMessage(message: string, context: Context) {
    const startTime = Date.now();
    
    // Process message
    await this.trackMessage(message, context);
    
    // Update metrics
    this.metrics.messagesProcessed++;
    this.metrics.averageResponseTime = this.calculateAverageTime(startTime);
  }
  
  async onError(error: Error) {
    await this.trackError(error);
  }
  
  // Custom analytics methods
  private async trackMessage(message: string, context: Context) {
    await this.sendToAnalytics({
      type: 'message',
      content: message,
      userId: context.userId,
      timestamp: new Date(),
    });
  }
  
  private async trackError(error: Error) {
    await this.sendToAnalytics({
      type: 'error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
    });
  }
  
  // Utility methods
  private calculateAverageTime(startTime: number) {
    const duration = Date.now() - startTime;
    return (this.metrics.averageResponseTime * (this.metrics.messagesProcessed - 1) + duration) 
      / this.metrics.messagesProcessed;
  }
  
  // API integration
  private async sendToAnalytics(data: any) {
    // Send data to analytics service
    await fetch('https://analytics.example.com/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}`;

const pluginUsageCode = `import { Agent } from 'agentity';
import { CustomPlugin } from './custom-plugin';
import { AnalyticsPlugin } from './analytics-plugin';

// Create agent with plugins
const agent = new Agent({
  name: 'Enhanced Agent',
  plugins: [
    new CustomPlugin({
      apiKey: 'your_api_key',
      baseUrl: 'https://custom.api.com',
    }),
    new AnalyticsPlugin(),
  ],
});

// Use plugins in message handler
agent.on('message', async (message, context) => {
  // Access plugin instances
  const customPlugin = context.plugins['custom-plugin'];
  const analytics = context.plugins.analytics;
  
  // Use plugin functionality
  const processed = await customPlugin.processMessage(message);
  await analytics.trackMessage(processed, context);
  
  return processed;
});`;

const bestPracticesCode = `class BestPracticePlugin extends Plugin {
  // Clear and descriptive name
  name = 'data-enrichment';
  version = '1.0.0';
  
  // Typed configuration
  config: DataEnrichmentConfig;
  
  // Private state management
  private cache: Map<string, any>;
  private rateLimiter: RateLimiter;
  
  constructor(config: DataEnrichmentConfig) {
    super();
    this.config = this.validateConfig(config);
    this.cache = new Map();
    this.rateLimiter = new RateLimiter(config.rateLimit);
  }
  
  // Proper error handling
  async processData(data: any) {
    try {
      await this.rateLimiter.wait();
      
      // Check cache first
      const cached = this.cache.get(data.id);
      if (cached) return cached;
      
      // Process and cache
      const enriched = await this.enrichData(data);
      this.cache.set(data.id, enriched);
      
      return enriched;
    } catch (error) {
      this.handleError(error);
      throw new PluginError('Failed to process data', error);
    }
  }
  
  // Cleanup resources
  async onUnload() {
    await this.cleanup();
  }
}`;

export default function CustomPluginsPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Custom Plugins</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to create custom plugins to extend agent functionality.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Basic Plugin Structure</h2>
          <p className="text-muted-foreground">
            Create a basic plugin by extending the Plugin class:
          </p>
          <CodeBlock
            code={basicPluginCode}
            language="typescript"
            filename="custom-plugin.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Key Components:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Plugin metadata (name, version)</li>
              <li>Configuration options</li>
              <li>Lifecycle hooks</li>
              <li>Custom methods</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Advanced Plugin Features</h2>
          <p className="text-muted-foreground">
            Implement advanced features like state management and event handling:
          </p>
          <CodeBlock
            code={advancedPluginCode}
            language="typescript"
            filename="analytics-plugin.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Advanced Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>State management</li>
              <li>Event handling</li>
              <li>Metrics tracking</li>
              <li>API integration</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Using Custom Plugins</h2>
          <p className="text-muted-foreground">
            Add and use custom plugins with agents:
          </p>
          <CodeBlock
            code={pluginUsageCode}
            language="typescript"
            filename="plugin-usage.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Usage Patterns:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Plugin initialization</li>
              <li>Configuration passing</li>
              <li>Accessing plugins</li>
              <li>Using plugin methods</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Best Practices</h2>
          <p className="text-muted-foreground">
            Follow these best practices when creating plugins:
          </p>
          <CodeBlock
            code={bestPracticesCode}
            language="typescript"
            filename="best-practices.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Best Practices:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Clear naming and versioning</li>
              <li>Type safety</li>
              <li>Resource management</li>
              <li>Error handling</li>
              <li>Performance optimization</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Continue learning about advanced features:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Learn about <a href="/docs/api-integration" className="font-medium text-primary hover:underline">API Integration</a></li>
            <li>Explore <a href="/docs/advanced-training" className="font-medium text-primary hover:underline">Advanced Training</a></li>
            <li>View the <a href="/docs/api-reference" className="font-medium text-primary hover:underline">API Reference</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 