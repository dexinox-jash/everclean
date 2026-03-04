# Everclean Luxury Design System

A sophisticated, centralized design system for the Everclean Luxury brand. This system reflects our commitment to elegance, discretion, and impeccable service for discerning clientele.

## Table of Contents

- [Brand Philosophy](#brand-philosophy)
- [Quick Start](#quick-start)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing](#spacing)
- [Shadows & Effects](#shadows--effects)
- [Animation](#animation)
- [Component Tokens](#component-tokens)
- [Usage Examples](#usage-examples)
- [Customization Guide](#customization-guide)

---

## Brand Philosophy

Everclean Luxury represents:
- **Sophistication**: Refined elegance in every detail
- **Discretion**: Respecting our clients' privacy above all
- **Excellence**: White-glove service standards
- **Trust**: Building lasting relationships with discerning homeowners

### Design Principles

1. **Understated Elegance**: Less is more. Every element should feel intentional and refined.
2. **Generous Whitespace**: Luxury requires room to breathe. Use ample spacing.
3. **Sophisticated Typography**: Combine serif headings with clean sans-serif body text.
4. **Premium Color Palette**: Deep navy, champagne gold, and ivory create timeless luxury.
5. **Subtle Animations**: Smooth, unhurried transitions convey quality and care.

---

## Quick Start

### 1. Using CSS Variables (Recommended)

All design tokens are available as CSS custom properties:

```tsx
// Background colors
<div className="bg-[var(--bg-primary)]">

// Brand colors
<div className="text-[var(--brand-secondary-500)]">

// Using Tailwind shorthand
<div className="bg-brand-primary text-fg-inverse">
```

### 2. Using Tailwind Classes

The design system extends Tailwind with semantic classes:

```tsx
// Colors
<div className="bg-brand-primary text-fg-primary">

// Spacing
<div className="p-section-md">

// Shadows
<div className="shadow-card hover:shadow-card-hover">

// Animation
<div className="transition-all duration-normal ease-luxury">
```

### 3. Using TypeScript Tokens

Import tokens for dynamic values:

```tsx
import { colors, spacing, getColor } from '@/lib/design-system';

// Access token values
const navyColor = colors.brand.primary[500];  // '#0A1929'
const goldColor = colors.brand.secondary[500]; // '#D4AF37'
const sectionPadding = spacing.section.md;      // '6rem'

// Helper function
const luxuryGold = getColor('brand.secondary.500');
```

---

## Color System

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-primary-500` | `#0A1929` | Primary brand color (Deep Navy) |
| `--brand-secondary-500` | `#D4AF37` | Accent color (Champagne Gold) |
| `--brand-neutral-500` | `#78716C` | Supporting color (Warm Grey) |

#### Primary Scale - Deep Navy
```css
--brand-primary-50: #E8ECEF;   /* Lightest */
--brand-primary-100: #D1D9DF;
--brand-primary-500: #0A1929;  /* Base - Deep Navy */
--brand-primary-600: #081420;
--brand-primary-900: #020508;  /* Darkest */
```

#### Secondary Scale - Champagne Gold
```css
--brand-secondary-400: #E7DFC1;
--brand-secondary-500: #D4AF37;  /* Base - Champagne Gold */
--brand-secondary-600: #B5952F;
--brand-secondary-700: #967B27;
```

### Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--bg-primary` | `#FAF9F6` | `#0A0E14` | Page background (Ivory) |
| `--bg-secondary` | `#FFFFFF` | `#111827` | Cards, sections |
| `--bg-tertiary` | `#F5F3EF` | `#1A1F2E` | Subtle backgrounds |
| `--fg-primary` | `#1C1917` | `#FAFAF9` | Headings, important text |
| `--fg-secondary` | `#44403C` | `#E7E5E4` | Body text |
| `--fg-tertiary` | `#78716C` | `#A8A29E` | Captions, metadata |
| `--border-default` | `#E7E5E4` | `#1F2937` | Default borders |

### State Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--state-success` | `#059669` | Success states (refined green) |
| `--state-warning` | `#D97706` | Warning states (amber) |
| `--state-error` | `#DC2626` | Error states (refined red) |
| `--state-info` | `#2563EB` | Info states |

### Interaction Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--hover-primary` | `#081420` | Primary button hover |
| `--hover-secondary` | `#B5952F` | Gold accent hover |
| `--focus-ring` | `#0A1929` | Focus outline color |

---

## Typography

### Font Families

```css
--font-sans: 'Inter', system-ui, sans-serif;           /* Body text */
--font-serif: 'Playfair Display', Georgia, serif;      /* Headings */
--font-mono: ui-monospace, monospace;                  /* Code, data */
```

### Font Sizes

| Token | Value | Usage |
|-------|-------|-------|
| `--text-xs` | `0.75rem` (12px) | Captions, badges |
| `--text-sm` | `0.875rem` (14px) | Small text, buttons |
| `--text-base` | `1rem` (16px) | Body text |
| `--text-lg` | `1.125rem` (18px) | Large body text |
| `--text-xl` | `1.25rem` (20px) | Small headings |
| `--text-2xl` | `1.5rem` (24px) | H4 |
| `--text-3xl` | `1.875rem` (30px) | H3 |
| `--text-4xl` | `2.25rem` (36px) | H2 |
| `--text-5xl` | `3rem` (48px) | Hero (mobile) |
| `--text-6xl` | `3.75rem` (60px) | Hero (tablet) |
| `--text-7xl` | `4.5rem` (72px) | Hero (desktop) |

### Font Weights

```css
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* Buttons, labels */
--font-semibold: 600;  /* Emphasis */
--font-bold: 700;      /* Strong emphasis */
```

**Note**: Luxury design favors lighter weights. Use `font-normal` (400) for serif headings.

### Line Heights

```css
--leading-tight: 1.2;     /* Headings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.65;  /* Large text blocks */
```

### Letter Spacing

```css
--tracking-tight: -0.01em;   /* Headings */
--tracking-normal: 0em;      /* Body */
--tracking-wide: 0.025em;    /* Buttons, labels */
--tracking-wider: 0.05em;    /* Uppercase text */
--tracking-widest: 0.1em;    /* Luxury accents */
```

---

## Spacing

### Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `--space-4` | `1rem` | 16px |
| `--space-6` | `1.5rem` | 24px |
| `--space-8` | `2rem` | 32px |
| `--space-12` | `3rem` | 48px |
| `--space-16` | `4rem` | 64px |
| `--space-20` | `5rem` | 80px |
| `--space-24` | `6rem` | 96px |

### Section Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--section-sm` | `4rem` (64px) | Compact sections |
| `--section-md` | `6rem` (96px) | Standard sections |
| `--section-lg` | `10rem` (160px) | Large sections, hero |

**Luxury Principle**: Use generous spacing. Premium brands require room to breathe.

### Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--layout-gutter` | `1.5rem` (24px) | Mobile padding |
| `--layout-gutter-lg` | `2rem` (32px) | Desktop padding |
| `--layout-max-width` | `80rem` (1280px) | Max container width |
| `--layout-content-width` | `64rem` (1024px) | Content max width |

---

## Shadows & Effects

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.03)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px...` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px...` | Modals, overlays |
| `--shadow-xl` | `0 20px 25px -5px...` | High elevation |

### Semantic Shadows

| Token | Usage |
|-------|-------|
| `--shadow-card` | Default card shadow (soft) |
| `--shadow-card-hover` | Card hover state (elevated) |
| `--shadow-dropdown` | Dropdown menus |
| `--shadow-modal` | Modal dialogs |
| `--shadow-gold` | Gold accent glow |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `0.25rem` (4px) | Small elements |
| `--radius-md` | `0.5rem` (8px) | Buttons, inputs |
| `--radius-lg` | `0.75rem` (12px) | Cards |
| `--radius-xl` | `1rem` (16px) | Large cards |
| `--radius-2xl` | `1.5rem` (24px) | Sections |

### Glass Effects

```css
.glass-luxury {
  background: rgba(250, 249, 246, 0.85);
  backdrop-filter: blur(20px);
}

.glass-dark {
  background: rgba(10, 25, 41, 0.9);
  backdrop-filter: blur(20px);
}
```

---

## Animation

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `200ms` | Micro-interactions |
| `--duration-normal` | `350ms` | Standard transitions |
| `--duration-slow` | `500ms` | Complex animations |
| `--duration-slower` | `700ms` | Page transitions |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard |
| `--ease-luxury` | `cubic-bezier(0.23, 1, 0.32, 1)` | Premium feel |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Exiting |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Snappy |

### Transitions

```css
--transition-colors: background-color 350ms ease, border-color 350ms ease, color 350ms ease;
--transition-transform: transform 350ms ease;
--transition-all: all 350ms ease;
```

**Luxury Principle**: Slower, smoother animations convey quality and care.

---

## Component Tokens

### Button

```css
/* Padding */
--btn-padding-sm: 0.75rem 1.25rem;
--btn-padding-md: 0.875rem 1.5rem;
--btn-padding-lg: 1rem 2rem;

/* Height */
--btn-height-sm: 2.5rem;
--btn-height-md: 3rem;
--btn-height-lg: 3.5rem;
```

### Card

```css
--card-padding-sm: 1.5rem;
--card-padding-md: 2rem;
--card-padding-lg: 2.5rem;
```

### Input

```css
--input-height-sm: 2.5rem;
--input-height-md: 3rem;
--input-height-lg: 3.5rem;
```

---

## Usage Examples

### 1. Creating a Luxury Button

```tsx
<button className="
  bg-brand-primary 
  hover:bg-hover-primary 
  text-fg-inverse 
  px-8 py-4 
  rounded-md 
  font-medium 
  tracking-wide
  transition-all 
  duration-normal
  hover:shadow-lg
">
  Request Consultation
</button>
```

### 2. Creating a Service Card

```tsx
<div className="
  bg-bg-secondary 
  rounded-xl 
  shadow-card 
  hover:shadow-card-hover 
  p-8
  border border-border-subtle
  hover:border-brand-secondary/30
  transition-all 
  duration-normal
  hover:-translate-y-0.5
">
  <h3 className="font-serif text-xl text-fg-primary tracking-wide">Estate Cleaning</h3>
  <p className="text-fg-tertiary mt-3 leading-relaxed">Comprehensive care for luxury estates.</p>
</div>
```

### 3. Section Layout - Luxury

```tsx
<section className="py-section-lg bg-bg-tertiary">
  <div className="container mx-auto max-w-layout px-gutter">
    <span className="text-sm font-medium text-brand-secondary tracking-[0.2em] uppercase mb-4 block">
      Our Story
    </span>
    <h2 className="font-serif text-4xl text-fg-primary leading-tight">
      Excellence in every detail
    </h2>
  </div>
</section>
```

### 4. Using TypeScript Tokens

```tsx
import { colors, getColor, cn } from '@/lib/design-system';

// Direct token access
const style = { backgroundColor: colors.brand.primary[500] };

// Using helper function
const goldColor = getColor('brand.secondary.500');

// Conditional classes with cn utility
const cardClass = cn(
  "p-8 rounded-xl border transition-all duration-normal",
  isFeatured && "border-brand-secondary shadow-gold",
  !isFeatured && "border-border-subtle shadow-card"
);
```

### 5. Theme Toggle

```tsx
import { useDesignSystem, ThemeToggle } from '@/lib/design-system';

function Header() {
  const { theme, isDark, toggleTheme } = useDesignSystem();
  
  return (
    <header>
      {/* Icon button toggle */}
      <ThemeToggle variant="icon" />
      
      {/* Or switch toggle */}
      <ThemeToggle variant="switch" />
    </header>
  );
}
```

---

## Customization Guide

### Changing Brand Colors

Edit `app/globals.css`:

```css
:root {
  /* Change primary from navy to burgundy */
  --brand-primary-500: #722F37;
  --brand-primary-600: #5C262D;
  --brand-primary-400: #8F3A44;
  
  /* Update related colors */
  --hover-primary: #5C262D;
  --focus-ring: #722F37;
}
```

### Changing Typography

Edit `app/globals.css`:

```css
:root {
  /* Change serif font */
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  
  /* Adjust font sizes for more drama */
  --text-6xl: 4rem;
  --text-7xl: 5rem;
  --leading-tight: 1.1;
}
```

Also update `app/layout.tsx`:

```tsx
import { Cormorant_Garamond } from "next/font/google";

const playfair = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});
```

### Changing Spacing

Edit `app/globals.css`:

```css
:root {
  /* Increase section padding for more luxury feel */
  --section-md: 8rem;
  --section-lg: 12rem;
  
  /* Wider content area */
  --layout-max-width: 90rem;  /* 1440px */
}
```

### Changing Border Radius

Edit `app/globals.css`:

```css
:root {
  /* More refined corners */
  --radius-md: 0.375rem;
  --radius-lg: 0.625rem;
  --radius-xl: 1.25rem;
}
```

### Changing Shadows

Edit `app/globals.css`:

```css
:root {
  /* Softer, more elegant shadows */
  --shadow-card: 0 4px 24px -4px rgb(0 0 0 / 0.06);
  --shadow-card-hover: 0 12px 48px -8px rgb(0 0 0 / 0.1);
}
```

### Changing Animation Speed

Edit `app/globals.css`:

```css
:root {
  /* Slower, more luxurious transitions */
  --duration-normal: 400ms;
  --duration-slow: 600ms;
  
  /* Refined easing */
  --ease-luxury: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

---

## Dark Mode

The design system includes a complete luxury dark mode theme:

```tsx
// In your layout or component
<html className="dark">

// Or use the DesignProvider for automatic switching
<DesignProvider defaultTheme="system" enableSystem>
  <App />
</DesignProvider>
```

Dark mode colors are defined in the `.dark` class in `globals.css`.

---

## Best Practices

1. **Use semantic tokens** instead of hardcoded colors:
   - ✅ `bg-bg-primary`
   - ❌ `bg-[#FAF9F6]`

2. **Use CSS variables** for dynamic theming:
   - ✅ `text-[var(--fg-primary)]`
   - ❌ `text-gray-900`

3. **Use the `cn` utility** for conditional classes:
   ```tsx
   cn("base-class", condition && "conditional-class")
   ```

4. **Prefer Tailwind shorthands** over arbitrary values:
   - ✅ `duration-normal`
   - ❌ `duration-[350ms]`

5. **Use serif fonts for headings**:
   - ✅ `<h2 className="font-serif">`
   - ❌ `<h2 className="font-sans font-bold">`

6. **Add generous letter-spacing to luxury elements**:
   - ✅ `tracking-[0.2em]` for uppercase labels
   - ✅ `tracking-wide` for buttons

7. **Keep font weights light** for luxury feel:
   - ✅ `font-normal` for serif headings
   - ✅ `font-medium` for emphasis

8. **Use ample whitespace**:
   - Sections: `py-section-lg` (10rem)
   - Cards: `p-8` minimum
   - Between elements: generous gaps

---

## Support

For questions or issues with the design system:
1. Check this documentation
2. Review example usage in existing components
3. Examine the token definitions in `lib/design-system/tokens.ts`
