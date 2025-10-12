// Main exports for the custom theme system
export {
  ThemeProvider,
  useTheme,
  theme,
  getCSSVariable,
  createStyles,
  cx,
} from './ThemeProvider';
export { useColorScheme } from './useColorScheme';
export type { ColorScheme } from './useColorScheme';
export type { ThemeContextValue } from './ThemeProvider';

// Re-export theme for backwards compatibility
export { theme as default } from './ThemeProvider';
