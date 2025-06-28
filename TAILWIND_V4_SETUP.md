# Tailwind CSS v4 Setup for lescom Project

This document provides instructions for setting up and using Tailwind CSS v4 with the custom Supabase-inspired theme.

## Table of Contents

1. [Installation](#installation)
2. [File Structure](#file-structure)
3. [Setup Instructions](#setup-instructions)
4. [Usage Examples](#usage-examples)
5. [Component Classes](#component-classes)
6. [Angular Integration](#angular-integration)
7. [Theme Customization](#theme-customization)
8. [Dark Mode](#dark-mode)

## Installation

### 1. Install Tailwind CSS v4

```bash
npm install tailwindcss@next @tailwindcss/vite@next
# or
pnpm add tailwindcss@next @tailwindcss/vite@next
```

### 2. Install Additional Dependencies (Optional)

```bash
npm install @tailwindcss/forms @tailwindcss/typography
# or
pnpm add @tailwindcss/forms @tailwindcss/typography
```

## File Structure

The theme setup consists of these key files:

```
lescom/
├── theme.css                    # Main theme file (Tailwind v4 configuration)
├── tailwind.config.ts          # Tailwind configuration
├── src/
│   ├── styles.css              # Global styles (imports theme.css)
│   └── app/
│       └── components/         # Angular components using theme classes
```

## Setup Instructions

### 1. Update Angular Configuration

In `angular.json`, ensure your build configuration includes the theme:

```json
{
  "projects": {
    "lescom": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

### 2. Import Theme in Global Styles

Update `src/styles.css`:

```css
/* Import the custom Tailwind v4 theme */
@import '../theme.css';

/* Additional global styles */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  letter-spacing: var(--tracking-normal);
}

/* Angular Material compatibility (if using) */
.mat-typography {
  font-family: var(--font-sans) !important;
  letter-spacing: var(--tracking-normal) !important;
}
```

### 3. Configure Vite (if using Vite)

Add to `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    // other plugins
  ],
});
```

### 4. PostCSS Configuration (Alternative setup)

If not using Vite, create `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Usage Examples

### Basic HTML with Theme Classes

```html
<!-- Container with responsive design -->
<div class="container-responsive">
  <!-- Card component -->
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Welcome to lescom</h2>
    </div>
    <div class="card-content">
      <p>This is a card using the Supabase-inspired theme.</p>
    </div>
  </div>
  
  <!-- Button examples -->
  <div class="flex gap-4 mt-6">
    <button class="btn-primary">Primary Action</button>
    <button class="btn-secondary">Secondary Action</button>
    <button class="btn-destructive btn-sm">Delete</button>
  </div>
</div>
```

### Form Example

```html
<form class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-foreground mb-2">
      Email Address
    </label>
    <input 
      type="email" 
      class="input focus-ring" 
      placeholder="Enter your email"
    />
  </div>
  
  <div>
    <label class="block text-sm font-medium text-foreground mb-2">
      Password
    </label>
    <input 
      type="password" 
      class="input focus-ring" 
      placeholder="Enter your password"
    />
  </div>
  
  <button type="submit" class="btn-primary w-full">
    Sign In
  </button>
</form>
```

## Component Classes

### Buttons

```html
<!-- Primary button -->
<button class="btn-primary">Click me</button>

<!-- Secondary button -->
<button class="btn-secondary">Cancel</button>

<!-- Destructive button -->
<button class="btn-destructive">Delete</button>

<!-- Size variants -->
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary btn-lg">Large</button>
```

### Cards

```html
<!-- Basic card -->
<div class="card">
  <h3 class="card-title">Card Title</h3>
  <p class="card-content">Card content goes here.</p>
</div>

<!-- Card with custom content -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Advanced Card</h3>
    <span class="badge-info">New</span>
  </div>
  <div class="card-content">
    Custom content with multiple elements.
  </div>
</div>
```

### Badges

```html
<span class="badge badge-success">Success</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-destructive">Error</span>
```

### Tables

```html
<div class="overflow-x-auto">
  <table class="table">
    <thead class="table-header">
      <tr>
        <th class="table-header-cell">Name</th>
        <th class="table-header-cell">Email</th>
        <th class="table-header-cell">Status</th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr class="table-row">
        <td class="table-cell table-cell-primary">John Doe</td>
        <td class="table-cell table-cell-secondary">john@example.com</td>
        <td class="table-cell">
          <span class="badge badge-success">Active</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

## Angular Integration

### 1. Component with Theme Classes

```typescript
@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="container-responsive py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="card" *ngFor="let item of dashboardItems">
          <div class="card-header">
            <h3 class="card-title">{{ item.title }}</h3>
            <span 
              class="badge" 
              [ngClass]="{
                'badge-success': item.status === 'active',
                'badge-warning': item.status === 'pending',
                'badge-destructive': item.status === 'error'
              }"
            >
              {{ item.status }}
            </span>
          </div>
          <div class="card-content">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  dashboardItems = [
    { title: 'Analytics', status: 'active', description: 'View your metrics' },
    { title: 'Tasks', status: 'pending', description: 'Manage your tasks' },
    { title: 'Settings', status: 'active', description: 'Configure your app' }
  ];
}
```

### 2. Custom Angular Service for Theme

```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = signal(false);
  
  constructor() {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkMode(prefersDark);
  }
  
  setDarkMode(isDark: boolean) {
    this.isDarkMode.set(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  toggleDarkMode() {
    this.setDarkMode(!this.isDarkMode());
  }
  
  get isDark() {
    return this.isDarkMode.asReadonly();
  }
  
  // Helper methods for getting theme-aware classes
  getButtonClass(variant: 'primary' | 'secondary' | 'destructive' = 'primary', size: 'sm' | 'base' | 'lg' = 'base'): string {
    const baseClass = `btn-${variant}`;
    const sizeClass = size !== 'base' ? `btn-${size}` : '';
    return `${baseClass} ${sizeClass}`.trim();
  }
  
  getBadgeClass(variant: 'success' | 'info' | 'warning' | 'destructive'): string {
    return `badge badge-${variant}`;
  }
}
```

### 3. Theme Toggle Component

```typescript
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="btn-secondary btn-sm"
      (click)="toggleTheme()"
      [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        @if (themeService.isDark()) {
          <!-- Sun icon for light mode -->
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
        } @else {
          <!-- Moon icon for dark mode -->
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        }
      </svg>
      <span class="ml-2">
        {{ themeService.isDark() ? 'Light' : 'Dark' }}
      </span>
    </button>
  `
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}
  
  toggleTheme() {
    this.themeService.toggleDarkMode();
  }
}
```

## Theme Customization

### Modifying Colors

To customize colors, edit the CSS variables in `theme.css`:

```css
@theme {
  /* Change primary color */
  --color-primary: #your-color;
  --color-primary-foreground: #your-foreground-color;
  
  /* Add custom colors */
  --color-brand: #your-brand-color;
  --color-brand-foreground: #your-brand-foreground;
}

/* Add custom component classes */
@layer components {
  .btn-brand {
    @apply inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center rounded-lg;
    @apply bg-brand text-brand-foreground hover:bg-brand/90;
    @apply focus:ring-4 focus:ring-ring focus:outline-none;
    @apply transition-colors duration-200;
  }
}
```

### Adding Custom Components

```css
@layer components {
  .alert {
    @apply p-4 rounded-lg border;
  }
  
  .alert-info {
    @apply alert bg-chart-2/10 border-chart-2/20 text-chart-2;
  }
  
  .alert-success {
    @apply alert bg-chart-5/10 border-chart-5/20 text-chart-5;
  }
  
  .alert-warning {
    @apply alert bg-chart-4/10 border-chart-4/20 text-chart-4;
  }
  
  .alert-error {
    @apply alert bg-destructive/10 border-destructive/20 text-destructive;
  }
}
```

## Dark Mode

### Automatic Dark Mode

The theme supports both system preference and manual toggle:

1. **System Preference**: Automatically detects `prefers-color-scheme: dark`
2. **Manual Toggle**: Uses `.dark` class on document element

### Implementation

```typescript
// In your app component or service
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      this.themeService.setDarkMode(e.matches);
    });
  }
}
```

### CSS Classes

All theme classes automatically work with dark mode:

```html
<!-- These classes work in both light and dark mode -->
<div class="bg-background text-foreground">
  <div class="card">
    <h2 class="text-card-foreground">Title</h2>
    <p class="text-muted-foreground">Description</p>
  </div>
</div>
```

## Best Practices

1. **Use Semantic Colors**: Prefer `bg-primary` over `bg-green-500`
2. **Component Classes**: Use pre-built component classes like `btn-primary`, `card`
3. **Consistent Spacing**: Use the spacing scale variables
4. **Accessibility**: Always include focus states and proper contrast
5. **Performance**: Leverage the safelist in config for dynamic classes

## Troubleshooting

### Common Issues

1. **Classes not applying**: Check that `theme.css` is imported in `styles.css`
2. **Dark mode not working**: Ensure `.dark` class is added to document element
3. **Build errors**: Verify Tailwind v4 and dependencies are installed correctly

### Debug Steps

```bash
# Check Tailwind CSS build
npm run build

# Verify theme file is loaded
# Check browser DevTools > Network tab for theme.css

# Test dark mode toggle
# Check document.documentElement.classList in console
```

This setup provides a complete Tailwind CSS v4 theme system with Supabase-inspired design for your lescom Angular project.