'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const installCode = `npm install agentity`;

const quickStartCode = `import { Agent } from 'agentity';

const agent = new Agent({
  name: 'My First Agent',
  description: 'A simple agent that responds to greetings',
});

agent.on('message', async (message) => {
  if (message.toLowerCase().includes('hello')) {
    return 'Hello! How can I help you today?';
  }
});

agent.start();`;

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to use Agentity to create, train, and manage your AI agents.
          </p>
        </div>

        <section id="getting-started" className="space-y-6">
          <h2 className="text-2xl font-semibold">Getting Started</h2>
          <p className="text-muted-foreground">
            Learn how to get started with Agentity and create your first AI agent.
          </p>

          <div className="space-y-6 pl-4">
            <div id="installation">
              <h3 className="text-xl font-medium">Installation</h3>
              <p className="mt-2 text-muted-foreground">
                Install Agentity using npm, yarn, or pnpm.
              </p>
              <CodeBlock
                code={installCode}
                language="bash"
                className="mt-4"
              />
            </div>

            <div id="quick-start">
              <h3 className="text-xl font-medium">Quick Start</h3>
              <p className="mt-2 text-muted-foreground">
                Create your first agent in under 5 minutes.
              </p>
              <CodeBlock
                code={quickStartCode}
                language="typescript"
                filename="agent.ts"
                className="mt-4"
              />
            </div>

            <div id="basic-concepts">
              <h3 className="text-xl font-medium">Basic Concepts</h3>
              <p className="mt-2 text-muted-foreground">
                Understand the core concepts of Agentity.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Agents - The core building blocks of Agentity</li>
                <li>Events - How agents communicate and respond</li>
                <li>Plugins - Extend agent functionality</li>
                <li>Training - Teach agents new skills</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="core-features" className="space-y-6">
          <h2 className="text-2xl font-semibold">Core Features</h2>
          <p className="text-muted-foreground">
            Explore the main features of Agentity.
          </p>

          <div className="space-y-6 pl-4">
            <div id="agent-creation">
              <h3 className="text-xl font-medium">Agent Creation</h3>
              <p className="mt-2 text-muted-foreground">
                Learn how to create and customize agents.
              </p>
            </div>

            <div id="plugin-system">
              <h3 className="text-xl font-medium">Plugin System</h3>
              <p className="mt-2 text-muted-foreground">
                Extend your agents with plugins.
              </p>
            </div>

            <div id="training">
              <h3 className="text-xl font-medium">Training</h3>
              <p className="mt-2 text-muted-foreground">
                Train your agents with custom data.
              </p>
            </div>
          </div>
        </section>

        <section id="advanced-usage" className="space-y-6">
          <h2 className="text-2xl font-semibold">Advanced Usage</h2>
          <p className="text-muted-foreground">
            Advanced features and customization options.
          </p>

          <div className="space-y-6 pl-4">
            <div id="custom-plugins">
              <h3 className="text-xl font-medium">Custom Plugins</h3>
              <p className="mt-2 text-muted-foreground">
                Create your own plugins.
              </p>
            </div>

            <div id="api-integration">
              <h3 className="text-xl font-medium">API Integration</h3>
              <p className="mt-2 text-muted-foreground">
                Integrate with external APIs.
              </p>
            </div>

            <div id="advanced-training">
              <h3 className="text-xl font-medium">Advanced Training</h3>
              <p className="mt-2 text-muted-foreground">
                Advanced training techniques.
              </p>
            </div>
          </div>
        </section>

        <section id="api-reference" className="space-y-6">
          <h2 className="text-2xl font-semibold">API Reference</h2>
          <p className="text-muted-foreground">
            Complete API documentation.
          </p>

          <div className="space-y-6 pl-4">
            <div id="rest-api">
              <h3 className="text-xl font-medium">REST API</h3>
              <p className="mt-2 text-muted-foreground">
                REST API endpoints and usage.
              </p>
            </div>

            <div id="websocket-api">
              <h3 className="text-xl font-medium">WebSocket API</h3>
              <p className="mt-2 text-muted-foreground">
                Real-time communication with WebSocket.
              </p>
            </div>

            <div id="sdk-reference">
              <h3 className="text-xl font-medium">SDK Reference</h3>
              <p className="mt-2 text-muted-foreground">
                SDK documentation and examples.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
} 