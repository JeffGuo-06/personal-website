import React, { forwardRef } from 'react';
import classes from './ActionIcon.module.css';

export type ActionIconVariant =
  | 'filled'
  | 'outline'
  | 'light'
  | 'subtle'
  | 'transparent'
  | 'gradient';
export type ActionIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ActionIconColor =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow';
export type ActionIconRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface ActionIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ActionIcon variant */
  variant?: ActionIconVariant;
  /** ActionIcon size */
  size?: ActionIconSize;
  /** ActionIcon color */
  color?: ActionIconColor;
  /** ActionIcon border radius */
  radius?: ActionIconRadius;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Component to render */
  component?: React.ElementType;
  /** Gradient configuration for gradient variant */
  gradient?: { from: string; to: string; deg?: number };
  /** Additional props for custom component */
  [key: string]: any;
}

export const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (
    {
      variant = 'subtle',
      size = 'md',
      color = 'gray',
      radius = 'sm',
      disabled = false,
      loading = false,
      component,
      gradient,
      className,
      style,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || 'button';

    const classNames = [
      classes.actionIcon,
      classes[variant],
      classes[size],
      classes[`color-${color}`],
      classes[`radius-${radius}`],
      disabled && classes.disabled,
      loading && classes.loading,
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

    const buttonProps = {
      className: classNames,
      style: inlineStyles,
      disabled: disabled || loading,
      'aria-disabled': disabled || loading,
      ref: component ? undefined : ref,
      ...others,
    };

    return (
      <Component {...buttonProps}>
        {loading && <span className={classes.loader} aria-hidden="true" />}
        <span className={loading ? classes.inner : undefined}>{children}</span>
      </Component>
    );
  }
);

ActionIcon.displayName = 'ActionIcon';
