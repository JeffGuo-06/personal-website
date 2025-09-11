import React from 'react';

import './Header.css';

import { useHeadroom } from '../../hooks';
import { Box } from '../layout/Box';
import { Flex } from '../layout/Flex';
import { Button } from '../ui/Button';

export function Header() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: 'var(--theme-spacing-xs)',
        height: 60,
        zIndex: 1,
        transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
        transition: 'transform 400ms ease',
        backgroundColor: 'var(--theme-bg-secondary)',
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderColor: 'var(--theme-border)',
      }}
    >
      <Flex
        style={{
          minHeight: '50px',
          gap: 'var(--theme-spacing-xs)',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'nowrap',
        }}
      >
        <Button href="./" variant="transparent">
          Home
        </Button>
        <Button variant="transparent">About Me</Button>
        <Button variant="transparent">Projects</Button>
      </Flex>
    </Box>
  );
}
