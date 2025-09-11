import React from 'react';
import { Header } from '@/components/Header/Header';
import { Center } from '../components/layout/Center';
import { Text } from '../components/ui/Text';

export function WorkingOnIt() {
  return (
    <>
      <Header />
      <Center style={{ width: '100vw', height: '100vh' }}>
        <Text size="lg" ta="center" style={{ lineHeight: 1.6 }}>
          {' '}
          I said I'm working on it <br />
          <br />
          <br /> Have some patience
        </Text>
      </Center>
    </>
  );
}
