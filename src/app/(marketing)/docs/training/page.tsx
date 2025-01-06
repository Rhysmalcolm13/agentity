'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const basicTrainingCode = `import { Agent } from 'agentity';

const agent = new Agent({
  name: 'Support Agent',
  training: {
    enabled: true,
    model: 'gpt-4',
    temperature: 0.7,
  },
});

// Train with examples
await agent.train([
  {
    input: 'How do I reset my password?',
    output: 'To reset your password, click the "Forgot Password" link on the login page and follow the instructions sent to your email.',
  },
  {
    input: 'Where can I find my API key?',
    output: 'You can find your API key in the Dashboard under Settings > API Keys. Make sure to keep it secure and never share it publicly.',
  },
]);`;

const advancedTrainingCode = `// Advanced training configuration
const agent = new Agent({
  training: {
    enabled: true,
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    stopSequences: ['User:', 'Agent:'],
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    contextWindow: 4096,
    trainingSteps: 1000,
    batchSize: 32,
    learningRate: 0.0001,
  },
});

// Train with structured data
await agent.train({
  conversations: [
    {
      context: 'Customer support interaction about billing',
      messages: [
        { role: 'user', content: 'I was charged twice for my subscription' },
        { role: 'agent', content: 'I apologize for the inconvenience. Let me help you with that. Can you provide your order number?' },
        { role: 'user', content: 'Yes, it's ORDER-123' },
        { role: 'agent', content: 'Thank you. I can confirm there was a duplicate charge. I've initiated a refund which will be processed in 3-5 business days.' },
      ],
    },
    // More training conversations...
  ],
  metadata: {
    domain: 'customer-support',
    language: 'en',
    difficulty: 'intermediate',
  },
});`;

const trainingPluginCode = `import { Plugin } from 'agentity';

class TrainingPlugin extends Plugin {
  name = 'training';
  
  // Custom training data source
  async loadTrainingData() {
    const data = await this.fetchFromDatabase();
    return this.formatTrainingData(data);
  }
  
  // Training monitoring
  async onTrainingStart(params) {
    console.log('Training started:', params);
    await this.trackTrainingMetrics('start', params);
  }
  
  async onTrainingProgress(metrics) {
    console.log('Training progress:', metrics);
    await this.updateTrainingDashboard(metrics);
  }
  
  async onTrainingComplete(results) {
    console.log('Training completed:', results);
    await this.saveTrainingResults(results);
  }
}

// Use the plugin
agent.use(new TrainingPlugin());
await agent.train();`;

const evaluationCode = `// Evaluate agent performance
const evaluationResults = await agent.evaluate([
  {
    input: 'How do I upgrade my plan?',
    expectedOutput: 'You can upgrade your plan in the Dashboard under Billing > Plans. Choose your desired plan and click Upgrade.',
    metadata: {
      category: 'billing',
      difficulty: 'easy',
    },
  },
  // More test cases...
]);

// Analyze results
console.log('Evaluation Results:', {
  accuracy: evaluationResults.accuracy,
  precision: evaluationResults.precision,
  recall: evaluationResults.recall,
  f1Score: evaluationResults.f1Score,
  confusionMatrix: evaluationResults.confusionMatrix,
});

// Fine-tune based on results
await agent.fineTune({
  focusAreas: evaluationResults.weaknesses,
  additionalData: evaluationResults.misclassifiedExamples,
});`;

export default function TrainingPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Training</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how to train agents with examples and evaluate their performance.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Basic Training</h2>
          <p className="text-muted-foreground">
            Train an agent with simple examples:
          </p>
          <CodeBlock
            code={basicTrainingCode}
            language="typescript"
            filename="basic-training.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Key Concepts:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Training configuration</li>
              <li>Example-based training</li>
              <li>Model selection</li>
              <li>Temperature control</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Advanced Training</h2>
          <p className="text-muted-foreground">
            Configure advanced training parameters and use structured data:
          </p>
          <CodeBlock
            code={advancedTrainingCode}
            language="typescript"
            filename="advanced-training.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Advanced Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Detailed configuration</li>
              <li>Structured conversations</li>
              <li>Context windows</li>
              <li>Training parameters</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Training Plugins</h2>
          <p className="text-muted-foreground">
            Create plugins to customize and monitor training:
          </p>
          <CodeBlock
            code={trainingPluginCode}
            language="typescript"
            filename="training-plugin.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Plugin Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Custom data sources</li>
              <li>Training lifecycle hooks</li>
              <li>Progress monitoring</li>
              <li>Results tracking</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Evaluation</h2>
          <p className="text-muted-foreground">
            Evaluate and improve agent performance:
          </p>
          <CodeBlock
            code={evaluationCode}
            language="typescript"
            filename="evaluation.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Evaluation Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Performance metrics</li>
              <li>Test cases</li>
              <li>Results analysis</li>
              <li>Fine-tuning</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you understand training, you can:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Explore <a href="/docs/advanced-training" className="font-medium text-primary hover:underline">Advanced Training</a> techniques</li>
            <li>Learn about <a href="/docs/custom-plugins" className="font-medium text-primary hover:underline">Custom Plugins</a></li>
            <li>Understand <a href="/docs/api-integration" className="font-medium text-primary hover:underline">API Integration</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 