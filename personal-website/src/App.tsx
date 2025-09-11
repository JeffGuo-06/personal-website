import { Router } from './Router';
import { ThemeProvider } from './theme';

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
