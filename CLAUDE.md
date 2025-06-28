# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is an Angular 20 application with Server-Side Rendering (SSR) using Angular Universal. The project uses standalone components with zoneless change detection for optimal performance.

## Essential Commands

### Development
- `pnpm start` - Start development server at http://localhost:4200/ with hot reload
- `pnpm run build` - Build the application for production
- `pnpm run watch` - Build in watch mode for development
- `pnpm test` - Run unit tests with Karma and Jasmine
- `pnpm run serve:ssr:lescom` - Serve the SSR build locally

### Testing
- `pnpm test` - Run all unit tests
- `ng test --include='**/specific.spec.ts'` - Run specific test file
- `ng test --watch=false` - Run tests once without watching

### Code Quality
- `pnpm run lint` - Check code with ESLint (Airbnb config)
- `pnpm run lint:fix` - Auto-fix linting issues
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check if code is formatted

## Git Commit Guidelines

### Conventional Commits
This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. All commits must be structured as:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes that don't modify src or test files

#### Examples
```bash
feat: add user authentication
fix: resolve memory leak in data service
docs: update API documentation
style: format code according to Airbnb style guide
refactor: extract common logic into utils
perf: optimize bundle size with lazy loading
test: add unit tests for auth service
build: update Angular to v20
chore: update dependencies
```

### Pre-commit Checks
**IMPORTANT**: Always run linting before committing to ensure code quality:

```bash
# Run lint check
pnpm run lint

# Fix auto-fixable issues
pnpm run lint:fix

# Format code
pnpm run format
```

Husky is configured to run these checks automatically:
- **Pre-commit**: Runs ESLint to ensure code quality
- **Commit-msg**: Validates commit messages follow Conventional Commits format

The hooks will prevent commits if linting fails or commit messages don't follow the convention.

## Architecture & Code Organization

### Key Technical Decisions
- **Standalone Components**: All components use the standalone API (no NgModules)
- **Zoneless Change Detection**: Application runs without Zone.js using `provideZonelessChangeDetection()`
- **Inline Templates/Styles**: Components default to inline templates and styles
- **Component Prefix**: Use `app-` prefix for all component selectors

### File Structure
```
src/
├── app/
│   ├── app.ts              # Root component
│   ├── app.config.ts       # Client app configuration
│   ├── app.config.server.ts # Server app configuration  
│   ├── app.routes.ts       # Client-side routes
│   └── app.routes.server.ts # Server-side routes
├── main.ts                 # Client bootstrap
├── main.server.ts          # Server bootstrap
└── server.ts               # Express server for SSR
```

### Configuration Files
- `angular.json` - Angular CLI configuration, uses pnpm as package manager
- `tsconfig.json` - TypeScript strict mode enabled with Angular-specific options
- `server.ts` - Express server setup for SSR

### Important Angular Patterns
1. **Component Creation**: Use Angular CLI: `ng generate component name --standalone`
2. **Route Configuration**: Add routes to `app.routes.ts` as const arrays
3. **Service Injection**: Use `inject()` function in constructors or field initializers
4. **Change Detection**: Call `ChangeDetectorRef.markForCheck()` when needed (zoneless)

### SSR Considerations
- Server-specific logic goes in `app.config.server.ts`
- Use `isPlatformBrowser()/isPlatformServer()` for platform-specific code
- Client hydration is enabled with event replay
- Avoid direct DOM manipulation; use Angular APIs instead

## Development Guidelines

### TypeScript Configuration
The project enforces strict TypeScript settings:
- All strict checks enabled
- No implicit any, returns, or property access
- Explicit override annotations required
- Angular template strict mode enabled

### Testing Approach
- Unit tests use Karma + Jasmine
- Test files follow `*.spec.ts` naming convention
- Tests should use `TestBed` with zoneless change detection
- No E2E testing framework configured yet

### Build Optimization
- Initial bundle budget: 500kB
- Component style budget: 4kB
- Production builds use optimization and minification
- Source maps disabled in production
