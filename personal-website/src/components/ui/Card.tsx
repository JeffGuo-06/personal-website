import React, { forwardRef } from 'react';
import classes from './Card.module.css';

export type CardPadding = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type CardRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type CardShadow = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card padding */
  p?: CardPadding;
  /** Card padding (alias for p) */
  padding?: CardPadding;
  /** Card border radius */
  radius?: CardRadius;
  /** Card shadow */
  shadow?: CardShadow;
  /** Remove card shadow */
  withBorder?: boolean;
  /** Component to render */
  component?: React.ElementType;
  /** Additional props for custom component */
  [key: string]: any;
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove padding from section */
  withBorder?: boolean;
  /** Inherit card padding */
  inheritPadding?: boolean;
  /** Section padding */
  p?: CardPadding;
  /** Section padding (alias for p) */
  padding?: CardPadding;
  /** Component to render */
  component?: React.ElementType;
  /** Additional props for custom component */
  [key: string]: any;
}

const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
  (
    {
      withBorder = false,
      inheritPadding = false,
      p,
      padding,
      component,
      className,
      style,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || 'div';

    const sectionPadding = p || padding;

    const classNames = [
      classes.section,
      withBorder && classes.sectionWithBorder,
      inheritPadding && classes.inheritPadding,
      sectionPadding && classes[`padding-${sectionPadding}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const sectionProps = {
      className: classNames,
      style,
      ref,
      ...others,
    };

    return <Component {...sectionProps}>{children}</Component>;
  }
);

CardSection.displayName = 'Card.Section';

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      p = 'md',
      padding,
      radius = 'md',
      shadow = 'sm',
      withBorder = false,
      component,
      className,
      style,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || 'div';

    const cardPadding = padding || p;

    const classNames = [
      classes.card,
      classes[`padding-${cardPadding}`],
      classes[`radius-${radius}`],
      shadow && classes[`shadow-${shadow}`],
      withBorder && classes.withBorder,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const cardProps = {
      className: classNames,
      style,
      ref,
      ...others,
    };

    return <Component {...cardProps}>{children}</Component>;
  }
);

Card.displayName = 'Card';

// Attach Section as a static property with proper typing
type CardComponent = typeof Card & {
  Section: typeof CardSection;
};

const CardWithSection = Card as CardComponent;
CardWithSection.Section = CardSection;

export { CardWithSection as Card, CardSection };
