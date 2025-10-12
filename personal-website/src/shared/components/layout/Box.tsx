import React from 'react';
import styles from './Box.module.css';

export interface BoxProps {
  /** Box content */
  children?: React.ReactNode;
  /** Padding */
  p?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Margin */
  m?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Background color */
  bg?: string;
  /** Width */
  w?: string | number;
  /** Height */
  h?: string | number;
  /** HTML element to render */
  component?: keyof JSX.IntrinsicElements;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Other HTML attributes */
  [key: string]: any;
}

export const Box: React.FC<BoxProps> = ({
  children,
  p,
  m,
  bg,
  w,
  h,
  component = 'div',
  className = '',
  style,
  ...others
}) => {
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

  const getSize = (value: string | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  const Component = component;

  return (
    <Component
      className={`${styles.box} ${className}`}
      style={{
        padding: getSpacing(p),
        margin: getSpacing(m),
        backgroundColor: bg,
        width: getSize(w),
        height: getSize(h),
        ...style,
      }}
      {...others}
    >
      {children}
    </Component>
  );
};
