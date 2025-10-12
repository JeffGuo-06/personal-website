import React from 'react';
import { useColorScheme } from '@/shared/theme';
import { Group } from '@/shared/components/layout/Group';
import { Button } from '@/shared/components/ui/Button';

export function ColorSchemeToggle() {
  const { setColorScheme } = useColorScheme();

  return (
    <Group
      style={{
        justifyContent: 'center',
        marginTop: 'var(--theme-spacing-xl)',
        gap: 'var(--theme-spacing-xs)',
      }}
    >
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
    </Group>
  );
}
