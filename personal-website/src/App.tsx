import { Router } from './Router';
import { ThemeProvider } from '@/shared/theme';

export default function App() {
  return (
    <>
      <ThemeProvider defaultColorScheme="light">
        <Router />
      </ThemeProvider>
    </>
  );
}
