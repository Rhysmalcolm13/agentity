# Agentity Coding Standards and Conventions

## 1. Project Structure Rules

### 1.1 Directory Organization

- Place all application code inside the `src` directory
- Keep the `app` directory purely for routing purposes
- Use private folders (`_folderName`) for implementation details
- Use route groups (`(folderName)`) for URL organization
- Place shared code in appropriate top-level directories (`components`, `lib`, `utils`)

### 1.2 Route Conventions

```typescript
// ✅ Correct route organization
app/
  (auth)/                 // Route group for auth features
    login/
      page.tsx           // Route page component
      error.tsx          // Route error boundary
      loading.tsx        // Route loading state
    layout.tsx           // Shared auth layout

// ❌ Incorrect route organization
app/
  auth/                  // Missing route group
    LoginPage.tsx        // Incorrect file naming
    error.js            // Inconsistent file extension
```

### 1.3 Component Organization

```typescript
// ✅ Correct component organization
components/
  ui/                    // shadcn/ui components
    button/
      index.tsx         // Main component
      variants.ts       // Component variants using cva
    card/
      index.tsx
      variants.ts
  shared/               // Shared feature components
    agents/
      agent-card.tsx    // Feature-specific components
      agent-list.tsx
    plugins/
      plugin-card.tsx
      plugin-list.tsx

// ❌ Incorrect component organization
components/
  Button.tsx            // Flat structure
  styles/              // Don't create separate style directories
  AgentCard/           // Don't use PascalCase directories
    styles.css         // Don't use component-specific CSS files
```

## 2. Coding Conventions

### 2.1 File Naming

- Use PascalCase for React components: `AgentCard.tsx`
- Use kebab-case for non-component files: `api-utils.ts`
- Use camelCase for utility functions: `validateAgent.ts`
- Use `.tsx` extension for React components
- Use `.ts` extension for TypeScript files
- Use `.css` extension for stylesheets

### 2.2 Component Structure

```typescript
// ✅ Correct component structure
import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

// ❌ Incorrect component structure
import styles from './styles.css'  // Don't use CSS modules
import { type FC } from 'react'    // Don't use FC type

export const Button: FC<ButtonProps> = ({ 
  variant = 'primary',  // Don't use string literals for variants
  className,
}) => {
  return (
    <button className={styles.button}>  // Don't use CSS modules
      {children}
    </button>
  )
}
```

### 2.3 Type Definitions

```typescript
// ✅ Correct type definitions
// types/ai.ts
export interface Agent {
  id: string;
  name: string;
  capabilities: AgentCapabilities;
}

export type AgentCapabilities = {
  readonly supportedModels: string[];
  readonly maxConcurrentTasks: number;
};

// ❌ Incorrect type definitions
type agent = {
  // Missing proper casing
  // Missing proper exports
  // Missing readonly where needed
}
```

### 2.4 shadcn/ui Conventions

#### Component Installation

```bash
# ✅ Correct installation
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog

# ❌ Incorrect installation
# Don't copy components manually
# Don't modify the original shadcn/ui components directly
```

#### Component Customization

```typescript
// ✅ Correct customization
// components/ui/button/variants.ts
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // Add custom variants here
        custom: 'bg-purple-500 text-white hover:bg-purple-600',
      },
      // Add custom variant groups here
    },
  }
)

// ❌ Incorrect customization
// Don't modify the original component files
// Don't create separate style files
// Don't use CSS modules or styled-components
```

#### Theme Configuration

```typescript
// ✅ Correct theme configuration
// app/globals.css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    
    /* Custom brand colors */
    --brand-primary: 267 100% 50%;
    --brand-secondary: 267 100% 40%;
  }
}

// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ❌ Incorrect theme configuration
// Don't use CSS variables outside globals.css
// Don't create separate theme files
// Don't use CSS-in-JS for theming
```

#### Component Composition

```typescript
// ✅ Correct composition
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AgentCard({ agent }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{agent.name}</CardTitle>
        <CardDescription>{agent.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
      <CardFooter>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  )
}

// ❌ Incorrect composition
export function AgentCard({ agent }) {
  return (
    <div className="card">  // Don't create custom card styles
      <div className="card-header">  // Don't create custom layout components
        <h3>{agent.name}</h3>
        <p>{agent.description}</p>
      </div>
    </div>
  )
}
```

## 3. AI-SDK Integration Rules

### 3.1 Provider Management

```typescript
// ✅ Correct provider implementation
import { type LLMProvider } from '@ai-sdk/core';

export class OpenAIProvider implements LLMProvider {
  private readonly config: ProviderConfig;
  
  constructor(config: ProviderConfig) {
    this.validateConfig(config);
    this.config = config;
  }
  
  async streamText(prompt: string): Promise<ReadableStream<string>> {
    // Implementation
  }
}

// ❌ Incorrect provider implementation
class openaiProvider {
  // Missing interface implementation
  // Missing proper validation
  // Missing proper types
}
```

### 3.2 Model Management

```typescript
// ✅ Correct model handling
const modelConfig = {
  'gpt-4-turbo': {
    maxTokens: 4096,
    streaming: true,
    validation: {
      enabled: true,
      rules: defaultValidationRules,
    },
  },
} as const;

// ❌ Incorrect model handling
const models = {
  gpt4: {
    // Missing proper naming
    // Missing proper typing
    // Missing validation
  },
};
```

## 4. MCP Integration Rules

### 4.1 Protocol Implementation

```typescript
// ✅ Correct protocol implementation
import { type MCPServer } from '@modelcontextprotocol/sdk';

export class AgentityServer implements MCPServer {
  private readonly capabilities: ServerCapabilities;
  
  constructor(config: ServerConfig) {
    this.validateCapabilities(config.capabilities);
    this.capabilities = config.capabilities;
  }
  
  async handleRequest(request: MCPRequest): Promise<MCPResponse> {
    // Implementation
  }
}

// ❌ Incorrect protocol implementation
class Server {
  // Missing interface implementation
  // Missing validation
  // Missing proper types
}
```

### 4.2 Transport Layer

```typescript
// ✅ Correct transport implementation
import { type Transport } from '@modelcontextprotocol/sdk';

export function createTransport(config: TransportConfig): Transport {
  validateTransportConfig(config);
  
  switch (config.type) {
    case 'http':
      return new HTTPTransport(config);
    case 'stdio':
      return new StdioTransport(config);
    default:
      throw new Error(`Unsupported transport type: ${config.type}`);
  }
}

// ❌ Incorrect transport implementation
function getTransport(type) {
  // Missing type safety
  // Missing validation
  // Missing proper error handling
}
```

## 5. Testing Standards

### 5.1 Test Organization

```typescript
// ✅ Correct test organization
// tests/unit/agents/AgentCard.test.tsx
import { render, screen } from '@testing-library/react';
import { AgentCard } from '@/components/shared/agents/AgentCard';

describe('AgentCard', () => {
  it('renders agent information correctly', () => {
    // Test implementation
  });
  
  it('handles actions correctly', async () => {
    // Test implementation
  });
});

// ❌ Incorrect test organization
// test.ts
test('agent card works', () => {
  // Missing proper structure
  // Missing proper imports
  // Missing proper descriptions
});
```

### 5.2 Test Naming

```typescript
// ✅ Correct test naming
describe('AgentSystem', () => {
  it('creates new agent with valid configuration', async () => {});
  it('throws error when configuration is invalid', async () => {});
  it('handles concurrent agent creation correctly', async () => {});
});

// ❌ Incorrect test naming
describe('agent', () => {
  it('works', () => {});
  it('handles error', () => {});
  // Missing proper descriptions
  // Missing proper grouping
});
```

## 6. Security Standards

### 6.1 Authentication

```typescript
// ✅ Correct authentication implementation
export async function validateAuth(
  request: NextRequest,
  config: AuthConfig,
): Promise<AuthResult> {
  try {
    const token = await extractToken(request);
    const validated = await validateToken(token, config);
    return { valid: true, user: validated.user };
  } catch (error) {
    handleAuthError(error);
    return { valid: false, error };
  }
}

// ❌ Incorrect authentication implementation
function checkAuth(req) {
  // Missing type safety
  // Missing proper error handling
  // Missing proper validation
}
```

### 6.2 Resource Protection

```typescript
// ✅ Correct resource protection
export class ResourceGuard {
  private readonly limits: ResourceLimits;
  
  async validateAccess(
    resource: Resource,
    user: User,
  ): Promise<ValidationResult> {
    await this.checkPermissions(user, resource);
    await this.checkQuota(user, resource);
    await this.logAccess(user, resource);
    return { valid: true };
  }
}

// ❌ Incorrect resource protection
function checkResource(resource, user) {
  // Missing type safety
  // Missing proper validation
  // Missing proper logging
}
```

## 7. Performance Standards

### 7.1 Code Splitting

```typescript
// ✅ Correct code splitting
// app/(dashboard)/agents/page.tsx
import { Suspense } from 'react';
import { AgentList } from '@/components/agents/AgentList';

export default function AgentsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AgentList />
    </Suspense>
  );
}

// ❌ Incorrect code splitting
import { Everything } from '@/components';
// Missing proper lazy loading
// Missing proper suspense
```

### 7.2 State Management

```typescript
// ✅ Correct state management
export function useAgentState(agentId: string) {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['agent', agentId],
    queryFn: () => fetchAgent(agentId),
    staleTime: 1000 * 60, // 1 minute
  });
}

// ❌ Incorrect state management
function getAgentState() {
  // Missing proper caching
  // Missing proper types
  // Missing proper error handling
}
```

## 8. Documentation Standards

### 8.1 Code Comments

```typescript
// ✅ Correct comments
/**
 * Creates a new agent with the specified configuration.
 * @param config - The agent configuration
 * @returns The created agent instance
 * @throws {ValidationError} When configuration is invalid
 */
export async function createAgent(
  config: AgentConfig,
): Promise<Agent> {
  // Implementation
}

// ❌ Incorrect comments
// creates agent
function newAgent(config) {
  // Missing proper JSDoc
  // Missing proper param descriptions
  // Missing proper return type
}
```

### 8.2 API Documentation

```typescript
// ✅ Correct API documentation
/**
 * @api {post} /api/agents Create Agent
 * @apiName CreateAgent
 * @apiGroup Agents
 * @apiVersion 1.0.0
 *
 * @apiParam {Object} config Agent configuration
 * @apiParam {String} config.name Agent name
 * @apiParam {String[]} config.capabilities Agent capabilities
 *
 * @apiSuccess {Object} agent Created agent
 * @apiSuccess {String} agent.id Agent ID
 */
export async function POST(req: Request) {
  // Implementation
}

// ❌ Incorrect API documentation
// api endpoint for agents
export async function handler(req) {
  // Missing proper API documentation
  // Missing proper param documentation
  // Missing proper response documentation
}
```

## 9. Error Handling Standards

### 9.1 Error Classes

```typescript
// ✅ Correct error handling
export class AgentError extends Error {
  constructor(
    message: string,
    public readonly code: AgentErrorCode,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AgentError';
  }
}

// ❌ Incorrect error handling
class CustomError {
  // Missing proper extension
  // Missing proper typing
  // Missing proper details
}
```

### 9.2 Error Boundaries

```typescript
// ✅ Correct error boundary
export function AgentErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={<AgentErrorFallback />}
      onError={reportAgentError}
    >
      {children}
    </ErrorBoundary>
  );
}

// ❌ Incorrect error boundary
function ErrorHandler({ children }) {
  // Missing proper typing
  // Missing proper fallback
  // Missing proper error reporting
}
```

## 10. Monitoring Standards

### 10.1 Logging

```typescript
// ✅ Correct logging
export const logger = {
  info: (message: string, meta?: LogMeta) => {
    console.info(formatLog('INFO', message, meta));
  },
  error: (error: Error, meta?: LogMeta) => {
    console.error(formatLog('ERROR', error.message, {
      ...meta,
      stack: error.stack,
    }));
  },
};

// ❌ Incorrect logging
function log(msg) {
  // Missing proper levels
  // Missing proper formatting
  // Missing proper meta
}
```

### 10.2 Metrics

```typescript
// ✅ Correct metrics
export class MetricsCollector {
  private readonly metrics: Map<string, Metric>;
  
  recordLatency(name: string, duration: number): void {
    this.getOrCreateHistogram(name).record(duration);
  }
  
  recordCount(name: string, value: number): void {
    this.getOrCreateCounter(name).add(value);
  }
}

// ❌ Incorrect metrics
function track(name, value) {
  // Missing proper typing
  // Missing proper categorization
  // Missing proper aggregation
}
```
