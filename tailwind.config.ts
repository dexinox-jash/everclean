import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============================================================================
      // COLOR SYSTEM - Quiet Luxury 2025
      // ============================================================================
      colors: {
        // Navy scale
        navy: {
          900: "#0D1117",
          800: "#171923",
          700: "#1A202C",
          600: "#2D3748",
          500: "#4A5568",
        },
        // Champagne Gold scale
        gold: {
          600: "#B8974F",
          500: "#C9A962",
          400: "#E3C28A",
          300: "#F0D9A8",
          200: "#F5E9C8",
        },
        // Ivory neutrals
        ivory: "#FAF9F6",
        cream: "#F5F4F0",
        // Accent colors
        terracotta: "#A67C52",
        sage: "#8A9A87",
        // Shadcn/ui compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // ============================================================================
      // TYPOGRAPHY
      // ============================================================================
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Custom scale for luxury feel
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      // ============================================================================
      // SPACING
      // ============================================================================
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        layout: "1400px",
        prose: "65ch",
      },
      // ============================================================================
      // ANIMATION
      // ============================================================================
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.23, 1, 0.32, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        dramatic: "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      // ============================================================================
      // BORDER RADIUS
      // ============================================================================
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // ============================================================================
      // BOX SHADOW
      // ============================================================================
      boxShadow: {
        luxury: "0 4px 6px -1px rgba(26, 32, 44, 0.05), 0 10px 15px -3px rgba(26, 32, 44, 0.08), 0 20px 25px -5px rgba(26, 32, 44, 0.05)",
        "luxury-lg": "0 10px 15px -3px rgba(26, 32, 44, 0.08), 0 20px 30px -5px rgba(26, 32, 44, 0.12), 0 40px 50px -10px rgba(26, 32, 44, 0.08)",
        gold: "0 0 30px rgba(201, 169, 98, 0.3)",
      },
      // ============================================================================
      // BACKGROUND IMAGE
      // ============================================================================
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #E3C28A 0%, #C9A962 50%, #B8974F 100%)",
        "gradient-navy": "linear-gradient(180deg, #1A202C 0%, #0D1117 100%)",
        "gradient-hero": "linear-gradient(180deg, rgba(26, 32, 44, 0.5) 0%, transparent 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
