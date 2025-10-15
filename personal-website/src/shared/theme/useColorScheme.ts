import { useCallback, useEffect, useState } from 'react';

export type ColorScheme = 'light' | 'dark';

interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  computedColorScheme: 'light' | 'dark';
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

const STORAGE_KEY = 'theme-color-scheme';

function getStoredColorScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['light', 'dark'].includes(stored)) {
      return stored as ColorScheme;
    }
  } catch (error) {
    console.warn('Failed to read color scheme from localStorage:', error);
  }

  return 'dark'; // Default to dark mode
}

function setStoredColorScheme(scheme: ColorScheme): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, scheme);
  } catch (error) {
    console.warn('Failed to store color scheme in localStorage:', error);
  }
}

export function useColorScheme(): ColorSchemeContextValue {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(getStoredColorScheme);

  // Compute the actual color scheme to use (always use the explicit setting)
  const computedColorScheme: 'light' | 'dark' = colorScheme;

  // Update DOM attribute when computed color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.documentElement.setAttribute('data-theme', computedColorScheme);
  }, [computedColorScheme]);

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    setStoredColorScheme(scheme);
  }, []);

  const toggleColorScheme = useCallback(() => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  }, [colorScheme, setColorScheme]);

  return {
    colorScheme,
    computedColorScheme,
    setColorScheme,
    toggleColorScheme,
  };
}

