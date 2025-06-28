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

## API Client

The project includes a generated Angular API client in `src/app/api/` created using ng-openapi-gen from OpenAPI specification.

### API Generation
- **Generator**: ng-openapi-gen 
- **Configuration**: `ng-openapi-gen.json`
- **Source**: OpenAPI spec from external endpoint
- **Output**: `src/app/api/`

### API Structure
```
src/app/api/
├── services/           # Service classes for each API endpoint group
│   ├── authentificate.service.ts
│   ├── marketing.service.ts
│   ├── price.service.ts
│   ├── service.ts
│   ├── task-stages.service.ts
│   ├── task-types.service.ts
│   ├── tasks.service.ts
│   └── users.service.ts
├── models/            # TypeScript interfaces for API data
│   ├── body-create-comment-as-task-comments-post.ts
│   ├── bot-create.ts
│   ├── create-buyer-model.ts
│   ├── http-validation-error.ts
│   ├── role-schema.ts
│   ├── task-create.ts
│   ├── task-stage-create.ts
│   ├── task-stage-update.ts
│   ├── task-type-create.ts
│   ├── task-type-update.ts
│   ├── task-update-schema.ts
│   ├── telegram-author.ts
│   ├── user-authorize.ts
│   ├── user-create.ts
│   ├── user-update-schema.ts
│   └── validation-error.ts
├── fn/                # Functional API calls organized by feature
│   ├── authentificate/
│   ├── marketing/
│   ├── price/
│   ├── task-stages/
│   ├── task-types/
│   ├── tasks/
│   ├── users/
│   └── *.ts           # Comment and webhook functions
├── api-configuration.ts # API base configuration
├── api.module.ts      # API module
├── base-service.ts    # Base service class
├── models.ts          # Model exports
├── request-builder.ts # Request builder utility
├── services.ts        # Service exports
└── strict-http-response.ts # HTTP response typing
```

### Available API Features
- **Authentication**: User/bot registration, authorization, Telegram auth
- **Tasks**: CRUD operations, stages, types, comments, Bitrix webhook integration
- **Task Stages**: Create, update, delete task stages
- **Task Types**: Create, update, delete task types with stages
- **Users**: Profile management, roles, user operations
- **Marketing**: Manager and UTM tracking
- **Price**: Buyer items and pricing
- **Comments**: Task comments with photo support

### API Usage
Import services from `src/app/api/services` and inject them into components:
```typescript
import { TasksService } from '../api/services/tasks.service';

constructor(private tasksService = inject(TasksService)) {}
```

## Design System & Styling

### Theme Configuration
The project uses **Tailwind CSS v4** with a custom Supabase-inspired theme located in `src/theme.css`. The theme includes:

- **Design System**: Light/dark mode support with CSS custom properties
- **Color Palette**: Primary green (`#72e3ad`), muted grays, and semantic colors
- **Typography**: Outfit font family with proper letter spacing
- **Component Library**: Pre-built button, card, input, and badge styles

### Available CSS Classes

#### Buttons
```html
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<button class="btn-destructive">Destructive Button</button>
<button class="btn-primary btn-sm">Small Button</button>
<button class="btn-primary btn-lg">Large Button</button>
```

#### Cards
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-content">Card content goes here</div>
</div>
```

#### Form Elements
```html
<input class="input" placeholder="Enter text..." />
<input class="input input-error" placeholder="Error state" />
<input class="input input-success" placeholder="Success state" />
```

#### Badges
```html
<span class="badge badge-success">Success</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-destructive">Error</span>
```

#### Layout Utilities
```html
<div class="container-responsive">Responsive container</div>
<div class="container-md">Medium container</div>
<div class="container-lg">Large container</div>
```

### Theme Features
- **Active States**: Buttons include enhanced active states with `rounded-xl` border radius and subtle scaling
- **Focus Management**: Thin, transparent focus rings (`ring-2 ring-ring/30`)
- **Dark Mode**: Automatic dark mode with softer text colors (`#d1d5db` instead of pure white)
- **Transitions**: Smooth `transition-all duration-200` on interactive elements

### Styling Guidelines
1. **Use Theme Classes**: Prefer predefined classes over custom styles
2. **Consistent Spacing**: Use theme's spacing scale (`--spacing-*`)
3. **Color Variables**: Reference CSS custom properties (`var(--color-*)`)
4. **Responsive Design**: Use breakpoint variables (`--breakpoint-*`)

## UI Component Library

The project includes a custom UI component library located in `src/app/ui/` that provides reusable components built on top of the theme system.

### Available Components & Directives

#### Button Directive (`/src/app/ui/button/button.directive.ts`)
A flexible button directive that enhances native button elements with variant and size support.

**Import:**
```typescript
import { ButtonDirective } from '../ui';
```

**Usage:**
```html
<button appButton variant="primary" size="default" (pressed)="handleClick()">
  Click me
</button>

<button appButton variant="secondary" size="sm" [disabled]="isDisabled">
  Small Button
</button>

<button appButton variant="destructive" size="lg" class="w-full">
  Large Destructive Button
</button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'destructive'` (default: `'primary'`)
- `size`: `'sm' | 'default' | 'lg'` (default: `'default'`)
- `disabled`: `boolean` (default: `false`)
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)
- Additional CSS classes can be added directly to the button element

**Events:**
- `(pressed)`: Emitted when button is clicked (if not disabled)

#### Stack Directive (`/src/app/ui/stack/stack.directive.ts`)
A layout directive that transforms any element into a flexible container with configurable spacing and alignment.

**Import:**
```typescript
import { StackDirective } from '../ui';
```

**Usage:**
```html
<!-- Horizontal button group -->
<div appStack direction="row" gap="4" justify="center" align="center">
  <button appButton variant="primary">Button 1</button>
  <button appButton variant="secondary">Button 2</button>
</div>

<!-- Vertical form layout -->
<div appStack direction="column" gap="6">
  <input class="input" placeholder="Name" />
  <input class="input" placeholder="Email" />
  <button appButton variant="primary">Submit</button>
</div>

<!-- Responsive grid alternative -->
<div appStack direction="row" gap="4" [wrap]="true" justify="between">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Props:**
- `direction`: `'row' | 'column' | 'row-reverse' | 'column-reverse'` (default: `'row'`)
- `gap`: `'0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24'` (default: `'4'`)
- `align`: `'start' | 'center' | 'end' | 'stretch' | 'baseline'` (default: `'center'`)
- `justify`: `'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'` (default: `'start'`)
- `wrap`: `boolean` (default: `false`)
- Additional CSS classes can be added directly to the element

#### Form Field Component (`/src/app/ui/form-field/form-field.component.ts`)
A comprehensive form field wrapper component that provides labels, hints, error handling, and form control integration.

**Import:**
```typescript
import { FormFieldComponent } from '../ui';
```

**Usage:**
```html
<app-form-field 
  label="Email Address"
  hint="We'll never share your email"
  [required]="true"
  [control]="emailControl"
  type="email"
  placeholder="Enter your email"
  size="default">
</app-form-field>
```

**Features:**
- Form control integration with automatic error display
- Label and hint text support
- Required field indicators
- Multiple input types (text, email, password, number, tel, url, search)
- Size variants (sm, default, lg)
- Automatic error message generation for common validators
- Custom error message support
- Pass-through properties to underlying input component
- Full ControlValueAccessor implementation

#### Input Component (`/src/app/ui/input/input.component.ts`)
A comprehensive form input component with various states and features.

**Import:**
```typescript
import { InputComponent } from '../ui';
```

**Features:**
- Multiple input types (text, email, password, number, etc.)
- Size variants (sm, default, lg)
- State variants (default, error, success)
- Loading state with spinner
- Password visibility toggle
- Clearable input for search
- Icon support (left/right)
- Full form control support with ControlValueAccessor

### UI Component Guidelines

1. **Component Structure**: All UI components follow the standalone component pattern
2. **Template Files**: Components use separate HTML files (`.html`) instead of inline templates
3. **Type Safety**: All component props use TypeScript interfaces for better DX
4. **Theme Integration**: Components leverage the existing theme classes and CSS custom properties
5. **Flexibility**: Components accept additional CSS classes via the `class` prop
6. **Accessibility**: Components include proper ARIA attributes and semantic HTML

### Creating New UI Components

When creating new UI components:

1. **Location**: Place in `src/app/ui/` directory
2. **Naming**: Use PascalCase for class names, kebab-case for selectors
3. **Structure**: Create separate `.ts` and `.html` files
4. **Exports**: Export TypeScript interfaces for props
5. **Theme**: Use existing theme classes and CSS custom properties
6. **Documentation**: Add component to this CLAUDE.md file

**Current UI component structure:**
```
src/app/ui/
├── button/
│   ├── button.directive.ts    # Button directive
│   └── index.ts               # Button exports
├── form-field/
│   ├── form-field.component.ts    # Form field component
│   ├── form-field.component.html  # Form field template
│   └── index.ts                   # Form field exports
├── input/
│   ├── input.component.ts     # Input component
│   ├── input.component.html   # Input template
│   └── index.ts               # Input exports
├── stack/
│   ├── stack.directive.ts     # Stack directive
│   └── index.ts               # Stack exports
└── index.ts                   # Main barrel export
```

## Architecture & Code Organization

### Key Technical Decisions
- **Standalone Components**: All components use the standalone API (no NgModules)
- **Zoneless Change Detection**: Application runs without Zone.js using `provideZonelessChangeDetection()`
- **Separate Template Files**: Components use separate HTML template files instead of inline templates
- **Component Prefix**: Use `app-` prefix for all component selectors
- **Design System**: Tailwind CSS v4 with custom theme for consistent UI

### File Structure
```
src/
├── app/
│   ├── app.ts                    # Root component
│   ├── app.config.ts             # Client app configuration
│   ├── app.config.server.ts      # Server app configuration  
│   ├── app.routes.ts             # Client-side routes
│   ├── app.routes.server.ts      # Server-side routes
│   ├── api/                      # Generated API client
│   │   ├── services/             # Service classes for API endpoints
│   │   ├── models/               # TypeScript interfaces for API data
│   │   ├── fn/                   # Functional API calls by feature
│   │   └── *.ts                  # API configuration files
│   ├── components/               # Shared components
│   │   └── environment-info.component.ts
│   ├── demo/                     # Demo components
│   │   └── form-field-demo.component.ts
│   ├── pages/                    # Page components
│   │   └── ui-kit/               # UI kit showcase page
│   ├── services/                 # Application services
│   │   └── environment.service.ts
│   └── ui/                       # UI component library
│       ├── button/               # Button directive
│       ├── form-field/           # Form field component
│       ├── input/                # Input component
│       ├── stack/                # Stack layout directive
│       └── index.ts              # UI barrel exports
├── environments/                 # Environment configuration
│   ├── environment.ts
│   ├── environment.development.ts
│   └── environment.prod.ts
├── main.ts                       # Client bootstrap
├── main.server.ts                # Server bootstrap
├── server.ts                     # Express server for SSR
├── styles.css                    # Global styles
└── theme.css                     # Tailwind theme configuration
```

### Configuration Files
- `angular.json` - Angular CLI configuration, uses pnpm as package manager
- `tsconfig.json` - TypeScript strict mode enabled with Angular-specific options
- `server.ts` - Express server setup for SSR

### Important Angular Patterns
1. **Component Creation**: Use Angular CLI: `ng generate component name --standalone`
2. **Template Files**: ALWAYS create separate `.html` files for component templates using `templateUrl` instead of inline `template`
3. **Route Configuration**: Add routes to `app.routes.ts` as const arrays
4. **Service Injection**: Use `inject()` function in constructors or field initializers
5. **Change Detection**: Call `ChangeDetectorRef.markForCheck()` when needed (zoneless)
6. **Signal APIs**: ALWAYS use signal-based `input()` and `output()` functions instead of decorator-based `@Input()` and `@Output()` for component properties and events

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
