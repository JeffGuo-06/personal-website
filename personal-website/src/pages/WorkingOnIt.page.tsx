import { Center, Text } from '@mantine/core';
import { Header } from '@/components/Header/Header';

export function WorkingOnIt() {
  return (
    <>
      <Header />
      <Center w="100vw" h="100vh">
        <Text>
          {' '}
          I said I'm working on it <br></br>
          <br></br>
          <br></br> Have some patience
        </Text>
      </Center>
    </>
  );
}
