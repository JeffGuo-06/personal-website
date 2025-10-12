import { useCallback, useEffect, useState } from 'react';

export type ColorScheme = 'light' | 'dark' | 'auto';

interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  computedColorScheme: 'light' | 'dark';
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

const STORAGE_KEY = 'theme-color-scheme';

function getSystemColorScheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredColorScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['light', 'dark', 'auto'].includes(stored)) {
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
  const [systemColorScheme, setSystemColorScheme] = useState<'light' | 'dark'>(
    getSystemColorScheme
  );

  // Listen for system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemColorScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Compute the actual color scheme to use
  const computedColorScheme: 'light' | 'dark' =
    colorScheme === 'auto' ? systemColorScheme : colorScheme;

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
    if (colorScheme === 'light') {
      setColorScheme('dark');
    } else if (colorScheme === 'dark') {
      setColorScheme('auto');
    } else {
      setColorScheme('light');
    }
  }, [colorScheme, setColorScheme]);

  return {
    colorScheme,
    computedColorScheme,
    setColorScheme,
    toggleColorScheme,
  };
}

