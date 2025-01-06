'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const installationCode = `# Using npm
npm install @agentity/sdk

# Using yarn
yarn add @agentity/sdk

# Using pnpm
pnpm add @agentity/sdk`;

const initializationCode = `import { AgentityClient } from '@agentity/sdk';

// Initialize the client
const client = new AgentityClient({
  apiKey: 'your_api_key_here',
  environment: 'production', // or 'development'
  timeout: 30000, // 30 seconds
  retries: 3,
});`;

const agentManagementCode = `// Create an agent
const agent = await client.agents.create({
  name: 'Support Agent',
  description: 'Handles customer inquiries',
  training: {
    enabled: true,
    model: 'gpt-4',
  },
});

// List all agents
const agents = await client.agents.list({
  limit: 10,
  offset: 0,
  status: 'active',
});

// Get agent details
const agentDetails = await client.agents.get(agent.id);

// Update agent
await client.agents.update(agent.id, {
  name: 'Premium Support Agent',
  description: 'Handles premium customer inquiries',
});

// Delete agent
await client.agents.delete(agent.id);`;

const interactionCode = `// Send a message
const response = await client.agents.sendMessage(agent.id, {
  content: 'How do I reset my password?',
  context: {
    userId: 'user_123',
    sessionId: 'session_456',
  },
});

// Stream a response
const stream = await client.agents.streamMessage(agent.id, {
  content: 'Tell me about your features',
  streamOptions: {
    chunkSize: 100,
  },
});

for await (const chunk of stream) {
  console.log('Received chunk:', chunk);
}`;

const trainingCode = `// Train an agent
const training = await client.agents.train(agent.id, {
  examples: [
    {
      input: 'How do I reset my password?',
      output: 'Click the "Forgot Password" link on the login page.',
    },
  ],
  config: {
    model: 'gpt-4',
    temperature: 0.7,
  },
});

// Check training status
const status = await client.agents.getTrainingStatus(agent.id);

// Export training data
const data = await client.agents.exportTraining(agent.id);

// Clear training data
await client.agents.clearTraining(agent.id);`;

const errorHandlingCode = `try {
  const response = await client.agents.sendMessage(agent.id, {
    content: 'Hello',
  });
} catch (error) {
  if (error instanceof AgentityError) {
    switch (error.code) {
      case 'AUTHENTICATION_ERROR':
        console.error('Invalid API key');
        break;
      case 'RATE_LIMIT_ERROR':
        console.error('Rate limit exceeded');
        break;
      case 'AGENT_NOT_FOUND':
        console.error('Agent not found');
        break;
      default:
        console.error('Unknown error:', error.message);
    }
  }
}`;

export default function SdkPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">SDK Reference</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to use the Agentity SDK to integrate AI agents into your applications.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
          <p className="text-muted-foreground">
            Install the SDK using your preferred package manager:
          </p>
          <CodeBlock
            code={installationCode}
            language="bash"
            filename="installation.sh"
            className="mt-4"
          />
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Initialization</h2>
          <p className="text-muted-foreground">
            Initialize the SDK client with your API key:
          </p>
          <CodeBlock
            code={initializationCode}
            language="typescript"
            filename="initialization.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Configuration Options:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>API key authentication</li>
              <li>Environment selection</li>
              <li>Request timeout</li>
              <li>Retry configuration</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Agent Management</h2>
          <p className="text-muted-foreground">
            Create, list, update, and delete agents:
          </p>
          <CodeBlock
            code={agentManagementCode}
            language="typescript"
            filename="agent-management.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Available Operations:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Create agents</li>
              <li>List agents</li>
              <li>Get agent details</li>
              <li>Update agents</li>
              <li>Delete agents</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Agent Interaction</h2>
          <p className="text-muted-foreground">
            Send messages and receive responses:
          </p>
          <CodeBlock
            code={interactionCode}
            language="typescript"
            filename="interaction.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Interaction Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Regular messaging</li>
              <li>Streaming responses</li>
              <li>Context handling</li>
              <li>Stream options</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Training Management</h2>
          <p className="text-muted-foreground">
            Train and manage agent knowledge:
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
              <li>Train agents</li>
              <li>Check training status</li>
              <li>Export training data</li>
              <li>Clear training data</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Error Handling</h2>
          <p className="text-muted-foreground">
            Handle SDK errors and exceptions:
          </p>
          <CodeBlock
            code={errorHandlingCode}
            language="typescript"
            filename="error-handling.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Error Types:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Authentication errors</li>
              <li>Rate limit errors</li>
              <li>Resource errors</li>
              <li>Network errors</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Continue exploring the API:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>View the <a href="/docs/api-reference/rest" className="font-medium text-primary hover:underline">REST API</a> documentation</li>
            <li>Learn about the <a href="/docs/api-reference/websocket" className="font-medium text-primary hover:underline">WebSocket API</a></li>
            <li>Check out <a href="/docs/api-reference/examples" className="font-medium text-primary hover:underline">Example Applications</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 