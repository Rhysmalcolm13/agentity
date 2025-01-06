'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const basicAgentCode = `import { Agent } from 'agentity';

const agent = new Agent({
  name: 'Customer Support Agent',
  description: 'Handles customer inquiries and support tickets',
  
  // Core settings
  memory: true,
  maxHistoryLength: 10,
  
  // Training configuration
  training: {
    enabled: true,
    model: 'gpt-4',
    temperature: 0.7,
  },
  
  // Runtime settings
  maxResponseTokens: 500,
  timeout: 30000, // 30 seconds
});`;

const agentConfigCode = `// Advanced configuration
const agent = new Agent({
  // Identity
  name: 'Sales Assistant',
  description: 'Assists with product inquiries and sales',
  avatar: 'https://example.com/avatar.png',
  
  // Memory settings
  memory: {
    enabled: true,
    type: 'conversational',
    storage: 'redis',
    ttl: 3600, // 1 hour
  },
  
  // Training settings
  training: {
    enabled: true,
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    stopSequences: ['Customer:', 'Agent:'],
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
  },
  
  // Runtime behavior
  defaultLanguage: 'en',
  fallbackLanguages: ['es', 'fr'],
  timezone: 'UTC',
  maxTurns: 10,
  idleTimeout: 300000, // 5 minutes
});`;

const agentEventsCode = `// Event handling
agent.on('start', () => {
  console.log('Agent started and ready to process messages');
});

agent.on('message', async (message, context) => {
  // Access conversation history
  const history = context.memory.getHistory();
  
  // Access user information
  const user = context.user;
  
  // Generate response using training
  const response = await context.generate(message);
  
  // Track analytics
  context.analytics.trackInteraction({
    type: 'message',
    content: message,
  });
  
  return response;
});

agent.on('error', (error) => {
  console.error('Agent encountered an error:', error);
});

agent.on('stop', () => {
  console.log('Agent stopped');
});`;

const agentMethodsCode = `// Agent lifecycle methods
await agent.start();
await agent.stop();
await agent.restart();

// Memory management
await agent.clearMemory();
await agent.importMemory(historicalData);
const history = await agent.getMemory();

// Training management
await agent.train(trainingData);
await agent.clearTraining();
await agent.exportTraining();

// Runtime utilities
const health = await agent.getHealth();
const metrics = await agent.getMetrics();
const config = agent.getConfig();`;

export default function AgentCreationPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Agent Creation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to create and configure AI agents with advanced settings and capabilities.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Basic Agent Creation</h2>
          <p className="text-muted-foreground">
            Create a basic agent with essential configuration options:
          </p>
          <CodeBlock
            code={basicAgentCode}
            language="typescript"
            filename="basic-agent.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Core Settings:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><code className="text-sm">name</code> - The agent's display name</li>
              <li><code className="text-sm">description</code> - A brief description of the agent's purpose</li>
              <li><code className="text-sm">memory</code> - Enable/disable conversation memory</li>
              <li><code className="text-sm">training</code> - Configure the training settings</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Advanced Configuration</h2>
          <p className="text-muted-foreground">
            Configure advanced settings for memory, training, and runtime behavior:
          </p>
          <CodeBlock
            code={agentConfigCode}
            language="typescript"
            filename="advanced-config.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Configuration Categories:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Identity settings (name, description, avatar)</li>
              <li>Memory configuration (type, storage, TTL)</li>
              <li>Training parameters (model, temperature, tokens)</li>
              <li>Runtime behavior (language, timeouts, limits)</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Event Handling</h2>
          <p className="text-muted-foreground">
            Handle agent events and access the conversation context:
          </p>
          <CodeBlock
            code={agentEventsCode}
            language="typescript"
            filename="event-handling.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Available Events:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><code className="text-sm">start</code> - Agent initialization</li>
              <li><code className="text-sm">message</code> - Message processing</li>
              <li><code className="text-sm">error</code> - Error handling</li>
              <li><code className="text-sm">stop</code> - Agent shutdown</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Agent Methods</h2>
          <p className="text-muted-foreground">
            Control agent behavior and access its capabilities:
          </p>
          <CodeBlock
            code={agentMethodsCode}
            language="typescript"
            filename="agent-methods.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Method Categories:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Lifecycle management (start, stop, restart)</li>
              <li>Memory operations (clear, import, export)</li>
              <li>Training management (train, clear, export)</li>
              <li>Runtime utilities (health, metrics, config)</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you know how to create and configure agents, you can:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Learn about the <a href="/docs/plugin-system" className="font-medium text-primary hover:underline">Plugin System</a></li>
            <li>Explore <a href="/docs/training" className="font-medium text-primary hover:underline">Training</a> capabilities</li>
            <li>Understand <a href="/docs/custom-plugins" className="font-medium text-primary hover:underline">Custom Plugin</a> development</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 