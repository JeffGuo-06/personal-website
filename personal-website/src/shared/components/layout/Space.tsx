import React from 'react';
import styles from './Space.module.css';

export interface SpaceProps {
  /** Space width */
  w?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Space height */
  h?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const Space: React.FC<SpaceProps> = ({ w, h, className = '', style }) => {
  const getSpacing = (value: string | number | undefined) => {
    if (value === undefined) return undefined;

    if (typeof value === 'number') {
      return `${value}px`;
    }

    const spacings = {
      xs: 'var(--theme-spacing-xs, 4px)',
      sm: 'var(--theme-spacing-sm, 8px)',
      md: 'var(--theme-spacing-md, 16px)',
      lg: 'var(--theme-spacing-lg, 24px)',
      xl: 'var(--theme-spacing-xl, 32px)',
    };

    return spacings[value as keyof typeof spacings];
  };

  return (
    <div
      className={`${styles.space} ${className}`}
      style={{
        width: getSpacing(w),
        height: getSpacing(h),
        ...style,
      }}
    />
  );
};
