import React, { forwardRef } from 'react';
import classes from './Anchor.module.css';

export type AnchorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AnchorWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
export type AnchorColor =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'dimmed'
  | 'bright';
export type AnchorVariant = 'text' | 'subtle' | 'filled' | 'light' | 'outline';

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link href */
  href: string;
  /** Anchor size */
  size?: AnchorSize;
  /** Font weight */
  fw?: AnchorWeight;
  /** Font weight (alias for fw) */
  weight?: AnchorWeight;
  /** Anchor color */
  c?: AnchorColor;
  /** Anchor color (alias for c) */
  color?: AnchorColor;
  /** Anchor variant */
  variant?: AnchorVariant;
  /** Underline behavior */
  underline?: 'always' | 'hover' | 'never';
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Line clamp for multi-line truncation */
  lineClamp?: number;
  /** Inherit color from parent */
  inherit?: boolean;
  /** Component to render */
  component?: React.ElementType;
  /** Gradient text */
  gradient?: { from: string; to: string; deg?: number };
  /** Additional props for custom component */
  [key: string]: any;
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    {
      href,
      size = 'md',
      fw,
      weight,
      c,
      color,
      variant = 'text',
      underline = 'hover',
      truncate = false,
      lineClamp,
      inherit = false,
      component,
      gradient,
      className,
      style,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || 'a';

    const fontWeight = fw || weight;
    const linkColor = c || color;

    const classNames = [
      classes.anchor,
      classes[variant],
      classes[size],
      fontWeight && classes[`weight-${fontWeight}`],
      linkColor && classes[`color-${linkColor}`],
      classes[`underline-${underline}`],
      truncate && classes.truncate,
      lineClamp && classes.lineClamp,
      inherit && classes.inherit,
      gradient && classes.gradient,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inlineStyles: React.CSSProperties = {
      ...style,
    };

    if (lineClamp) {
      (inlineStyles as any)['--line-clamp'] = lineClamp;
    }

    if (gradient) {
      inlineStyles.background = `linear-gradient(${gradient.deg || 45}deg, ${gradient.from}, ${gradient.to})`;
      inlineStyles.WebkitBackgroundClip = 'text';
      inlineStyles.WebkitTextFillColor = 'transparent';
      inlineStyles.backgroundClip = 'text';
    }

    const anchorProps = {
      href,
      className: classNames,
      style: inlineStyles,
      ref,
      ...others,
    };

    return <Component {...anchorProps}>{children}</Component>;
  }
);

Anchor.displayName = 'Anchor';
