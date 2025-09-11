import React from 'react';
import { Header } from '@/components/Header/Header';
import { Intro } from '@/components/Intro/Intro';
import { Education } from '../components/Education/Education';
import { Container } from '../components/layout/Container';
import { Stack } from '../components/layout/Stack';
import { Projects } from '../components/Projects/Projects';

export function HomePage() {
  return (
    <>
      <Header />
      <Container size="md">
        <Stack align="stretch" justify="flex-start" gap="xl">
          <Intro />
          {/* <Projects /> */}
          {/* <Education /> */}
        </Stack>
      </Container>
    </>
  );
}
