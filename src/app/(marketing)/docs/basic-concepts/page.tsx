'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const agentCode = `import { Agent } from 'agentity';

const agent = new Agent({
  name: 'Example Agent',
  description: 'Demonstrates basic agent concepts',
  // Core configuration
  memory: true,
  training: {
    enabled: true,
    model: 'gpt-4',
  },
});`;

const eventsCode = `// Event handling
agent.on('message', async (message, context) => {
  // Handle incoming messages
  return 'Response to message';
});

agent.on('error', (error) => {
  console.error('Agent error:', error);
});

// Event emission
agent.emit('custom-event', { data: 'example' });`;

const pluginsCode = `import { Plugin } from 'agentity';

class TranslationPlugin extends Plugin {
  name = 'translation';
  
  async translate(text: string, targetLang: string) {
    // Translation implementation
    return translatedText;
  }
}

// Add plugin to agent
agent.use(new TranslationPlugin());

// Use plugin in message handler
agent.on('message', async (message, context) => {
  const translated = await context.plugins.translation.translate(
    message,
    'es'
  );
});`;

const trainingCode = `// Train the agent with examples
await agent.train([
  {
    input: 'What's the weather like?',
    output: 'I can check the weather for you. Which city?',
  },
  {
    input: 'Tell me about London weather',
    output: 'Let me check the weather in London for you...',
  },
]);

// Use training data in responses
agent.on('message', async (message, context) => {
  const response = await context.generate(message);
  return response;
});`;

export default function BasicConceptsPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Basic Concepts</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn the core concepts and building blocks of Agentity.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Agents</h2>
          <p className="text-muted-foreground">
            Agents are the core building blocks of Agentity. An agent is an autonomous entity that can
            process messages, learn from training data, and interact with plugins.
          </p>
          <CodeBlock
            code={agentCode}
            language="typescript"
            filename="agent.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Key Agent Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Configurable name and description</li>
              <li>Built-in memory system</li>
              <li>Training capabilities</li>
              <li>Plugin support</li>
              <li>Event-based architecture</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Events</h2>
          <p className="text-muted-foreground">
            Agents use an event-based system for communication. You can listen for events and emit custom events.
          </p>
          <CodeBlock
            code={eventsCode}
            language="typescript"
            filename="events.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Common Events:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><code className="text-sm">message</code> - Triggered when the agent receives a message</li>
              <li><code className="text-sm">error</code> - Triggered when an error occurs</li>
              <li><code className="text-sm">start</code> - Triggered when the agent starts</li>
              <li><code className="text-sm">stop</code> - Triggered when the agent stops</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Plugins</h2>
          <p className="text-muted-foreground">
            Plugins extend agent functionality by adding new capabilities like translation, data storage, or API integration.
          </p>
          <CodeBlock
            code={pluginsCode}
            language="typescript"
            filename="plugins.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Plugin Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Modular functionality</li>
              <li>Access to agent context</li>
              <li>Reusable across agents</li>
              <li>Configurable options</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Training</h2>
          <p className="text-muted-foreground">
            Agents can be trained with example conversations to improve their responses and learn specific behaviors.
          </p>
          <CodeBlock
            code={trainingCode}
            language="typescript"
            filename="training.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Training Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Example-based training</li>
              <li>Model selection</li>
              <li>Response generation</li>
              <li>Fine-tuning capabilities</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you understand the basic concepts, you can:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Learn about <a href="/docs/agent-creation" className="font-medium text-primary hover:underline">Agent Creation</a> in detail</li>
            <li>Explore the <a href="/docs/plugin-system" className="font-medium text-primary hover:underline">Plugin System</a></li>
            <li>Understand <a href="/docs/training" className="font-medium text-primary hover:underline">Training</a> capabilities</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 