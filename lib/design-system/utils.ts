/**
 * Design System Utilities
 * 
 * Helper functions for working with design tokens.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { 
  colors, 
  spacing, 
  typography, 
  shadows,
  borderRadius,
} from "./tokens";

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get a color value from the design system
 * 
 * @example
 * ```ts
 * getColor('brand.primary.500') // '#0A4D3C'
 * getColor('semantic.background.primary') // '#FFFAF0'
 * ```
 */
export function getColor(path: string): string | undefined {
  const parts = path.split('.');
  let value: unknown = colors;
  
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  
  return typeof value === 'string' ? value : undefined;
}

/**
 * Get a spacing value from the design system
 * 
 * @example
 * ```ts
 * getSpacing(4) // '1rem'
 * getSpacing('section.md') // '5rem'
 * ```
 */
export function getSpacing(key: number | string): string | undefined {
  if (typeof key === 'number') {
    return spacing.scale[key as unknown as keyof typeof spacing.scale];
  }
  
  const parts = key.split('.');
  let value: unknown = spacing;
  
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  
  return typeof value === 'string' ? value : undefined;
}

/**
 * Get a font size value from the design system
 * 
 * @example
 * ```ts
 * getFontSize('lg') // { size: '1.125rem', lineHeight: '1.75rem' }
 * ```
 */
export function getFontSize(key: keyof typeof typography.fontSize) {
  return typography.fontSize[key];
}

/**
 * Get a shadow value from the design system
 * 
 * @example
 * ```ts
 * getShadow('card') // '0 4px 6px -1px rgb(0 0 0 / 0.05)...'
 * ```
 */
export function getShadow(key: keyof typeof shadows): string {
  return shadows[key];
}

/**
 * Get a border radius value from the design system
 * 
 * @example
 * ```ts
 * getBorderRadius('card') // '0.75rem'
 * ```
 */
export function getBorderRadius(key: keyof typeof borderRadius): string {
  return borderRadius[key];
}

/**
 * Generate a style object for common component patterns
 * 
 * @example
 * ```ts
 * const styles = createStyles({
 *   padding: 'section.md',
 *   backgroundColor: 'brand.primary.500',
 *   shadow: 'card'
 * });
 * ```
 */
interface StyleConfig {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  borderRadius?: keyof typeof borderRadius;
  shadow?: keyof typeof shadows;
}

export function createStyles(config: StyleConfig): React.CSSProperties {
  const styles: React.CSSProperties = {};
  
  if (config.padding) {
    const spacingValue = getSpacing(config.padding);
    if (spacingValue) styles.padding = spacingValue;
  }
  
  if (config.margin) {
    const spacingValue = getSpacing(config.margin);
    if (spacingValue) styles.margin = spacingValue;
  }
  
  if (config.backgroundColor) {
    const colorValue = getColor(config.backgroundColor);
    if (colorValue) styles.backgroundColor = colorValue;
  }
  
  if (config.color) {
    const colorValue = getColor(config.color);
    if (colorValue) styles.color = colorValue;
  }
  
  if (config.borderRadius) {
    styles.borderRadius = getBorderRadius(config.borderRadius);
  }
  
  if (config.shadow) {
    styles.boxShadow = getShadow(config.shadow);
  }
  
  return styles;
}

/**
 * Responsive style helper - returns different values for different breakpoints
 * 
 * @example
 * ```ts
 * const width = responsive({
 *   base: '100%',
 *   md: '50%',
 *   lg: '33.333%'
 * });
 * ```
 */
export function responsive<T>(values: { base: T } & Partial<Record<'sm' | 'md' | 'lg' | 'xl' | '2xl', T>>): T {
  // This is a type helper - actual responsive logic should use Tailwind classes
  return values.base;
}

/**
 * Generate CSS custom property references for dynamic theming
 * 
 * @example
 * ```ts
 * cssVar('bg-primary') // 'var(--bg-primary)'
 * cssVar('brand-primary-500', '#fallback') // 'var(--brand-primary-500, #fallback)'
 * ```
 */
export function cssVar(name: string, fallback?: string): string {
  if (fallback) {
    return `var(--${name}, ${fallback})`;
  }
  return `var(--${name})`;
}

/**
 * Convert a hex color to RGB values for use with opacity
 * 
 * @example
 * ```ts
 * hexToRgb('#0A4D3C') // '10, 77, 60'
 * ```
 */
export function hexToRgb(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `${r}, ${g}, ${b}`;
}

/**
 * Generate an alpha color value
 * 
 * @example
 * ```ts
 * alpha('#0A4D3C', 0.5) // 'rgba(10, 77, 60, 0.5)'
 * ```
 */
export function alpha(color: string, opacity: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  return `rgba(${rgb}, ${opacity})`;
}
