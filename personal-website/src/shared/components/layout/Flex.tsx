import React from 'react';
import styles from './Flex.module.css';

export interface FlexProps {
  /** Flex content */
  children: React.ReactNode;
  /** Flex direction */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Gap between items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Align items */
  align?: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
  /** Justify content */
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /** Flex wrap */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  gap = 'md',
  align = 'center',
  justify = 'flex-start',
  wrap = 'nowrap',
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
      className={`${styles.flex} ${className}`}
      style={{
        flexDirection: direction,
        gap: getGap(),
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
