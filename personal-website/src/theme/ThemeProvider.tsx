import React, { createContext, ReactNode, useContext } from 'react';
import { ColorScheme, useColorScheme } from './useColorScheme';

import './theme.css';

// Theme configuration object
export const theme = {
  colors: {
    primary: [
      'var(--theme-primary-0)',
      'var(--theme-primary-1)',
      'var(--theme-primary-2)',
      'var(--theme-primary-3)',
      'var(--theme-primary-4)',
      'var(--theme-primary-5)',
      'var(--theme-primary-6)',
      'var(--theme-primary-7)',
      'var(--theme-primary-8)',
      'var(--theme-primary-9)',
    ],
    secondary: [
      'var(--theme-secondary-0)',
      'var(--theme-secondary-1)',
      'var(--theme-secondary-2)',
      'var(--theme-secondary-3)',
      'var(--theme-secondary-4)',
      'var(--theme-secondary-5)',
      'var(--theme-secondary-6)',
      'var(--theme-secondary-7)',
      'var(--theme-secondary-8)',
      'var(--theme-secondary-9)',
    ],
    gray: [
      'var(--theme-gray-0)',
      'var(--theme-gray-1)',
      'var(--theme-gray-2)',
      'var(--theme-gray-3)',
      'var(--theme-gray-4)',
      'var(--theme-gray-5)',
      'var(--theme-gray-6)',
      'var(--theme-gray-7)',
      'var(--theme-gray-8)',
      'var(--theme-gray-9)',
    ],
    white: 'var(--theme-white)',
    black: 'var(--theme-black)',
  },
  spacing: {
    xs: 'var(--theme-spacing-xs)',
    sm: 'var(--theme-spacing-sm)',
    md: 'var(--theme-spacing-md)',
    lg: 'var(--theme-spacing-lg)',
    xl: 'var(--theme-spacing-xl)',
  },
  fontSizes: {
    xs: 'var(--theme-font-size-xs)',
    sm: 'var(--theme-font-size-sm)',
    md: 'var(--theme-font-size-md)',
    lg: 'var(--theme-font-size-lg)',
    xl: 'var(--theme-font-size-xl)',
  },
  fontFamily: 'var(--theme-font-family-body)',
  headings: {
    fontFamily: 'var(--theme-font-family-heading)',
    fontWeight: '900',
  },
  breakpoints: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1400px',
  },
  radius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '32px',
  },
  shadows: {
    xs: '0 1px 3px var(--theme-shadow)',
    sm: '0 1px 3px var(--theme-shadow), 0 1px 2px var(--theme-shadow)',
    md: '0 4px 6px -1px var(--theme-shadow), 0 2px 4px -1px var(--theme-shadow)',
    lg: '0 10px 15px -3px var(--theme-shadow), 0 4px 6px -2px var(--theme-shadow)',
    xl: '0 20px 25px -5px var(--theme-shadow), 0 10px 10px -5px var(--theme-shadow)',
  },
};

export interface ThemeContextValue {
  theme: typeof theme;
  colorScheme: ColorScheme;
  computedColorScheme: 'light' | 'dark';
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultColorScheme?: ColorScheme;
}

export function ThemeProvider({ children, defaultColorScheme = 'dark' }: ThemeProviderProps) {
  const colorSchemeHook = useColorScheme();

  // Apply default color scheme on initial load
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedScheme = localStorage.getItem('theme-color-scheme');
      if (!storedScheme) {
        colorSchemeHook.setColorScheme(defaultColorScheme);
      }
    }
  }, [defaultColorScheme, colorSchemeHook]);

  const contextValue: ThemeContextValue = {
    theme,
    ...colorSchemeHook,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}


// Helper function to get CSS variable values
export function getCSSVariable(variable: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Helper function to create responsive styles
export function createStyles<T extends Record<string, any>>(
  stylesFn: (themeObj: typeof theme) => T
): T {
  return stylesFn(theme);
}

// Utility function for conditional classes
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
