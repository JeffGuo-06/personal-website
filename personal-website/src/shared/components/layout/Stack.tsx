import React from 'react';
import styles from './Stack.module.css';

export interface StackProps {
  /** Stack content */
  children: React.ReactNode;
  /** Gap between items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Align items horizontally */
  align?: 'stretch' | 'flex-start' | 'center' | 'flex-end';
  /** Justify items vertically */
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const Stack: React.FC<StackProps> = ({
  children,
  gap = 'md',
  align = 'stretch',
  justify = 'flex-start',
  className = '',
  style,
}) => {
  const getGap = () => {
    if (typeof gap === 'number') {
      return `${gap}px`;
    }

    const gaps = {
      xs: 'var(--theme-spacing-xs, 4px)',
      sm: 'var(--theme-spacing-sm, 8px)',
      md: 'var(--theme-spacing-md, 16px)',
      lg: 'var(--theme-spacing-lg, 24px)',
      xl: 'var(--theme-spacing-xl, 32px)',
    };

    return gaps[gap];
  };

  return (
    <div
      className={`${styles.stack} ${className}`}
      style={{
        gap: getGap(),
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
