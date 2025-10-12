import React, { forwardRef } from 'react';
import classes from './Overlay.module.css';

export type OverlayOpacity = number;
export type OverlayColor = string;
export type OverlayBlur = number;
export type OverlayRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Overlay opacity (0-1) */
  opacity?: OverlayOpacity;
  /** Overlay color */
  color?: OverlayColor;
  /** Overlay background blur */
  blur?: OverlayBlur;
  /** Overlay border radius */
  radius?: OverlayRadius;
  /** Center content */
  center?: boolean;
  /** Fixed positioning */
  fixed?: boolean;
  /** Z-index value */
  zIndex?: number;
  /** Overlay gradient */
  gradient?: string;
  /** Component to render */
  component?: React.ElementType;
  /** Additional props for custom component */
  [key: string]: any;
}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (
    {
      opacity = 0.6,
      color = '#000000',
      blur,
      radius = 0,
      center = false,
      fixed = false,
      zIndex = 200,
      gradient,
      component,
      className,
      style,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || 'div';

    const classNames = [
      classes.overlay,
      center && classes.center,
      fixed && classes.fixed,
      radius && classes[`radius-${radius}`],
      blur && classes.blur,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inlineStyles: React.CSSProperties = {
      zIndex,
      ...style,
    };

    // Handle gradient background
    if (gradient) {
      inlineStyles.background = gradient;
    } else {
      // Handle solid color background
      if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl')) {
        // Use provided color with opacity
        if (color.startsWith('#')) {
          // Convert hex to rgba
          const hex = color.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          inlineStyles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        } else if (color.includes('rgba')) {
          // Already has alpha, use as-is but apply opacity
          inlineStyles.backgroundColor = color;
          inlineStyles.opacity = opacity;
        } else {
          inlineStyles.backgroundColor = color;
          inlineStyles.opacity = opacity;
        }
      } else {
        // Use CSS custom property or named color
        inlineStyles.backgroundColor = color;
        inlineStyles.opacity = opacity;
      }
    }

    // Handle blur effect
    if (blur) {
      inlineStyles.backdropFilter = `blur(${blur}px)`;
      inlineStyles.WebkitBackdropFilter = `blur(${blur}px)`;
    }

    const overlayProps = {
      className: classNames,
      style: inlineStyles,
      ref,
      ...others,
    };

    return <Component {...overlayProps}>{children}</Component>;
  }
);

Overlay.displayName = 'Overlay';
