import React from 'react';
import { Header } from '../components/Header/Header';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Education } from '../components/Education/Education';
import { Container } from '@/shared/components/layout/Container';
import { Stack } from '@/shared/components/layout/Stack';
import { Projects } from '../components/Projects/Projects';

export function HomePage() {
  return (
    <>
      <Header />
      <Container size="md">
        <Stack align="stretch" justify="flex-start" gap="xl">
          <Portfolio />
          {/* <Projects /> */}
          {/* <Education /> */}
        </Stack>
      </Container>
    </>
  );
}
