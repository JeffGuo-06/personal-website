import React from 'react';

import './Header.css';

import { Box } from '@/shared/components/layout/Box';
import { Flex } from '@/shared/components/layout/Flex';
import { Button } from '@/shared/components/ui/Button';

export function Header() {
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
        backgroundColor: 'rgba(70, 70, 70, 0.010)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
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
        <Button href="/fun" variant="transparent">
          the flip side
        </Button>
      </Flex>
    </Box>
  );
}
