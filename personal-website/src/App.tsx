import { Router } from './Router';
import { ThemeProvider } from '@/shared/theme';

export default function App() {
  return (
    <>
      <title>My Custom Website Title</title>
      <ThemeProvider defaultColorScheme="dark">
        <Router />
      </ThemeProvider>
    </>
  );
}
