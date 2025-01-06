'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const setupCode = `import { Agent } from 'agentity';

// Initialize agent with API integration
const agent = new Agent({
  name: 'API Integration Agent',
  integrations: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4',
    },
    database: {
      url: process.env.DATABASE_URL,
      maxConnections: 5,
    },
    redis: {
      url: process.env.REDIS_URL,
      ttl: 3600,
    },
  },
});`;

const apiHandlerCode = `// Create API route handler
export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    
    // Process message with agent
    const response = await agent.processMessage(message, {
      ...context,
      timestamp: new Date(),
    });
    
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process message' }),
      { status: 500 }
    );
  }
}`;

const webhookHandlerCode = `// Webhook handler for external services
export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-webhook-signature');
    const payload = await req.json();
    
    // Verify webhook signature
    if (!verifyWebhookSignature(payload, signature)) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401 }
      );
    }
    
    // Process webhook event
    switch (payload.type) {
      case 'message.created':
        await agent.handleIncomingMessage(payload.data);
        break;
      case 'user.updated':
        await agent.updateUserContext(payload.data);
        break;
      default:
        console.log('Unknown webhook event:', payload.type);
    }
    
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error('Webhook Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process webhook' }),
      { status: 500 }
    );
  }
}`;

const integrationPluginCode = `class ExternalServicePlugin extends Plugin {
  name = 'external-service';
  
  // Service client
  private client: ExternalServiceClient;
  
  constructor(config: ExternalServiceConfig) {
    super();
    this.client = new ExternalServiceClient(config);
  }
  
  // Handle incoming webhooks
  async handleWebhook(payload: WebhookPayload) {
    await this.validatePayload(payload);
    await this.processWebhookEvent(payload);
    await this.sendAcknowledgement(payload.id);
  }
  
  // Send data to external service
  async syncData(data: any) {
    try {
      const result = await this.client.sync(data);
      await this.verifySync(result);
      return result;
    } catch (error) {
      await this.handleSyncError(error);
      throw error;
    }
  }
  
  // Real-time updates
  async subscribeToUpdates() {
    const stream = await this.client.subscribe();
    
    stream.on('data', async (update) => {
      await this.processUpdate(update);
    });
    
    stream.on('error', async (error) => {
      await this.handleStreamError(error);
    });
  }
}`;

export default function ApiIntegrationPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">API Integration</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to integrate external APIs and services with your agents.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Setup and Configuration</h2>
          <p className="text-muted-foreground">
            Configure agent with external API integrations:
          </p>
          <CodeBlock
            code={setupCode}
            language="typescript"
            filename="setup.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Integration Types:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>AI services (OpenAI, etc.)</li>
              <li>Database connections</li>
              <li>Caching services</li>
              <li>External APIs</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">API Route Handlers</h2>
          <p className="text-muted-foreground">
            Create API endpoints for agent interaction:
          </p>
          <CodeBlock
            code={apiHandlerCode}
            language="typescript"
            filename="route.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Handler Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Request validation</li>
              <li>Error handling</li>
              <li>Context management</li>
              <li>Response formatting</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Webhook Integration</h2>
          <p className="text-muted-foreground">
            Handle webhooks from external services:
          </p>
          <CodeBlock
            code={webhookHandlerCode}
            language="typescript"
            filename="webhook.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Webhook Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Signature verification</li>
              <li>Event handling</li>
              <li>Error management</li>
              <li>Response handling</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Integration Plugins</h2>
          <p className="text-muted-foreground">
            Create plugins for external service integration:
          </p>
          <CodeBlock
            code={integrationPluginCode}
            language="typescript"
            filename="integration-plugin.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Plugin Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Service client management</li>
              <li>Webhook processing</li>
              <li>Data synchronization</li>
              <li>Real-time updates</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Continue exploring advanced features:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Learn about <a href="/docs/custom-plugins" className="font-medium text-primary hover:underline">Custom Plugins</a></li>
            <li>Explore <a href="/docs/advanced-training" className="font-medium text-primary hover:underline">Advanced Training</a></li>
            <li>View the <a href="/docs/api-reference" className="font-medium text-primary hover:underline">API Reference</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 