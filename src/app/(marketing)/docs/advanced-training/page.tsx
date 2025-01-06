'use client';

import { DocsLayout } from '@/components/(marketing)/docs/docs-layout';
import { CodeBlock } from '@/components/shared/code-block';

const customTrainingCode = `import { Agent } from 'agentity';

// Initialize agent with custom training configuration
const agent = new Agent({
  name: 'Advanced Training Agent',
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
    validationSplit: 0.2,
    evaluationMetrics: ['accuracy', 'f1', 'precision', 'recall'],
  },
});`;

const structuredTrainingCode = `// Define structured training data
const trainingData = {
  conversations: [
    {
      context: 'Technical support interaction',
      messages: [
        { role: 'user', content: 'My application keeps crashing' },
        { role: 'agent', content: 'Let's troubleshoot this step by step. When does the crash occur?' },
        { role: 'user', content: 'Every time I try to save a large file' },
        { role: 'agent', content: 'This might be a memory issue. How large are the files you're trying to save?' },
      ],
      metadata: {
        category: 'technical-support',
        difficulty: 'intermediate',
        resolution: 'memory-optimization',
      },
    },
  ],
  rules: [
    'Always ask clarifying questions before providing solutions',
    'Use step-by-step troubleshooting approaches',
    'Maintain a professional and empathetic tone',
  ],
  examples: [
    {
      input: 'How do I optimize my application?',
      output: 'To help you optimize your application, I need to know:\n1. What type of application is it?\n2. What performance issues are you experiencing?\n3. What have you already tried?',
      metadata: {
        category: 'performance',
        followUp: true,
      },
    },
  ],
};

// Train with structured data
await agent.train(trainingData);`;

const evaluationCode = `// Define evaluation scenarios
const evaluationData = [
  {
    input: 'My website is loading slowly',
    expectedOutput: 'Let me help you diagnose the loading speed issue. Could you tell me:\n1. When did this start happening?\n2. Is it slow on all pages or specific ones?\n3. Have you made any recent changes?',
    metadata: {
      category: 'performance',
      difficulty: 'medium',
      requiresFollowUp: true,
    },
  },
];

// Run evaluation
const results = await agent.evaluate(evaluationData, {
  metrics: ['accuracy', 'relevance', 'completeness'],
  threshold: 0.8,
  detailedAnalysis: true,
});

// Analyze results
console.log('Evaluation Results:', {
  accuracy: results.accuracy,
  relevance: results.relevance,
  completeness: results.completeness,
  failedScenarios: results.failures,
  recommendations: results.recommendations,
});

// Fine-tune based on results
await agent.fineTune({
  focusAreas: results.weaknesses,
  additionalData: results.misclassifiedExamples,
  iterations: 100,
});`;

const continuousTrainingCode = `// Set up continuous training pipeline
class TrainingPipeline {
  async collectData() {
    // Collect new training data from various sources
    const userInteractions = await this.fetchRecentInteractions();
    const feedbackData = await this.fetchUserFeedback();
    const evaluationResults = await this.fetchEvaluationResults();
    
    return this.preprocessData({
      userInteractions,
      feedbackData,
      evaluationResults,
    });
  }
  
  async trainModel() {
    // Get new training data
    const newData = await this.collectData();
    
    // Validate data quality
    const validationResults = await this.validateData(newData);
    if (!validationResults.passed) {
      throw new Error('Data validation failed');
    }
    
    // Train the model
    const trainingResults = await agent.train(newData, {
      validateResults: true,
      rollbackOnFailure: true,
      notifyOnCompletion: true,
    });
    
    // Evaluate and monitor
    await this.evaluateResults(trainingResults);
    await this.updateMetrics(trainingResults);
  }
  
  async schedule() {
    // Schedule regular training updates
    setInterval(async () => {
      try {
        await this.trainModel();
      } catch (error) {
        await this.handleTrainingError(error);
      }
    }, 24 * 60 * 60 * 1000); // Run daily
  }
}

// Initialize and start pipeline
const pipeline = new TrainingPipeline();
await pipeline.schedule();`;

export default function AdvancedTrainingPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Advanced Training</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn advanced techniques for training and fine-tuning agents.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Custom Training Configuration</h2>
          <p className="text-muted-foreground">
            Configure advanced training parameters:
          </p>
          <CodeBlock
            code={customTrainingCode}
            language="typescript"
            filename="custom-training.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Configuration Options:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Model selection and parameters</li>
              <li>Training hyperparameters</li>
              <li>Validation settings</li>
              <li>Evaluation metrics</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Structured Training Data</h2>
          <p className="text-muted-foreground">
            Use structured data for better training results:
          </p>
          <CodeBlock
            code={structuredTrainingCode}
            language="typescript"
            filename="structured-training.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Data Components:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Conversation examples</li>
              <li>Behavioral rules</li>
              <li>Metadata annotations</li>
              <li>Context information</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Evaluation and Fine-tuning</h2>
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
              <li>Custom evaluation scenarios</li>
              <li>Multiple metrics</li>
              <li>Detailed analysis</li>
              <li>Automated fine-tuning</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Continuous Training</h2>
          <p className="text-muted-foreground">
            Implement continuous training pipelines:
          </p>
          <CodeBlock
            code={continuousTrainingCode}
            language="typescript"
            filename="continuous-training.ts"
            className="mt-4"
          />
          <div className="space-y-2">
            <p className="font-medium">Pipeline Features:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Data collection</li>
              <li>Quality validation</li>
              <li>Automated training</li>
              <li>Monitoring and alerts</li>
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
            <li>Explore <a href="/docs/api-integration" className="font-medium text-primary hover:underline">API Integration</a></li>
            <li>View the <a href="/docs/api-reference" className="font-medium text-primary hover:underline">API Reference</a></li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
} 