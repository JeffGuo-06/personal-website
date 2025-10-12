import React from 'react';
import { Anchor } from '@/shared/components/ui/Anchor';
import { Text } from '@/shared/components/ui/Text';
import { Title } from '@/shared/components/ui/Title';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} style={{ textAlign: 'center', marginTop: '100px' }}>
        Welcome to{' '}
        <Text
          component="span"
          style={{
            background: 'linear-gradient(45deg, #f06595, #fab005)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Custom Theme
        </Text>
      </Title>
      <Text
        style={{
          color: 'var(--theme-text-secondary)',
          textAlign: 'center',
          fontSize: 'var(--theme-font-size-lg)',
          maxWidth: '580px',
          margin: '0 auto',
          marginTop: 'var(--theme-spacing-xl)',
          display: 'block',
        }}
      >
        This project now uses a custom theme system with CSS custom properties for colors, spacing,
        and breakpoints. The theme supports light/dark mode switching and uses{' '}
        <Anchor href="https://fonts.google.com/specimen/Verdana">Verdana for body text</Anchor> and{' '}
        <Anchor href="https://fonts.google.com/specimen/Poppins">Poppins for headings</Anchor>. To
        get started, explore the src/theme directory.
      </Text>
    </>
  );
}
