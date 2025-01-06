'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const installCode = `npm install agentity`;

const configCode = `// agentity.config.js
module.exports = {
  apiKey: process.env.AGENTITY_API_KEY,
  projectId: 'your-project-id',
  environment: 'development'
}`;

export default function InstallationPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Installation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started with Agentity by installing the package and setting up your project.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Requirements</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Node.js 16.x or later</li>
            <li>npm, yarn, or pnpm package manager</li>
            <li>An Agentity account and API key</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation Steps</h2>
          
          <div>
            <h3 className="scroll-m-20 text-xl font-medium tracking-tight">1. Install the Package</h3>
            <p className="mt-2 text-muted-foreground">
              Install Agentity using your preferred package manager:
            </p>
            <CodeBlock
              code={installCode}
              language="bash"
              className="mt-4"
            />
          </div>

          <div>
            <h3 className="scroll-m-20 text-xl font-medium tracking-tight">2. Configure Your Project</h3>
            <p className="mt-2 text-muted-foreground">
              Create a configuration file in your project root:
            </p>
            <CodeBlock
              code={configCode}
              language="javascript"
              filename="agentity.config.js"
              className="mt-4"
            />
          </div>

          <div>
            <h3 className="scroll-m-20 text-xl font-medium tracking-tight">3. Set Up Environment Variables</h3>
            <p className="mt-2 text-muted-foreground">
              Create a <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">.env</code> file 
              in your project root and add your API key:
            </p>
            <CodeBlock
              code="AGENTITY_API_KEY=your_api_key_here"
              language="bash"
              filename=".env"
              className="mt-4"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Verify Installation</h2>
          <p className="text-muted-foreground">
            To verify that Agentity is installed correctly, create a test file:
          </p>
          <CodeBlock
            code={`import { Agent } from 'agentity';

// This should log your project configuration
console.log(Agent.getConfig());`}
            language="typescript"
            filename="test.ts"
            className="mt-4"
          />
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you have Agentity installed, you can:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Follow the <a href="/docs/quick-start" className="font-medium text-primary hover:underline">Quick Start guide</a> to create your first agent</li>
            <li>Learn about the <a href="/docs/basic-concepts" className="font-medium text-primary hover:underline">Basic Concepts</a></li>
            <li>Explore the <a href="/docs/api-reference" className="font-medium text-primary hover:underline">API Reference</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 