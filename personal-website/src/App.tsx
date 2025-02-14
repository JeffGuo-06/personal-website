import '@mantine/core/styles.css';

import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <>
      <title>My Custom Website Title</title>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </>
  );
}
