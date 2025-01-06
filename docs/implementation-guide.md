# Implementation Guide

## Setup and Configuration

### 1. Dependencies

```bash
# Core dependencies
npm install ai@4.0.* @ai-sdk/provider-utils@2.0.*

# Provider packages
npm install @ai-sdk/openai@1.0.* @ai-sdk/anthropic@1.0.* @ai-sdk/google@1.0.*

# MCP packages
npm install @modelcontextprotocol/sdk @modelcontextprotocol/transport-stdio @modelcontextprotocol/transport-http
```

### 2. Environment Configuration

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_key
OPENAI_ORG_ID=your_org_id

# Anthropic Configuration
ANTHROPIC_API_KEY=your_anthropic_key

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_key

# MCP Configuration
MCP_HOST_SECRET=your_host_secret
MCP_TRANSPORT_TYPE=http
MCP_TRANSPORT_PORT=3001
MCP_OAUTH_CLIENT_ID=your_oauth_client_id
MCP_OAUTH_CLIENT_SECRET=your_oauth_client_secret
```

### 3. Provider Setup

```typescript
// src/lib/ai/config.ts
import { OpenAIProvider } from '@ai-sdk/openai';
import { AnthropicProvider } from '@ai-sdk/anthropic';
import { GoogleProvider } from '@ai-sdk/google';

export const providers = {
  openai: new OpenAIProvider({
    apiKey: process.env.OPENAI_API_KEY!,
    organization: process.env.OPENAI_ORG_ID,
    defaultOptions: {
      temperature: 0.7,
      maxTokens: 4096,
      streaming: true
    }
  }),
  
  anthropic: new AnthropicProvider({
    apiKey: process.env.ANTHROPIC_API_KEY!,
    defaultOptions: {
      temperature: 0.7,
      maxTokens: 128000,
      streaming: true
    }
  }),
  
  google: new GoogleProvider({
    apiKey: process.env.GOOGLE_AI_API_KEY!,
    defaultOptions: {
      temperature: 0.7,
      maxTokens: 8192,
      streaming: true,
      safetySettings: {
        harmBlockThreshold: 'MEDIUM'
      }
    }
  })
};

export const defaultModels = {
  openai: 'gpt-4-turbo',
  anthropic: 'claude-3-sonnet',
  google: 'gemini-pro'
};

// Error handling utilities
export const handleProviderError = async (error: any, provider: string) => {
  if (error.code === 'rate_limit_exceeded') {
    console.warn(`Rate limit exceeded for ${provider}, falling back...`);
    return getFallbackProvider(provider);
  }
  
  if (error.code === 'context_length_exceeded') {
    console.warn(`Context length exceeded for ${provider}, chunking content...`);
    return handleContextLengthError(error, provider);
  }
  
  throw error;
};
```

## Implementation Details

### 1. Provider Management

```typescript
// src/lib/ai/providers/manager.ts
import { providers, defaultModels } from '../config';

export class ProviderManager {
  async selectProvider(task: TaskRequirements): Promise<LLMProvider> {
    // Select provider based on task requirements
    if (task.requiresVision) {
      return providers.google; // Gemini excels at vision tasks
    }
    
    if (task.contextLength > 128000) {
      return providers.anthropic; // Claude handles longer contexts
    }
    
    return providers.openai; // Default to OpenAI for general tasks
  }
  
  async executeWithProvider(
    provider: LLMProvider,
    prompt: string,
    options: PromptOptions
  ): Promise<AIResponse> {
    const model = options.model || defaultModels[provider.id];
    return provider.execute({ prompt, model, ...options });
  }
}
```

### 2. MCP Server Setup

```typescript
// src/lib/mcp/server.ts
import { Server, ServerCapabilities } from "@modelcontextprotocol/sdk/server";

export class AgentityServer extends Server {
    constructor() {
        super({
            name: "agentity-server",
            version: "2024-11-05",
            capabilities: {
                resources: {
                    enabled: true,
                    maxConcurrent: 10,
                    supportedTypes: ['text', 'audio', 'video']
                },
                tools: {
                    enabled: true,
                    maxConcurrent: 5,
                    dynamicDiscovery: true,
                    validationLevel: 'strict',
                    rateLimiting: {
                        enabled: true,
                        defaultLimit: 100,
                        windowMs: 60000
                    },
                    timeout: {
                        default: 30000,
                        max: 120000
                    }
                },
                prompts: {
                    enabled: true,
                    streaming: true,
                    supportedFormats: ['text', 'audio', 'video']
                },
                statelessMode: {
                    enabled: true,
                    persistence: 'distributed',
                    stateRecovery: true
                },
                discovery: {
                    enabled: true,
                    registryUrl: process.env.MCP_REGISTRY_URL,
                    advertisedCapabilities: [
                        'tools:dynamic',
                        'multimodal:all',
                        'stateless:distributed'
                    ],
                    healthCheck: {
                        interval: 30000,
                        timeout: 5000,
                        unhealthyThreshold: 3
                    }
                },
                security: {
                    authentication: {
                        type: 'oauth2',
                        required: true
                    },
                    encryption: {
                        transport: true,
                        storage: true
                    },
                    sandboxing: {
                        enabled: true,
                        isolationLevel: 'strict'
                    }
                }
            }
        });
    }

    async initialize() {
        // Set up authentication
        await this.setupOAuth();
        
        // Set up request handlers
        await this.setupHandlers();
        
        // Initialize transport with security options
        const transport = await this.createTransport({
            secure: true,
            authentication: true,
            compression: true
        });
        
        // Set up connection monitoring
        this.setupConnectionMonitoring();
        
        // Connect with retry logic
        await this.connectWithRetry(transport);
    }

    private async setupOAuth() {
        this.setAuthProvider(new OAuth2Provider({
            clientId: process.env.MCP_OAUTH_CLIENT_ID!,
            clientSecret: process.env.MCP_OAUTH_CLIENT_SECRET!,
            scopes: ['read', 'write']
        }));
    }

    private async setupHandlers() {
        // Core handlers
        this.setRequestHandler('initialize', this.handleInitialize);
        this.setRequestHandler('shutdown', this.handleShutdown);
        
        // Resource handlers with modality support
        await this.setupResourceHandlers();
        await this.setupModalityHandlers();
        
        // Tool handlers with dynamic discovery
        await this.setupToolHandlers();
        this.enableDynamicToolDiscovery();
        
        // Streaming handlers
        this.setupStreamingHandlers();
        
        // Interactive workflow handlers
        this.setupWorkflowHandlers();
        
        // Hierarchical agent handlers
        this.setupHierarchicalAgentHandlers();
    }

    private setupModalityHandlers() {
        this.setRequestHandler('audio/transcribe', this.handleAudioTranscription);
        this.setRequestHandler('video/analyze', this.handleVideoAnalysis);
        this.setRequestHandler('multimodal/process', this.handleMultimodalInput);
    }

    private enableDynamicToolDiscovery() {
        this.on('tools/changed', this.handleToolsChanged);
        this.startToolDiscoveryService({
            interval: 60000, // Check for new tools every minute
            notifyClients: true
        });
    }
}
```

### 3. Transport Layer

```typescript
// src/lib/mcp/transport/factory.ts
import { Transport } from "@modelcontextprotocol/sdk";
import { HTTPTransport } from "@modelcontextprotocol/transport-http";
import { StdioTransport } from "@modelcontextprotocol/transport-stdio";

export function createTransport(): Transport {
    switch (process.env.MCP_TRANSPORT_TYPE) {
        case 'http':
            return new HTTPTransport({
                port: parseInt(process.env.MCP_TRANSPORT_PORT!),
                secure: true
            });
        case 'stdio':
            return new StdioTransport();
        default:
            throw new Error('Invalid transport type');
    }
}
```

### 4. API Route Implementation

```typescript
// src/app/api/agents/route.ts
import { providers } from '@/lib/ai/config';
import { BaseAgent } from '@/lib/ai/agents/base';

export async function POST(req: Request) {
  const { prompt, options } = await req.json();
  const agent = new BaseAgent();
  
  const response = await agent.process({
    prompt,
    ...options
  });
  
  return Response.json({ response });
}
```

## Best Practices

### 1. Provider Selection

- Use OpenAI (GPT-4) for complex reasoning and tool use
- Use Anthropic (Claude) for tasks requiring deep context understanding
- Use Google (Gemini) for vision-related tasks and rapid responses

### 2. MCP Best Practices

- Implement proper connection lifecycle management
- Use appropriate transport for the use case
- Handle connection errors gracefully
- Implement proper security measures
- Monitor connection health

### 3. Error Handling

```typescript
try {
  const response = await provider.execute(prompt);
} catch (error) {
  if (error.code === 'rate_limit_exceeded') {
    // Fall back to alternative provider
    const fallbackProvider = await providerManager.getFallbackProvider();
    return fallbackProvider.execute(prompt);
  }
  throw error;
}
```

### 4. Context Management

- Implement provider-specific token counting
- Use streaming for long-running operations
- Cache responses when appropriate

## Security Considerations

1. **API Key Management**
   - Store keys in environment variables
   - Rotate keys regularly
   - Use separate keys for development/production

2. **Rate Limiting**
   - Implement per-user rate limits
   - Monitor usage across providers
   - Set up alerts for unusual patterns

3. **Content Filtering**
   - Implement content moderation
   - Sanitize inputs and outputs
   - Log and audit AI interactions

## Testing

### 1. Tool Testing

```typescript
// tests/tools/functional.test.ts
describe('Tool Functionality', () => {
    it('executes with valid input', async () => {
        const tool = new TestTool();
        const input = { param: 'valid' };
        const result = await tool.execute(input);
        expect(result.success).toBe(true);
    });

    it('handles invalid input appropriately', async () => {
        const tool = new TestTool();
        const input = { param: null };
        await expect(tool.execute(input)).rejects.toThrow('Invalid input');
    });

    it('respects timeouts', async () => {
        const tool = new TestTool({ timeout: 100 });
        await expect(tool.executeLongOperation()).rejects.toThrow('Operation timed out');
    });
});

// tests/tools/security.test.ts
describe('Tool Security', () => {
    it('sanitizes file paths', () => {
        const tool = new FileSystemTool();
        const path = '../dangerous/path';
        expect(() => tool.validatePath(path)).toThrow('Invalid path');
    });

    it('validates URL parameters', () => {
        const tool = new NetworkTool();
        const url = 'javascript:alert(1)';
        expect(() => tool.validateUrl(url)).toThrow('Invalid URL');
    });

    it('enforces rate limits', async () => {
        const tool = new RateLimitedTool({ limit: 2, window: 1000 });
        await tool.execute();
        await tool.execute();
        await expect(tool.execute()).rejects.toThrow('Rate limit exceeded');
    });
});

// tests/tools/performance.test.ts
describe('Tool Performance', () => {
    it('handles concurrent requests', async () => {
        const tool = new ConcurrentTool();
        const promises = Array(10).fill(null).map(() => tool.execute());
        const results = await Promise.all(promises);
        expect(results.every(r => r.success)).toBe(true);
    });

    it('cleans up resources after errors', async () => {
        const tool = new ResourceTool();
        try {
            await tool.executeWithError();
        } catch (e) {
            expect(tool.resourcesCleaned).toBe(true);
        }
    });
});
```

### 2. MCP Integration Testing

```typescript
// tests/mcp/inspector.test.ts
describe('MCP Inspector Integration', () => {
    let server: AgentityServer;
    let inspector: MCPInspector;

    beforeAll(async () => {
        server = new AgentityServer();
        await server.initialize();
        inspector = new MCPInspector({
            serverUrl: 'http://localhost:3001',
            timeout: 5000
        });
    });

    it('validates server capabilities', async () => {
        const report = await inspector.validateCapabilities();
        expect(report.valid).toBe(true);
        expect(report.errors).toHaveLength(0);
    });

    it('verifies tool implementations', async () => {
        const toolReport = await inspector.validateTools();
        expect(toolReport.validTools).toHaveLength(server.tools.size);
        expect(toolReport.invalidTools).toHaveLength(0);
    });

    it('checks security configuration', async () => {
        const securityReport = await inspector.validateSecurity();
        expect(securityReport.authenticationValid).toBe(true);
        expect(securityReport.encryptionValid).toBe(true);
        expect(securityReport.sandboxingValid).toBe(true);
    });
});
```

### 3. Provider Integration

```typescript
// tests/providers/streaming.test.ts
describe('Provider Streaming', () => {
    it('handles immediate stream returns', async () => {
        const provider = new OpenAIProvider(config);
        const stream = provider.streamText('test prompt');
        // v4: No await needed for stream initialization
        for await (const chunk of stream) {
            expect(chunk).toBeDefined();
        }
    });

    it('processes stream warnings', async () => {
        const provider = new AnthropicProvider(config);
        const stream = provider.streamText('test prompt');
        const warnings: string[] = [];
        
        stream.on('warning', (warning) => {
            warnings.push(warning);
        });

        for await (const chunk of stream) {
            // Process chunks
        }

        expect(warnings).toHaveLength(0);
    });

    it('handles stream errors gracefully', async () => {
        const provider = new GoogleProvider(config);
        const stream = provider.streamText('test prompt');
        
        try {
            for await (const chunk of stream) {
                if (chunk.error) {
                    throw new Error(chunk.error);
                }
            }
        } catch (error) {
            expect(error.message).toBeDefined();
            expect(stream.destroyed).toBe(true);
        }
    });
});

// tests/providers/performance.test.ts
describe('Provider Performance', () => {
    it('measures response times', async () => {
        const provider = new OpenAIProvider(config);
        const start = performance.now();
        await provider.generateText('test prompt');
        const duration = performance.now() - start;
        expect(duration).toBeLessThan(2000);
    });

    it('handles concurrent requests', async () => {
        const provider = new AnthropicProvider(config);
        const prompts = Array(5).fill('test prompt');
        const results = await Promise.all(
            prompts.map(p => provider.generateText(p))
        );
        expect(results).toHaveLength(5);
    });
});
```

### 4. End-to-End Testing

```typescript
// tests/e2e/workflow.test.ts
describe('End-to-End Workflows', () => {
    it('completes agent interaction cycle', async () => {
        const agent = new BaseAgent();
        const result = await agent.process({
            prompt: 'test task',
            requirements: {
                requiresVision: true,
                contextLength: 1000
            }
        });

        expect(result.success).toBe(true);
        expect(result.provider).toBe('google');
        expect(result.toolsUsed).toBeDefined();
    });

    it('handles provider fallback', async () => {
        const agent = new BaseAgent();
        const mockError = new Error('rate_limit_exceeded');
        jest.spyOn(providers.openai, 'generateText')
            .mockRejectedValueOnce(mockError);

        const result = await agent.process({
            prompt: 'test task',
            requirements: {}
        });

        expect(result.success).toBe(true);
        expect(result.provider).not.toBe('openai');
    });
});
```
