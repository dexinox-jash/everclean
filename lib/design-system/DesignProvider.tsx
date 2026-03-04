"use client";

/**
 * Design System Provider
 * 
 * This component provides design system context and utilities to the application.
 * It handles theme switching, reduced motion preferences, and design system state.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { designTokens, DesignTokens } from "./tokens";

// =============================================================================
// TYPES
// =============================================================================

type Theme = "light" | "dark" | "system";

interface DesignSystemContextType {
  /** Current theme mode */
  theme: Theme;
  /** Whether dark mode is currently active */
  isDark: boolean;
  /** Set the theme mode */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
  /** Whether reduced motion is preferred */
  reducedMotion: boolean;
  /** All design tokens */
  tokens: DesignTokens;
}

interface DesignProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

// =============================================================================
// CONTEXT
// =============================================================================

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

// =============================================================================
// HOOK
// =============================================================================

export function useDesignSystem(): DesignSystemContextType {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error("useDesignSystem must be used within a DesignProvider");
  }
  return context;
}

// =============================================================================
// PROVIDER
// =============================================================================

export function DesignProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: DesignProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isDark, setIsDark] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("everclean-theme") as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const isDarkMode = theme === "system" ? systemDark : theme === "dark";
    setIsDark(isDarkMode);

    // Disable transitions temporarily if requested
    if (disableTransitionOnChange) {
      root.classList.add("transition-none");
      const timeout = setTimeout(() => {
        root.classList.remove("transition-none");
      }, 0);
      return () => clearTimeout(timeout);
    }

    // Apply or remove dark class
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save preference
    localStorage.setItem("everclean-theme", theme);
  }, [theme, mounted, disableTransitionOnChange]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      const root = window.document.documentElement;
      if (e.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  // Set theme handler
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Toggle theme handler
  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "light";
      // If system, check current state and toggle
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemDark ? "light" : "dark";
    });
  };

  const value: DesignSystemContextType = {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    reducedMotion,
    tokens: designTokens,
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}

// =============================================================================
// THEME TOGGLE COMPONENT
// =============================================================================

export function ThemeToggle({
  className,
  variant = "default",
  enableSystem = true,
}: {
  className?: string;
  variant?: "default" | "icon" | "switch";
  enableSystem?: boolean;
}) {
  const { theme, isDark, toggleTheme, setTheme } = useDesignSystem();

  if (variant === "switch") {
    return (
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200
          ${isDark ? "bg-brand-primary-500" : "bg-fg-muted"}
          ${className || ""}
        `}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            transition duration-200
            ${isDark ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        onClick={toggleTheme}
        className={`
          inline-flex items-center justify-center rounded-lg p-2
          text-fg-secondary hover:text-fg-primary hover:bg-bg-tertiary
          transition-colors duration-200
          ${className || ""}
        `}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 24.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className || ""}`}>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="
          appearance-none rounded-lg border border-border-default bg-bg-secondary
          px-3 py-2 pr-8 text-sm text-fg-primary
          focus:border-brand-primary-500 focus:outline-none focus:ring-2 focus:ring-brand-primary-500/20
        "
        aria-label="Select theme"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        {enableSystem && <option value="system">System</option>}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-tertiary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

export default DesignProvider;
