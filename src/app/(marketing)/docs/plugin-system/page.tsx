'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const basicPluginCode = `import { Plugin } from 'agentity';

class TranslationPlugin extends Plugin {
  name = 'translation';
  version = '1.0.0';
  
  // Plugin configuration
  config = {
    defaultLanguage: 'en',
    apiKey: process.env.TRANSLATION_API_KEY,
  };
  
  // Plugin methods
  async translate(text: string, targetLang: string) {
    // Implementation
    return translatedText;
  }
  
  // Plugin lifecycle hooks
  async onLoad() {
    // Initialize plugin
    await this.initializeTranslationAPI();
  }
  
  async onUnload() {
    // Cleanup
    await this.closeConnections();
  }
}`;

const pluginUsageCode = `import { Agent } from 'agentity';
import { TranslationPlugin } from './translation-plugin';
import { DatabasePlugin } from './database-plugin';

// Create agent with plugins
const agent = new Agent({
  name: 'Multilingual Assistant',
  plugins: [
    new TranslationPlugin({
      defaultLanguage: 'es',
    }),
    new DatabasePlugin(),
  ],
});

// Use plugins in message handler
agent.on('message', async (message, context) => {
  // Access plugin instances
  const translator = context.plugins.translation;
  const db = context.plugins.database;
  
  // Use plugin functionality
  const translated = await translator.translate(message, 'fr');
  await db.saveMessage(translated);
  
  return translated;
});`;

const pluginEventsCode = `class AnalyticsPlugin extends Plugin {
  name = 'analytics';
  
  // Listen to agent events
  async onLoad() {
    this.agent.on('message', this.trackMessage.bind(this));
    this.agent.on('error', this.trackError.bind(this));
  }
  
  // Emit custom events
  async trackMessage(message: string) {
    await this.logAnalytics('message', { content: message });
    this.agent.emit('analytics:message-tracked', { message });
  }
  
  async trackError(error: Error) {
    await this.logAnalytics('error', { error: error.message });
    this.agent.emit('analytics:error-tracked', { error });
  }
}`;

const pluginCommunicationCode = `// Plugin-to-plugin communication
class WorkflowPlugin extends Plugin {
  name = 'workflow';
  
  async processMessage(message: string) {
    // Get other plugin instances
    const translator = this.agent.plugins.translation;
    const analytics = this.agent.plugins.analytics;
    const db = this.agent.plugins.database;
    
    // Coordinate workflow between plugins
    const translated = await translator.translate(message, 'es');
    await analytics.trackTranslation(translated);
    await db.saveWorkflowResult({
      original: message,
      translated,
      timestamp: new Date(),
    });
    
    return translated;
  }
}`;

export default function PluginSystemPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Plugin System</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to use and create plugins to extend agent functionality.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Creating Plugins</h2>
          <p className="text-muted-foreground">
            Create a basic plugin by extending the Plugin class:
          </p>
          <CodeBlock
            code={basicPluginCode}
            language="typescript"
            filename="translation-plugin.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Plugin Structure:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Unique name and version</li>
              <li>Configuration options</li>
              <li>Custom methods</li>
              <li>Lifecycle hooks</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Using Plugins</h2>
          <p className="text-muted-foreground">
            Add plugins to agents and use them in message handlers:
          </p>
          <CodeBlock
            code={pluginUsageCode}
            language="typescript"
            filename="plugin-usage.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Key Concepts:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Plugin initialization with options</li>
              <li>Accessing plugins through context</li>
              <li>Using multiple plugins together</li>
              <li>Plugin method invocation</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Plugin Events</h2>
          <p className="text-muted-foreground">
            Handle and emit events within plugins:
          </p>
          <CodeBlock
            code={pluginEventsCode}
            language="typescript"
            filename="analytics-plugin.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Event Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Listen to agent events</li>
              <li>Emit custom events</li>
              <li>Event-based plugin actions</li>
              <li>Analytics and monitoring</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Plugin Communication</h2>
          <p className="text-muted-foreground">
            Enable communication between plugins:
          </p>
          <CodeBlock
            code={pluginCommunicationCode}
            language="typescript"
            filename="workflow-plugin.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Communication Patterns:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Direct plugin access</li>
              <li>Event-based communication</li>
              <li>Workflow coordination</li>
              <li>Data sharing</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you understand the plugin system, you can:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Create <a href="/docs/custom-plugins" className="font-medium text-primary hover:underline">Custom Plugins</a></li>
            <li>Explore <a href="/docs/api-integration" className="font-medium text-primary hover:underline">API Integration</a></li>
            <li>Learn about <a href="/docs/training" className="font-medium text-primary hover:underline">Training</a> plugins</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 