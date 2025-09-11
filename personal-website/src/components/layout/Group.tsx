import React from 'react';
import styles from './Group.module.css';

export interface GroupProps {
  /** Group content */
  children: React.ReactNode;
  /** Gap between items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Align items vertically */
  align?: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
  /** Justify content horizontally */
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /** Whether items should wrap */
  noWrap?: boolean;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const Group: React.FC<GroupProps> = ({
  children,
  gap = 'md',
  align = 'center',
  justify = 'flex-start',
  noWrap = false,
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
      className={`${styles.group} ${className}`}
      style={{
        gap: getGap(),
        alignItems: align,
        justifyContent: justify,
        flexWrap: noWrap ? 'nowrap' : 'wrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
