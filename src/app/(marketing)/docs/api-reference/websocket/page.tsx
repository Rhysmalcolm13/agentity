'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const connectionCode = `// Connect to WebSocket API
const ws = new WebSocket('wss://api.agentity.ai/v1/ws');

// Connection handling
ws.onopen = () => {
  console.log('Connected to Agentity WebSocket API');
  
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    payload: {
      apiKey: 'your_api_key_here',
    },
  }));
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket API');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};`;

const messageHandlingCode = `// Message handling
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'auth_success':
      console.log('Authentication successful');
      break;
      
    case 'agent_response':
      console.log('Agent response:', message.payload);
      break;
      
    case 'error':
      console.error('Error:', message.payload);
      break;
      
    default:
      console.log('Unknown message type:', message);
  }
};`;

const interactionCode = `// Send message to agent
ws.send(JSON.stringify({
  type: 'message',
  payload: {
    agentId: 'agent_123',
    content: 'How do I reset my password?',
    context: {
      userId: 'user_123',
      sessionId: 'session_456',
    },
  },
}));

// Stream response from agent
ws.send(JSON.stringify({
  type: 'stream_message',
  payload: {
    agentId: 'agent_123',
    content: 'Tell me about your product features',
    streamOptions: {
      enabled: true,
      chunkSize: 100,
    },
  },
}));`;

const heartbeatCode = `// Heartbeat handling
setInterval(() => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'ping',
      payload: {
        timestamp: Date.now(),
      },
    }));
  }
}, 30000); // Send ping every 30 seconds

// Handle pong response
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === 'pong') {
    console.log('Received pong:', message.payload);
  }
};`;

export default function WebSocketPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">WebSocket API Reference</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to use real-time communication with Agentity using WebSockets.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Connection Setup</h2>
          <p className="text-muted-foreground">
            Establish and manage WebSocket connections:
          </p>
          <CodeBlock
            code={connectionCode}
            language="typescript"
            filename="connection.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Key Concepts:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>WebSocket connection</li>
              <li>Authentication</li>
              <li>Connection events</li>
              <li>Error handling</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Message Handling</h2>
          <p className="text-muted-foreground">
            Process different types of WebSocket messages:
          </p>
          <CodeBlock
            code={messageHandlingCode}
            language="typescript"
            filename="message-handling.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Message Types:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Authentication responses</li>
              <li>Agent messages</li>
              <li>Error messages</li>
              <li>System events</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Agent Interaction</h2>
          <p className="text-muted-foreground">
            Send messages and receive streaming responses:
          </p>
          <CodeBlock
            code={interactionCode}
            language="typescript"
            filename="interaction.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Regular messaging</li>
              <li>Stream responses</li>
              <li>Context data</li>
              <li>Stream options</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Connection Maintenance</h2>
          <p className="text-muted-foreground">
            Keep connections alive with heartbeat messages:
          </p>
          <CodeBlock
            code={heartbeatCode}
            language="typescript"
            filename="heartbeat.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Maintenance Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Heartbeat mechanism</li>
              <li>Connection health</li>
              <li>Automatic reconnection</li>
              <li>Timeout handling</li>
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
            <li>Explore the <a href="/docs/api-reference/sdk" className="font-medium text-primary hover:underline">SDK Reference</a></li>
            <li>Check out <a href="/docs/api-reference/examples" className="font-medium text-primary hover:underline">Example Applications</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 