import { Box, Button, Flex } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import './Header.css';

export function Header() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: 'var(--mantine-spacing-xs)',
        height: 60,
        zIndex: 1,
        transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
        transition: 'transform 400ms ease',
        backgroundColor: 'gray',
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderColor: 'gray',
      }}
    >
      <Flex mih={50} gap="xs" justify="flex-end" align="center" direction="row" wrap="nowrap">
        <Button variant="transparent" color="light-dark">
          Home
        </Button>
        <Button variant="transparent" color="light-dark">
          About Me
        </Button>
        <Button variant="transparent" color="light-dark">
          Projects
        </Button>
      </Flex>
    </Box>
  );
}
