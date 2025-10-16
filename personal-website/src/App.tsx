import { Router } from './Router';
import { ThemeProvider } from '@/shared/theme';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
}
