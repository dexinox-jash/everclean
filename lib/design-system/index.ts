/**
 * EVERCLEAN DESIGN SYSTEM
 * 
 * A centralized design system for the Everclean website.
 * 
 * @example
 * ```tsx
 * // Use design tokens in components
 * import { colors, typography, spacing } from '@/lib/design-system';
 * 
 * // Use the provider for theme switching
 * import { DesignProvider, useDesignSystem, ThemeToggle } from '@/lib/design-system';
 * ```
 */

// Export tokens
export { 
  designTokens,
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  zIndex,
  breakpoints,
  components,
} from './tokens';

export type { DesignTokens } from './tokens';

// Export provider and hooks
export { 
  DesignProvider,
  useDesignSystem,
  ThemeToggle,
} from './DesignProvider';

// Export utilities
export { 
  cn,
  getColor,
  getSpacing,
  getFontSize,
  getShadow,
} from './utils';
