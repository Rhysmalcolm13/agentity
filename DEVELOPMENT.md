# Development Workflow

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd agentity
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your values
```

4. Set up the database
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

## Development Process

### 1. Starting Development

1. Pull latest changes
```bash
git pull origin main
```

2. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

3. Start the development server
```bash
npm run dev
```

### 2. Making Changes

1. Follow our code standards:
- Use TypeScript for all new files
- Add proper types and interfaces
- Follow the component structure in `src/components`
- Use the existing UI components from `src/components/ui`
- Add tests for new features

2. Run type checking while developing
```bash
# One-time check
npm run type-check

# Watch mode
npm run type-check -- --watch
```

3. Format your code
```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check
```

### 3. Testing

1. Run tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:ci
```

2. Run type checking
```bash
npm run type-check
```

3. Run linting
```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### 4. Before Committing

1. Run all checks
```bash
npm run validate
```

This will run:
- Type checking
- Linting with auto-fix
- Code formatting
- Tests

2. Stage your changes
```bash
git add .
```

3. Commit with a descriptive message following conventional commits:
```bash
git commit -m "type(scope): description"
```

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

### 5. Database Management

1. View and edit database
```bash
npm run db:studio
```

2. Create a new migration
```bash
npm run db:migrate
```

3. Reset database (caution: deletes all data)
```bash
npm run db:reset
```

### 6. Maintenance

1. Clean project
```bash
# Clean everything
npm run clean

# Clean only build files
npm run clean:build
```

2. Update dependencies
```bash
# Check outdated dependencies
npm outdated

# Update all dependencies
npm update
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── (features)/       # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and services
├── types/                # TypeScript types and interfaces
└── middleware.ts         # Next.js middleware

prisma/                   # Prisma schema and migrations
scripts/                  # Utility scripts
public/                   # Static assets
```

## Common Tasks

### Adding a New Feature

1. Create necessary types in `src/types`
2. Add any required database models to `prisma/schema.prisma`
3. Create API routes in `src/app/api`
4. Create UI components in `src/components`
5. Add page components in `src/app`
6. Add tests for new components and functions

### Updating the Database Schema

1. Update `prisma/schema.prisma`
2. Run migrations:
```bash
npm run db:migrate
```

### Adding New Dependencies

1. Install the package:
```bash
npm install package-name
```

2. Install types if needed:
```bash
npm install -D @types/package-name
```

## Deployment

1. Merge your PR to main
2. GitHub Actions will:
   - Run all tests
   - Build the application
   - Deploy to staging (if all checks pass)

## Troubleshooting

### Common Issues

1. **Type Errors**
   - Run `npm run type-check` for detailed information
   - Check if types are properly imported
   - Verify type definitions in `src/types`

2. **Build Errors**
   - Run `npm run clean:build` to clear build cache
   - Run `npm run clean` and reinstall dependencies
   - Check for circular dependencies

3. **Database Issues**
   - Run `npm run db:reset` to reset the database
   - Run `npm run db:generate` to regenerate the client
   - Check connection string in `.env`

4. **Test Failures**
   - Run `npm run test:watch` for detailed test output
   - Check test coverage with `npm run test:ci`
   - Verify test environment setup 