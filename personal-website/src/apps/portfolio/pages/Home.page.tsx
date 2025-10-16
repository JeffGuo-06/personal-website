import React from 'react';
import { Container } from '@/shared/components/layout/Container';
import { Stack } from '@/shared/components/layout/Stack';
import { Education } from '../components/Education/Education';
import { Header } from '../components/Header/Header';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Projects } from '../components/Projects/Projects';

export function HomePage() {
  return (
    <div
      style={{
        background: '#1a1a1a',
        minHeight: '100vh',
        // @ts-ignore
        '--theme-bg': '#1a1a1a',
        '--theme-bg-rgb': '26, 26, 26',
        '--theme-text': '#f8f9fa',
        '--theme-text-secondary': '#e9ecef',
      }}
    >
      <Header />
      <Container size="md">
        <Stack align="stretch" justify="flex-start" gap="xl">
          <Portfolio />
          {/* <Projects /> */}
          {/* <Education /> */}
        </Stack>
      </Container>
    </div>
  );
}
