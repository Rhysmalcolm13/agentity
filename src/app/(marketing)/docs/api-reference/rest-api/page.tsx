'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const authenticationCode = `// Authentication using API key
const headers = {
  'Authorization': 'Bearer your_api_key_here',
  'Content-Type': 'application/json',
};

// Example request with authentication
const response = await fetch('https://api.agentity.ai/v1/agents', {
  headers,
});`;

const createAgentCode = `// Create a new agent
const response = await fetch('https://api.agentity.ai/v1/agents', {
  method: 'POST',
  headers,
  body: JSON.stringify({
    name: 'Customer Support Agent',
    description: 'Handles customer inquiries',
    training: {
      enabled: true,
      model: 'gpt-4',
    },
  }),
});

const agent = await response.json();`;

const trainAgentCode = `// Train an agent
const response = await fetch('https://api.agentity.ai/v1/agents/\${agentId}/train', {
  method: 'POST',
  headers,
  body: JSON.stringify({
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
  }),
});

const training = await response.json();`;

const interactCode = `// Send a message to an agent
const response = await fetch('https://api.agentity.ai/v1/agents/\${agentId}/interact', {
  method: 'POST',
  headers,
  body: JSON.stringify({
    message: 'How do I upgrade my subscription?',
    context: {
      userId: 'user_123',
      sessionId: 'session_456',
    },
  }),
});

const result = await response.json();`;

export default function RestApiPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">REST API Reference</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to interact with Agentity using the REST API.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Authentication</h2>
          <p className="text-muted-foreground">
            All API requests require authentication using an API key:
          </p>
          <CodeBlock
            code={authenticationCode}
            language="typescript"
            filename="authentication.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>API keys are required for all requests</li>
              <li>Use Bearer token authentication</li>
              <li>Keep your API key secure</li>
              <li>Rotate keys periodically</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Creating Agents</h2>
          <p className="text-muted-foreground">
            Create new agents with specific configurations:
          </p>
          <CodeBlock
            code={createAgentCode}
            language="typescript"
            filename="create-agent.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Endpoint Details:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><code>POST /v1/agents</code></li>
              <li>Required fields: name, description</li>
              <li>Optional: training configuration</li>
              <li>Returns the created agent object</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Training Agents</h2>
          <p className="text-muted-foreground">
            Train agents with examples and custom configurations:
          </p>
          <CodeBlock
            code={trainAgentCode}
            language="typescript"
            filename="train-agent.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Endpoint Details:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><code>POST /v1/agents/:id/train</code></li>
              <li>Training examples required</li>
              <li>Optional training configuration</li>
              <li>Returns training status and results</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Interacting with Agents</h2>
          <p className="text-muted-foreground">
            Send messages and receive responses from agents:
          </p>
          <CodeBlock
            code={interactCode}
            language="typescript"
            filename="interact.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Endpoint Details:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><code>POST /v1/agents/:id/interact</code></li>
              <li>Message content required</li>
              <li>Optional context data</li>
              <li>Returns agent response</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Continue exploring the API:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Learn about <a href="/docs/api-reference/websocket" className="font-medium text-primary hover:underline">WebSocket API</a></li>
            <li>Explore the <a href="/docs/api-reference/sdk" className="font-medium text-primary hover:underline">SDK Reference</a></li>
            <li>View <a href="/docs/api-reference/examples" className="font-medium text-primary hover:underline">Example Applications</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 