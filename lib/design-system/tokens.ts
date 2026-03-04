/**
 * EVERCLEAN DESIGN SYSTEM TOKENS
 * 
 * This file contains all design tokens for the Everclean brand.
 * Modify values here to update the entire website's appearance.
 * 
 * @see DESIGN_SYSTEM.md for full documentation
 */

// =============================================================================
// COLOR SYSTEM
// =============================================================================

export const colors = {
  // Brand Colors - The core identity colors
  brand: {
    primary: {
      DEFAULT: "#0A4D3C",      // Deep Emerald - Main brand color
      50: "#E6F2EF",
      100: "#CCE5DE",
      200: "#99CBBD",
      300: "#66B19C",
      400: "#33977B",
      500: "#0A4D3C",          // Base
      600: "#083D30",
      700: "#062E24",
      800: "#041E18",
      900: "#020F0C",
    },
    secondary: {
      DEFAULT: "#C9A961",      // Gold - Accent color
      50: "#FBF8F1",
      100: "#F7F1E3",
      200: "#EFE3C7",
      300: "#E7D5AB",
      400: "#DFC78F",
      500: "#C9A961",          // Base
      600: "#A1874E",
      700: "#79653A",
      800: "#504427",
      900: "#282213",
    },
    neutral: {
      DEFAULT: "#8FA89B",      // Sage - Supporting color
      50: "#F4F7F5",
      100: "#E9EFEC",
      200: "#D3DFD8",
      300: "#BDCFC5",
      400: "#A7BEB1",
      500: "#8FA89B",          // Base
      600: "#73867C",
      700: "#56655D",
      800: "#3A433E",
      900: "#1D221F",
    },
  },

  // Semantic Colors - Usage-based colors
  semantic: {
    background: {
      DEFAULT: "#FFFAF0",      // Ivory - Page background
      primary: "#FFFAF0",      // Main background
      secondary: "#FFFFFF",    // Card/Section backgrounds
      tertiary: "#F5F0E6",     // Subtle sections
      inverse: "#1A1A1A",      // Dark backgrounds
    },
    foreground: {
      DEFAULT: "#1A1A1A",      // Charcoal - Main text
      primary: "#1A1A1A",      // Headings, important text
      secondary: "#4A4A4A",    // Body text
      tertiary: "#737373",     // Captions, metadata
      muted: "#A3A3A3",        // Placeholders, disabled
      inverse: "#FFFFFF",      // Text on dark backgrounds
    },
    border: {
      DEFAULT: "#E5E7EB",      // Light borders
      subtle: "#F0F0F0",       // Very light borders
      strong: "#D1D5DB",       // Prominent borders
      inverse: "#374151",      // Borders on dark backgrounds
    },
    state: {
      success: {
        DEFAULT: "#10B981",
        light: "#D1FAE5",
        dark: "#065F46",
      },
      warning: {
        DEFAULT: "#F59E0B",
        light: "#FEF3C7",
        dark: "#92400E",
      },
      error: {
        DEFAULT: "#EF4444",
        light: "#FEE2E2",
        dark: "#991B1B",
      },
      info: {
        DEFAULT: "#3B82F6",
        light: "#DBEAFE",
        dark: "#1E40AF",
      },
    },
  },

  // Interaction Colors - Hover, focus, active states
  interaction: {
    hover: {
      primary: "#083D30",      // Darker emerald
      secondary: "#A1874E",    // Darker gold
      neutral: "#73867C",      // Darker sage
    },
    focus: {
      ring: "#0A4D3C",         // Focus ring color
      ringOffset: "#FFFAF0",   // Focus ring offset
    },
    active: {
      primary: "#062E24",
      secondary: "#79653A",
    },
  },
} as const;

// =============================================================================
// TYPOGRAPHY SYSTEM
// =============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    display: ['Inter', 'system-ui', 'sans-serif'],  // For headings
    body: ['Inter', 'system-ui', 'sans-serif'],     // For body text
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
  },

  // Font Sizes (in rem)
  fontSize: {
    xs: { size: "0.75rem", lineHeight: "1rem" },           // 12px
    sm: { size: "0.875rem", lineHeight: "1.25rem" },       // 14px
    base: { size: "1rem", lineHeight: "1.5rem" },          // 16px
    lg: { size: "1.125rem", lineHeight: "1.75rem" },       // 18px
    xl: { size: "1.25rem", lineHeight: "1.75rem" },        // 20px
    "2xl": { size: "1.5rem", lineHeight: "2rem" },         // 24px
    "3xl": { size: "1.875rem", lineHeight: "2.25rem" },    // 30px
    "4xl": { size: "2.25rem", lineHeight: "2.5rem" },      // 36px
    "5xl": { size: "3rem", lineHeight: "1.16" },           // 48px
    "6xl": { size: "3.75rem", lineHeight: "1.12" },        // 60px
    "7xl": { size: "4.5rem", lineHeight: "1.1" },          // 72px
  },

  // Font Weights
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  // Letter Spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  // Text Styles - Predefined combinations
  textStyle: {
    hero: {
      fontSize: "3.75rem",      // 60px
      fontWeight: "700",
      lineHeight: "1.12",
      letterSpacing: "-0.025em",
    },
    h1: {
      fontSize: "2.25rem",      // 36px
      fontWeight: "700",
      lineHeight: "2.5rem",
      letterSpacing: "-0.025em",
    },
    h2: {
      fontSize: "1.875rem",     // 30px
      fontWeight: "600",
      lineHeight: "2.25rem",
      letterSpacing: "-0.025em",
    },
    h3: {
      fontSize: "1.5rem",       // 24px
      fontWeight: "600",
      lineHeight: "2rem",
      letterSpacing: "-0.025em",
    },
    h4: {
      fontSize: "1.25rem",      // 20px
      fontWeight: "600",
      lineHeight: "1.75rem",
      letterSpacing: "0em",
    },
    h5: {
      fontSize: "1.125rem",     // 18px
      fontWeight: "600",
      lineHeight: "1.75rem",
      letterSpacing: "0em",
    },
    h6: {
      fontSize: "1rem",         // 16px
      fontWeight: "600",
      lineHeight: "1.5rem",
      letterSpacing: "0em",
    },
    bodyLarge: {
      fontSize: "1.125rem",     // 18px
      fontWeight: "400",
      lineHeight: "1.75rem",
      letterSpacing: "0em",
    },
    body: {
      fontSize: "1rem",         // 16px
      fontWeight: "400",
      lineHeight: "1.5rem",
      letterSpacing: "0em",
    },
    bodySmall: {
      fontSize: "0.875rem",     // 14px
      fontWeight: "400",
      lineHeight: "1.25rem",
      letterSpacing: "0em",
    },
    caption: {
      fontSize: "0.75rem",      // 12px
      fontWeight: "400",
      lineHeight: "1rem",
      letterSpacing: "0.025em",
    },
    button: {
      fontSize: "0.875rem",     // 14px
      fontWeight: "500",
      lineHeight: "1.25rem",
      letterSpacing: "0.025em",
    },
    label: {
      fontSize: "0.75rem",      // 12px
      fontWeight: "500",
      lineHeight: "1rem",
      letterSpacing: "0.025em",
      textTransform: "uppercase",
    },
  },
} as const;

// =============================================================================
// SPACING SYSTEM
// =============================================================================

export const spacing = {
  // Base spacing scale (in rem)
  scale: {
    0: "0",
    px: "1px",
    0.5: "0.125rem",    // 2px
    1: "0.25rem",       // 4px
    1.5: "0.375rem",    // 6px
    2: "0.5rem",        // 8px
    2.5: "0.625rem",    // 10px
    3: "0.75rem",       // 12px
    3.5: "0.875rem",    // 14px
    4: "1rem",          // 16px
    5: "1.25rem",       // 20px
    6: "1.5rem",        // 24px
    7: "1.75rem",       // 28px
    8: "2rem",          // 32px
    9: "2.25rem",       // 36px
    10: "2.5rem",       // 40px
    11: "2.75rem",      // 44px
    12: "3rem",         // 48px
    14: "3.5rem",       // 56px
    16: "4rem",         // 64px
    20: "5rem",         // 80px
    24: "6rem",         // 96px
    28: "7rem",         // 112px
    32: "8rem",         // 128px
    36: "9rem",         // 144px
    40: "10rem",        // 160px
    44: "11rem",        // 176px
    48: "12rem",        // 192px
    52: "13rem",        // 208px
    56: "14rem",        // 224px
    60: "15rem",        // 240px
    64: "16rem",        // 256px
    72: "18rem",        // 288px
    80: "20rem",        // 320px
    96: "24rem",        // 384px
  },

  // Semantic spacing
  section: {
    sm: "3rem",         // 48px
    md: "5rem",         // 80px
    lg: "8rem",         // 128px
  },

  component: {
    xs: "0.25rem",      // 4px
    sm: "0.5rem",       // 8px
    md: "1rem",         // 16px
    lg: "1.5rem",       // 24px
    xl: "2rem",         // 32px
  },

  layout: {
    gutter: "1.5rem",   // 24px - Mobile
    gutterLg: "2rem",   // 32px - Desktop
    maxWidth: "80rem",  // 1280px
    contentWidth: "64rem", // 1024px
  },
} as const;

// =============================================================================
// BORDER RADIUS SYSTEM
// =============================================================================

export const borderRadius = {
  none: "0",
  sm: "0.25rem",       // 4px
  DEFAULT: "0.5rem",   // 8px
  md: "0.5rem",        // 8px
  lg: "0.75rem",       // 12px
  xl: "1rem",          // 16px
  "2xl": "1.5rem",     // 24px
  "3xl": "2rem",       // 32px
  full: "9999px",      // Fully rounded

  // Semantic
  button: "0.5rem",
  card: "0.75rem",
  input: "0.5rem",
  badge: "9999px",
  avatar: "9999px",
} as const;

// =============================================================================
// SHADOW SYSTEM
// =============================================================================

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",

  // Semantic shadows
  card: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
  cardHover: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  dropdown: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  modal: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  focus: "0 0 0 3px rgba(10, 77, 60, 0.3)",
} as const;

// =============================================================================
// ANIMATION SYSTEM
// =============================================================================

export const animation = {
  // Durations
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
  },

  // Easing functions
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  // Predefined transitions
  transition: {
    colors: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1), fill 250ms cubic-bezier(0.4, 0, 0.2, 1), stroke 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    shadow: "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    all: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    none: "none",
  },
} as const;

// =============================================================================
// Z-INDEX SYSTEM
// =============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// =============================================================================
// COMPONENT TOKENS
// =============================================================================

export const components = {
  button: {
    padding: {
      sm: "0.5rem 1rem",
      md: "0.625rem 1.25rem",
      lg: "0.75rem 1.5rem",
      xl: "1rem 2rem",
    },
    height: {
      sm: "2rem",
      md: "2.5rem",
      lg: "3rem",
      xl: "3.5rem",
    },
    fontSize: {
      sm: "0.75rem",
      md: "0.875rem",
      lg: "1rem",
      xl: "1.125rem",
    },
  },

  input: {
    height: {
      sm: "2rem",
      md: "2.5rem",
      lg: "3rem",
    },
    padding: {
      sm: "0 0.625rem",
      md: "0 0.75rem",
      lg: "0 1rem",
    },
  },

  card: {
    padding: {
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
    },
  },
} as const;

// =============================================================================
// EXPORT ALL TOKENS
// =============================================================================

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  zIndex,
  breakpoints,
  components,
} as const;

export type DesignTokens = typeof designTokens;
export default designTokens;
