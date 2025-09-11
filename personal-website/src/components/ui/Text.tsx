import React, { forwardRef } from 'react';
import classes from './Text.module.css';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type TextDecoration = 'none' | 'underline' | 'line-through';
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'dimmed'
  | 'bright';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Text size */
  size?: TextSize;
  /** Font weight */
  fw?: TextWeight;
  /** Text weight (alias for fw) */
  weight?: TextWeight;
  /** Text alignment */
  ta?: TextAlign;
  /** Text alignment (alias for ta) */
  align?: TextAlign;
  /** Text transform */
  tt?: TextTransform;
  /** Text transform (alias for tt) */
  transform?: TextTransform;
  /** Text decoration */
  td?: TextDecoration;
  /** Text decoration (alias for td) */
  decoration?: TextDecoration;
  /** Text color */
  c?: TextColor;
  /** Text color (alias for c) */
  color?: TextColor;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Line clamp for multi-line truncation */
  lineClamp?: number;
  /** Span text to take full width */
  span?: boolean;
  /** Inherit color from parent */
  inherit?: boolean;
  /** Component to render */
  component?: React.ElementType;
  /** Gradient text */
  gradient?: { from: string; to: string; deg?: number };
  /** Additional props for custom component */
  [key: string]: any;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      size = 'md',
      fw,
      weight,
      ta,
      align,
      tt,
      transform,
      td,
      decoration,
      c,
      color,
      truncate = false,
      lineClamp,
      span = false,
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
    const Component = component || (span ? 'span' : 'div');

    const fontWeight = fw || weight;
    const textAlign = ta || align;
    const textTransform = tt || transform;
    const textDecoration = td || decoration;
    const textColor = c || color;

    const classNames = [
      classes.text,
      classes[size],
      fontWeight && classes[`weight-${fontWeight}`],
      textAlign && classes[`align-${textAlign}`],
      textTransform && classes[`transform-${textTransform}`],
      textDecoration && classes[`decoration-${textDecoration}`],
      textColor && classes[`color-${textColor}`],
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

    const textProps = {
      className: classNames,
      style: inlineStyles,
      ref,
      ...others,
    };

    return <Component {...textProps}>{children}</Component>;
  }
);

Text.displayName = 'Text';
