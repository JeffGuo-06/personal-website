import React, { forwardRef } from 'react';
import classes from './Badge.module.css';

export type BadgeVariant = 'filled' | 'light' | 'outline' | 'dot' | 'gradient';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'violet';
export type BadgeRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Badge color */
  color?: BadgeColor;
  /** Badge border radius */
  radius?: BadgeRadius;
  /** Full width badge */
  fullWidth?: boolean;
  /** Left section content */
  leftSection?: React.ReactNode;
  /** Right section content */
  rightSection?: React.ReactNode;
  /** Circle badge */
  circle?: boolean;
  /** Component to render */
  component?: React.ElementType;
  /** Gradient configuration for gradient variant */
  gradient?: { from: string; to: string; deg?: number };
  /** Additional props for custom component */
  [key: string]: any;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      color = 'primary',
      radius = 'xl',
      fullWidth = false,
      leftSection,
      rightSection,
      circle = false,
      component,
      gradient,
      className,
      style,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || 'div';

    const classNames = [
      classes.badge,
      classes[variant],
      classes[size],
      classes[`color-${color}`],
      classes[`radius-${radius}`],
      fullWidth && classes.fullWidth,
      circle && classes.circle,
      (leftSection || rightSection) && classes.withSections,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inlineStyles: React.CSSProperties = {
      ...style,
    };

    if (variant === 'gradient' && gradient) {
      inlineStyles.background = `linear-gradient(${gradient.deg || 45}deg, ${gradient.from}, ${gradient.to})`;
    }

    const badgeProps = {
      className: classNames,
      style: inlineStyles,
      ref,
      ...others,
    };

    return (
      <Component {...badgeProps}>
        {leftSection && (
          <span className={classes.section} data-position="left">
            {leftSection}
          </span>
        )}
        {children && <span className={classes.inner}>{children}</span>}
        {rightSection && (
          <span className={classes.section} data-position="right">
            {rightSection}
          </span>
        )}
      </Component>
    );
  }
);

Badge.displayName = 'Badge';
