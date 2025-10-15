import React from 'react';

import './Header.css';

import { useHeadroom } from '@/shared/hooks';
import { Box } from '@/shared/components/layout/Box';
import { Flex } from '@/shared/components/layout/Flex';
import { Button } from '@/shared/components/ui/Button';

export function Header() {
  const pinned = useHeadroom({ fixedAt: 120 });

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
        backgroundColor: 'rgba(var(--theme-bg-rgb), 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
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
        <Button variant="transparent" onClick={scrollToProjects}>
          Projects
        </Button>
        <Button href="/fun" variant="transparent">
          the flip side
        </Button>
      </Flex>
    </Box>
  );
}
