import React, { forwardRef } from 'react';
import classes from './Button.module.css';

export type ButtonVariant = 'filled' | 'outline' | 'light' | 'subtle' | 'transparent';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'primary' | 'secondary' | 'gray' | 'red' | 'green' | 'blue' | 'yellow';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Button color */
  color?: ButtonColor;
  /** Custom background color */
  bg?: string;
  /** Custom text color */
  c?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Render as different component */
  component?: React.ElementType;
  /** Custom href for link buttons */
  href?: string;
  /** Additional props for custom component */
  [key: string]: any;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      color = 'primary',
      bg,
      c,
      disabled = false,
      loading = false,
      fullWidth = false,
      component,
      href,
      className,
      style,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || (href ? 'a' : 'button');

    const classNames = [
      classes.button,
      classes[variant],
      classes[size],
      classes[`color-${color}`],
      disabled && classes.disabled,
      loading && classes.loading,
      fullWidth && classes.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const customStyles: React.CSSProperties = {
      ...style,
    };

    if (bg) {
      customStyles.backgroundColor = bg;
    }

    if (c) {
      customStyles.color = c;
    }

    const buttonProps = {
      className: classNames,
      style: customStyles,
      disabled: disabled || loading,
      'aria-disabled': disabled || loading,
      href: href,
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

Button.displayName = 'Button';
