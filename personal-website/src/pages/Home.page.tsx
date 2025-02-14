import { useEffect } from 'react';
import { Button, Container, Stack } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { Intro } from '@/components/Intro/Intro';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Education } from '../components/Education/Education';
import { Projects } from '../components/Projects/Projects';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  return (
    <>
      <Header />
      <Container size="md">
        <Stack align="stretch" justify="flex-start" gap="xl">
          <Intro />
          <Projects />
          <Education />
        </Stack>
      </Container>
    </>
  );
}
