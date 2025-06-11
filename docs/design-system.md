# Obulo Design System

## Overview

Obulo uses a complete shadcn/ui design system implementation with CSS variables for consistent theming across the entire application. This approach ensures perfect design coherence and makes it easy to maintain and scale the UI. **The design system uses a sophisticated stone color palette with stone-700 as the primary Obulo accent color.**

## 🎨 Design Tokens

### Color System

All colors are defined as CSS variables in `apps/web/src/index.css` using the **stone theme**:

```css
:root {
  /* Core shadcn/ui colors - Stone Theme */
  --background: 0 0% 100%;
  --foreground: 20 14.3% 4.1%;
  --primary: 24 9.8% 10%;              /* Stone-950 */
  --primary-foreground: 60 9.1% 97.8%; /* Stone-50 */
  --secondary: 60 4.8% 95.9%;          /* Stone-50 */
  --muted: 60 4.8% 95.9%;              /* Stone-50 */
  --muted-foreground: 25 5.3% 44.7%;   /* Stone-500 */
  --border: 20 5.9% 90%;               /* Stone-200 */
  --input: 20 5.9% 90%;                /* Stone-200 */
  --ring: 24 9.8% 10%;                 /* Stone-950 */
  
  /* Obulo brand colors - Stone Theme */
  --brand-primary: 25 5.3% 44.7%;      /* Stone-700 - Main Obulo accent */
  --brand-secondary: 60 4.8% 95.9%;    /* Stone-50 - Light background */
  --brand-accent: 142.1 76.2% 36.3%;   /* Emerald-600 for success states */
  --brand-muted: 20 5.9% 90%;          /* Stone-200 for subtle elements */
}
```

### Stone Color Palette

The stone theme provides a sophisticated, professional color palette:

```tsx
// Stone color values available
stone-50   /* Very light warm gray */
stone-100  /* Light warm gray */
stone-200  /* Light gray for borders and subtle elements */
stone-300  /* Medium-light gray */
stone-400  /* Medium gray */
stone-500  /* Balanced medium gray */
stone-600  /* Medium-dark gray */
stone-700  /* 🎯 Main Obulo accent color - Professional dark gray */
stone-800  /* Dark gray */
stone-900  /* Very dark gray */
stone-950  /* Deep dark gray */
```

### Usage in Components

Instead of hardcoded colors, always use the design tokens:

```tsx
// ❌ Don't do this
<div className="bg-gray-600 text-white border-gray-200">

// ✅ Do this - Using design tokens
<div className="bg-primary text-primary-foreground border-border">

// ✅ Or use direct stone colors when appropriate
<div className="bg-stone-700 text-white border-stone-200">
```

## 🧱 Component Architecture

### Using the UI Package

All components should use the centralized UI package (`@obulo/ui`):

```tsx
import { Button, Card, Input } from '@obulo/ui'

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  )
}
```

### Component Variants

Components follow shadcn/ui patterns with proper variants using the stone theme:

```tsx
// Button variants with stone theme
<Button variant="default">Primary Action</Button>       {/* Stone-950 background */}
<Button variant="outline">Secondary Action</Button>    {/* Stone border */}
<Button variant="ghost">Subtle Action</Button>         {/* Stone hover */}
<Button variant="destructive">Danger Action</Button>   {/* Red destructive */}

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

## 📋 Component Guidelines

### 1. Card Components

For any content containers using stone theme:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@obulo/ui'

<Card className="bg-card border-stone-200">
  <CardHeader>
    <CardTitle className="text-stone-900">Dashboard</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content here */}
  </CardContent>
</Card>
```

### 2. Form Components

For consistent form styling with stone theme:

```tsx
import { Input, Button } from '@obulo/ui'

<form className="space-y-4">
  <div className="space-y-2">
    <label className="text-sm font-medium text-stone-700">
      Email
    </label>
    <Input type="email" placeholder="name@example.com" />
  </div>
  <Button type="submit" className="w-full bg-stone-700 hover:bg-stone-800">
    Submit
  </Button>
</form>
```

### 3. Layout Components

For consistent spacing and layout with stone accents:

```tsx
// Page containers with stone backgrounds
<div className="container mx-auto px-4 py-6 bg-stone-50">
  {/* Page content */}
</div>

// Section spacing with stone borders
<div className="space-y-6 border-t border-stone-200 pt-6">
  {/* Vertically spaced sections */}
</div>

// Flex layouts with stone accents
<div className="flex items-center justify-between border-b border-stone-200 pb-4">
  {/* Header with title and actions */}
</div>
```

## 🎯 Best Practices

### 1. Always Use Design Tokens

```tsx
// ❌ Hardcoded colors
className="bg-gray-50 text-gray-900 border-gray-200"

// ✅ Design tokens
className="bg-muted text-foreground border-border"

// ✅ Stone theme colors when needed
className="bg-stone-50 text-stone-900 border-stone-200"
```

### 2. Consistent Spacing

Use the spacing scale consistently:

```tsx
// Standard spacing: space-y-2, space-y-4, space-y-6, space-y-8
<div className="space-y-6">
  {/* Use consistent vertical spacing */}
</div>

// Padding: p-2, p-4, p-6, p-8
<div className="p-6 bg-stone-50">
  {/* Consistent padding with stone background */}
</div>
```

### 3. Typography Scale

Use the predefined typography scale with stone colors:

```tsx
<h1 className="text-3xl font-bold text-stone-900">Main Title</h1>
<h2 className="text-2xl font-semibold text-stone-800">Section Title</h2>
<h3 className="text-lg font-medium text-stone-700">Subsection</h3>
<p className="text-sm text-stone-600">Secondary text</p>
<p className="text-xs text-stone-500">Subtle text</p>
```

### 4. State Management

For interactive states with stone theme:

```tsx
// Focus states with stone ring
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-700"

// Hover states with stone colors
className="hover:bg-stone-50 hover:text-stone-900"

// Disabled states
className="disabled:opacity-50 disabled:pointer-events-none disabled:text-stone-400"
```

## 🌙 Dark Mode Support

The design system includes full dark mode support with adjusted stone colors:

```tsx
// In your theme provider
<html className={isDark ? 'dark' : ''}>
```

Dark mode automatically uses:
- **Backgrounds**: Stone-900, Stone-800
- **Text**: Stone-50, Stone-100
- **Accents**: Stone-300 (lighter for contrast)
- **Borders**: Stone-700, Stone-600

## 🔧 Custom Components

When creating new components, follow the shadcn/ui patterns with stone theme:

```tsx
import { cn } from '@obulo/ui/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const componentVariants = cva(
  'base-classes-here bg-stone-50 text-stone-900',
  {
    variants: {
      variant: {
        default: 'border-stone-200 hover:bg-stone-100',
        accent: 'border-stone-700 bg-stone-700 text-white hover:bg-stone-800',
      },
      size: {
        sm: 'p-2 text-sm',
        md: 'p-4 text-base',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    }
  }
)

interface ComponentProps extends VariantProps<typeof componentVariants> {
  className?: string
  // other props
}

export function CustomComponent({ className, variant, size, ...props }: ComponentProps) {
  return (
    <div 
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

## 🎨 Obulo Brand Guidelines

### Primary Accent Color: Stone-700

Stone-700 is the primary Obulo accent color and should be used for:
- **Primary buttons and CTAs**
- **Logo backgrounds and brand elements**
- **Active navigation states**
- **Important highlights and emphasis**

```tsx
// Obulo brand usage
<Button className="bg-stone-700 text-white hover:bg-stone-800">
  Primary Action
</Button>

<div className="border-l-4 border-stone-700 pl-4">
  Important callout
</div>
```

### Supporting Colors

- **Stone-50**: Light backgrounds and subtle areas
- **Stone-200**: Borders and dividers
- **Emerald-600**: Success states and positive actions
- **Red-600**: Error states and destructive actions

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Stone Colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference)
- [Class Variance Authority](https://cva.style/)

## 🚀 Quick Start

1. Import components from `@obulo/ui`
2. Use stone design tokens instead of hardcoded values
3. Follow the stone theme component patterns
4. Maintain consistent spacing and typography
5. Test in both light and dark modes
6. Use stone-700 as the primary Obulo accent color

This design system ensures that every part of the Obulo application has a consistent, professional stone-themed appearance that scales beautifully across different screen sizes and usage contexts. 