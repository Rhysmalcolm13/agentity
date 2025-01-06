'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const basicAgentCode = `import { Agent } from 'agentity';

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

const advancedAgentCode = `import { Agent, Plugin } from 'agentity';

// Create a custom plugin
class WeatherPlugin extends Plugin {
  name = 'weather';
  
  async getWeather(city: string) {
    // Implement weather lookup logic
    return \`Weather in \${city}: Sunny, 22°C\`;
  }
}

// Create an agent with the plugin
const agent = new Agent({
  name: 'Weather Assistant',
  description: 'An agent that provides weather information',
  plugins: [new WeatherPlugin()],
});

// Handle weather queries
agent.on('message', async (message, context) => {
  const weatherPlugin = context.plugins.weather;
  
  if (message.includes('weather')) {
    const city = 'London'; // Extract city from message
    return await weatherPlugin.getWeather(city);
  }
});

agent.start();`;

export default function QuickStartPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Quick Start</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your first AI agent in under 5 minutes.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Prerequisites</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Completed the <a href="/docs/installation" className="font-medium text-primary hover:underline">installation</a> steps</li>
            <li>Basic understanding of TypeScript/JavaScript</li>
            <li>A text editor or IDE</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Create Your First Agent</h2>
          <p className="text-muted-foreground">
            Let's create a simple agent that responds to greetings:
          </p>
          <CodeBlock
            code={basicAgentCode}
            language="typescript"
            filename="basic-agent.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">This example demonstrates:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Creating an agent with a name and description</li>
              <li>Adding an event listener for messages</li>
              <li>Processing messages and returning responses</li>
              <li>Starting the agent</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add Advanced Features</h2>
          <p className="text-muted-foreground">
            Now let's create a more advanced agent that uses plugins and provides weather information:
          </p>
          <CodeBlock
            code={advancedAgentCode}
            language="typescript"
            filename="weather-agent.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">This advanced example shows:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Creating custom plugins</li>
              <li>Adding plugins to an agent</li>
              <li>Accessing plugin functionality in message handlers</li>
              <li>Working with async/await</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you've created your first agents, you can:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Learn about <a href="/docs/basic-concepts" className="font-medium text-primary hover:underline">Basic Concepts</a> in depth</li>
            <li>Explore <a href="/docs/core-features" className="font-medium text-primary hover:underline">Core Features</a> like training and memory</li>
            <li>Create your own <a href="/docs/custom-plugins" className="font-medium text-primary hover:underline">Custom Plugins</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 