import React, { forwardRef } from 'react';
import classes from './Title.module.css';

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TitleAlign = 'left' | 'center' | 'right' | 'justify';
export type TitleColor =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'dimmed'
  | 'bright';
export type TitleWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level */
  order?: TitleOrder;
  /** Title size - can be responsive size or specific heading size */
  size?: TitleSize;
  /** Font weight */
  fw?: TitleWeight;
  /** Font weight (alias for fw) */
  weight?: TitleWeight;
  /** Text alignment */
  ta?: TitleAlign;
  /** Text alignment (alias for ta) */
  align?: TitleAlign;
  /** Title color */
  c?: TitleColor;
  /** Title color (alias for c) */
  color?: TitleColor;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Line clamp for multi-line truncation */
  lineClamp?: number;
  /** Component to render - overrides order */
  component?: React.ElementType;
  /** Gradient text */
  gradient?: { from: string; to: string; deg?: number };
  /** Additional props for custom component */
  [key: string]: any;
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      order = 1,
      size,
      fw,
      weight,
      ta,
      align,
      c,
      color,
      truncate = false,
      lineClamp,
      component,
      gradient,
      className,
      style,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || `h${order}`;

    const fontWeight = fw || weight;
    const textAlign = ta || align;
    const textColor = c || color;

    // Determine size class - if size is specified, use it, otherwise use default heading size
    const sizeClass = size ? classes[size] : classes[`h${order}`];

    const classNames = [
      classes.title,
      sizeClass,
      fontWeight && classes[`weight-${fontWeight}`],
      textAlign && classes[`align-${textAlign}`],
      textColor && classes[`color-${textColor}`],
      truncate && classes.truncate,
      lineClamp && classes.lineClamp,
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

    const titleProps = {
      className: classNames,
      style: inlineStyles,
      ref,
      ...others,
    };

    return <Component {...titleProps}>{children}</Component>;
  }
);

Title.displayName = 'Title';
