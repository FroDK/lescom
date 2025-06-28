# Tailwind CSS Design System Documentation

This document outlines the Tailwind CSS patterns and design system extracted from the Flowbite UI templates for use in the lescom project.

## Table of Contents

1. [Design System Fundamentals](#design-system-fundamentals)
2. [Layout Patterns](#layout-patterns)
3. [Component Patterns](#component-patterns)
4. [Dark Mode Implementation](#dark-mode-implementation)
5. [Interactive Elements](#interactive-elements)
6. [Common Utility Combinations](#common-utility-combinations)
7. [Typography System](#typography-system)
8. [Responsive Design](#responsive-design)
9. [Form Elements](#form-elements)
10. [Navigation Components](#navigation-components)

## Design System Fundamentals

### Color Palette - Supabase Theme

Primary color scale based on Supabase green theme:
```css
/* Light Mode Colors */
--background: #fcfcfc
--foreground: #171717
--card: #fcfcfc
--card-foreground: #171717
--popover: #fcfcfc
--popover-foreground: #525252
--primary: #72e3ad        /* Main green */
--primary-foreground: #1e2723
--secondary: #fdfdfd
--secondary-foreground: #171717
--muted: #ededed
--muted-foreground: #202020
--accent: #ededed
--accent-foreground: #202020
--destructive: #ca3214
--destructive-foreground: #fffcfc
--border: #dfdfdf
--input: #f6f6f6
--ring: #72e3ad

/* Dark Mode Colors */
--background: #121212
--foreground: #e2e8f0
--card: #171717
--card-foreground: #e2e8f0
--popover: #242424
--popover-foreground: #a9a9a9
--primary: #006239        /* Dark green */
--primary-foreground: #dde8e3
--secondary: #242424
--secondary-foreground: #fafafa
--muted: #1f1f1f
--muted-foreground: #a2a2a2
--accent: #313131
--accent-foreground: #fafafa
--destructive: #541c15
--destructive-foreground: #ede9e8
--border: #292929
--input: #242424
--ring: #4ade80

/* Chart Colors */
--chart-1: #72e3ad / #4ade80  /* Green */
--chart-2: #3b82f6 / #60a5fa  /* Blue */
--chart-3: #8b5cf6 / #a78bfa  /* Purple */
--chart-4: #f59e0b / #fbbf24  /* Yellow */
--chart-5: #10b981 / #2dd4bf  /* Teal */
```

### Typography
- **Primary Font**: Outfit with fallback stack: `Outfit, sans-serif`
- **Monospace Font**: `monospace`
- **Serif Font**: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`
- **Font Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
- **Font Weights**: normal (400), medium (500), semibold (600), bold (700), extrabold (800)
- **Letter Spacing**: Custom tracking with `--tracking-normal: 0.025em`

## Layout Patterns

### Container System
```html
<!-- Standard container -->
<div class="mx-auto max-w-screen-xl px-4 lg:px-6">
  <!-- Content -->
</div>

<!-- Medium container -->
<div class="mx-auto max-w-screen-md px-4">
  <!-- Content -->
</div>

<!-- Large container -->
<div class="mx-auto max-w-screen-lg px-4">
  <!-- Content -->
</div>
```

### Spacing System
- **Padding**: `p-4`, `p-6`, `p-8`, `px-4`, `py-8`
- **Margin**: `m-4`, `mx-auto`, `my-8`
- **Gap**: `gap-4`, `gap-6`, `gap-8`

### Grid Layouts
```html
<!-- Responsive 3-column grid -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
  <!-- Grid items -->
</div>

<!-- Auto-fit grid -->
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <!-- Grid items -->
</div>
```

## Component Patterns

### Buttons

#### Primary Button
```html
<button class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-primary-foreground rounded-lg bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-ring dark:text-primary-foreground dark:bg-primary dark:hover:bg-primary/90">
  Button Text
</button>
```

#### Secondary Button
```html
<button class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-secondary-foreground rounded-lg border border-border bg-secondary hover:bg-accent focus:ring-4 focus:ring-ring dark:text-secondary-foreground dark:border-border dark:bg-secondary dark:hover:bg-accent">
  Button Text
</button>
```

#### Small Button
```html
<button class="px-3 py-2 text-sm font-medium text-center text-primary-foreground rounded-lg bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-ring">
  Small Button
</button>
```

### Cards

#### Basic Card
```html
<div class="rounded-lg bg-card p-4 shadow dark:bg-card sm:p-6 xl:p-8">
  <h3 class="mb-4 text-xl font-semibold text-card-foreground dark:text-card-foreground">Card Title</h3>
  <p class="text-muted-foreground dark:text-muted-foreground">Card content</p>
</div>
```

#### Card with Border
```html
<div class="rounded-lg border border-border bg-card p-6 shadow-sm dark:border-border dark:bg-card">
  <!-- Card content -->
</div>
```

### Badges

```html
<!-- Success Badge -->
<span class="inline-flex items-center rounded-full bg-chart-5/20 px-2.5 py-0.5 text-xs font-medium text-chart-5 dark:bg-chart-5/20 dark:text-chart-5">
  Success
</span>

<!-- Info Badge -->
<span class="inline-flex items-center rounded-full bg-chart-2/20 px-2.5 py-0.5 text-xs font-medium text-chart-2 dark:bg-chart-2/20 dark:text-chart-2">
  Info
</span>

<!-- Destructive Badge -->
<span class="inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs font-medium text-destructive-foreground dark:bg-destructive dark:text-destructive-foreground">
  Error
</span>
```

## Dark Mode Implementation

### Background Colors
```css
/* Light/Dark backgrounds */
bg-background dark:bg-background     /* Main background */
bg-card dark:bg-card                /* Card background */
bg-muted dark:bg-muted              /* Muted background */
bg-accent dark:bg-accent            /* Accent background */
```

### Text Colors
```css
/* Light/Dark text */
text-foreground dark:text-foreground                /* Primary text */
text-card-foreground dark:text-card-foreground      /* Card text */
text-muted-foreground dark:text-muted-foreground    /* Muted text */
text-primary-foreground dark:text-primary-foreground /* Primary button text */
```

### Border Colors
```css
/* Light/Dark borders */
border-border dark:border-border    /* Main border color */
border-input dark:border-input      /* Input border color */
```

## Interactive Elements

### Hover States
```css
/* Background hover */
hover:bg-accent dark:hover:bg-accent

/* Text hover */
hover:text-primary dark:hover:text-primary

/* Shadow hover */
hover:shadow-lg
```

### Focus States
```css
/* Ring focus */
focus:ring-4 focus:ring-ring dark:focus:ring-ring

/* Border focus */
focus:border-ring dark:focus:border-ring

/* Outline focus */
focus:outline-none
```

### Active States
```css
/* Background active */
active:bg-gray-200 dark:active:bg-gray-600

/* Scale active */
active:scale-95
```

## Common Utility Combinations

### Flex Centering
```html
<!-- Center both axes -->
<div class="flex items-center justify-center">
  <!-- Content -->
</div>

<!-- Space between -->
<div class="flex items-center justify-between">
  <!-- Content -->
</div>
```

### Responsive Visibility
```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden sm:block">
  <!-- Content -->
</div>

<!-- Show on mobile, hide on desktop -->
<div class="block sm:hidden">
  <!-- Content -->
</div>
```

### Text Truncation
```html
<!-- Single line truncate -->
<p class="truncate">Long text that will be truncated</p>

<!-- Multi-line clamp -->
<p class="line-clamp-3">Long text that will be clamped to 3 lines</p>
```

## Typography System

### Headings
```html
<h1 class="text-5xl font-extrabold text-foreground dark:text-foreground">Heading 1</h1>
<h2 class="text-4xl font-bold text-foreground dark:text-foreground">Heading 2</h2>
<h3 class="text-3xl font-bold text-foreground dark:text-foreground">Heading 3</h3>
<h4 class="text-2xl font-bold text-foreground dark:text-foreground">Heading 4</h4>
<h5 class="text-xl font-semibold text-foreground dark:text-foreground">Heading 5</h5>
<h6 class="text-lg font-semibold text-foreground dark:text-foreground">Heading 6</h6>
```

### Body Text
```html
<!-- Base paragraph -->
<p class="text-base text-foreground dark:text-foreground">Body text</p>

<!-- Small text -->
<p class="text-sm text-muted-foreground dark:text-muted-foreground">Small text</p>

<!-- Large text -->
<p class="text-lg text-foreground dark:text-foreground">Large text</p>
```

### Links
```html
<a href="#" class="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80">
  Link text
</a>
```

## Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Responsive Text
```html
<h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Responsive heading
</h1>
```

### Responsive Spacing
```html
<div class="p-4 sm:p-6 lg:p-8">
  <!-- Content with responsive padding -->
</div>
```

### Responsive Flex Direction
```html
<div class="flex flex-col sm:flex-row">
  <!-- Stacked on mobile, side-by-side on desktop -->
</div>
```

## Form Elements

### Text Input
```html
<input type="text" 
       class="bg-input border border-border text-foreground text-sm rounded-lg focus:ring-ring focus:border-ring block w-full p-2.5 dark:bg-input dark:border-border dark:placeholder-muted-foreground dark:text-foreground dark:focus:ring-ring dark:focus:border-ring" 
       placeholder="Enter text">
```

### Select Dropdown
```html
<select class="bg-input border border-border text-foreground text-sm rounded-lg focus:ring-ring focus:border-ring block w-full p-2.5 dark:bg-input dark:border-border dark:placeholder-muted-foreground dark:text-foreground dark:focus:ring-ring dark:focus:border-ring">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Checkbox
```html
<div class="flex items-center">
  <input type="checkbox" 
         class="w-4 h-4 text-primary bg-input rounded border-border focus:ring-ring dark:focus:ring-ring dark:ring-offset-background focus:ring-2 dark:bg-input dark:border-border">
  <label class="ml-2 text-sm font-medium text-foreground dark:text-foreground">
    Checkbox label
  </label>
</div>
```

### Radio Button
```html
<div class="flex items-center">
  <input type="radio" 
         class="w-4 h-4 text-primary bg-input border-border focus:ring-ring dark:focus:ring-ring dark:ring-offset-background focus:ring-2 dark:bg-input dark:border-border">
  <label class="ml-2 text-sm font-medium text-foreground dark:text-foreground">
    Radio label
  </label>
</div>
```

### Textarea
```html
<textarea rows="4" 
          class="bg-input border border-border text-foreground text-sm rounded-lg focus:ring-ring focus:border-ring block w-full p-2.5 dark:bg-input dark:border-border dark:placeholder-muted-foreground dark:text-foreground dark:focus:ring-ring dark:focus:border-ring" 
          placeholder="Write your thoughts here..."></textarea>
```

## Navigation Components

### Navbar
```html
<nav class="fixed z-30 w-full bg-background border-b border-border dark:bg-background dark:border-border">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <!-- Navbar content -->
    </div>
  </div>
</nav>
```

### Sidebar Item
```html
<a href="#" class="flex items-center p-2 text-base text-foreground rounded-lg hover:bg-accent group dark:text-foreground dark:hover:bg-accent">
  <svg class="w-6 h-6 text-muted-foreground transition duration-75 group-hover:text-foreground dark:text-muted-foreground dark:group-hover:text-foreground" fill="currentColor">
    <!-- Icon -->
  </svg>
  <span class="ml-3">Menu Item</span>
</a>
```

### Breadcrumb
```html
<nav class="flex mb-4" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
      <a href="#" class="text-sm font-medium text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground">
        Home
      </a>
    </li>
    <li>
      <div class="flex items-center">
        <svg class="w-6 h-6 text-muted-foreground" fill="currentColor">
          <!-- Chevron icon -->
        </svg>
        <a href="#" class="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground md:ml-2 dark:text-muted-foreground dark:hover:text-foreground">
          Current Page
        </a>
      </div>
    </li>
  </ol>
</nav>
```

## Tables

### Basic Table
```html
<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-border table-fixed dark:divide-border">
    <thead class="bg-muted dark:bg-muted">
      <tr>
        <th class="p-4 text-xs font-medium text-left text-muted-foreground uppercase dark:text-muted-foreground">
          Column 1
        </th>
        <th class="p-4 text-xs font-medium text-left text-muted-foreground uppercase dark:text-muted-foreground">
          Column 2
        </th>
      </tr>
    </thead>
    <tbody class="bg-card divide-y divide-border dark:bg-card dark:divide-border">
      <tr class="hover:bg-accent dark:hover:bg-accent">
        <td class="p-4 text-base font-medium text-foreground whitespace-nowrap dark:text-foreground">
          Cell 1
        </td>
        <td class="p-4 text-base font-normal text-muted-foreground whitespace-nowrap dark:text-muted-foreground">
          Cell 2
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

## Implementation Guidelines for Angular

### 1. Component Styling
Create Angular components with these Tailwind classes:
```typescript
@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button [ngClass]="buttonClasses">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  
  get buttonClasses() {
    const base = 'inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center rounded-lg focus:ring-4';
    
    if (this.variant === 'primary') {
      return `${base} text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900`;
    }
    
    return `${base} text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800`;
  }
}
```

### 2. Directives for Common Patterns
Create directives for reusable patterns:
```typescript
@Directive({
  selector: '[appCard]',
  standalone: true
})
export class CardDirective {
  @HostBinding('class')
  get classes() {
    return 'rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8';
  }
}
```

### 3. Service for Dynamic Classes
```typescript
@Injectable({
  providedIn: 'root'
})
export class TailwindService {
  getButtonClasses(variant: string, size: string = 'base'): string {
    // Return appropriate classes based on variant and size
  }
  
  getInputClasses(state: 'default' | 'error' | 'success' = 'default'): string {
    // Return appropriate input classes
  }
}
```

## Best Practices

1. **Consistency**: Always use the same utility combinations for similar elements
2. **Dark Mode**: Include dark mode variants for all color utilities
3. **Responsiveness**: Design mobile-first and add responsive modifiers
4. **Accessibility**: Include focus states and proper ARIA attributes
5. **Performance**: Use PurgeCSS/Tailwind JIT to minimize CSS bundle size
6. **Component Reuse**: Create Angular components for repeated patterns
7. **Custom Properties**: Use CSS custom properties for dynamic theming
8. **Documentation**: Document any custom utility classes or components

## Tailwind Configuration

Add these customizations to `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Supabase theme colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['monospace'],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif']
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)'
      },
      boxShadow: {
        '2xs': 'var(--shadow-2xs)',
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)'
      },
      letterSpacing: {
        tighter: 'calc(var(--tracking-normal) - 0.05em)',
        tight: 'calc(var(--tracking-normal) - 0.025em)',
        normal: 'var(--tracking-normal)',
        wide: 'calc(var(--tracking-normal) + 0.025em)',
        wider: 'calc(var(--tracking-normal) + 0.05em)',
        widest: 'calc(var(--tracking-normal) + 0.1em)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

## CSS Variables Import

Make sure to import the Supabase theme CSS file in your main styles:

```css
@import './supabase-theme.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

This design system provides a solid foundation for building consistent, accessible, and beautiful user interfaces with Tailwind CSS in your Angular application.