// UI Components Export
// This file exports all custom UI components with modern React patterns
// Each component is built with TypeScript interfaces, CSS modules, and accessibility features
// All components support theming via CSS custom properties

// Button Component - with variants, sizes, disabled state
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonColor } from './Button';

// Text Component - with sizes, weights, colors
export { Text } from './Text';
export type {
  TextProps,
  TextSize,
  TextWeight,
  TextAlign,
  TextTransform,
  TextDecoration,
  TextColor,
} from './Text';

// Title Component - heading component with levels (h1-h6)
export { Title } from './Title';
export type {
  TitleProps,
  TitleOrder,
  TitleSize,
  TitleAlign,
  TitleColor,
  TitleWeight,
} from './Title';

// Card Component - container with padding and shadow, includes Section subcomponent
export { Card } from './Card';
export type { CardProps, CardSectionProps, CardPadding, CardRadius, CardShadow } from './Card';

// Image Component - responsive image with loading states
export { Image } from './Image';
export type { ImageProps, ImageFit, ImageRadius } from './Image';

// Badge Component - small label component
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeColor, BadgeRadius } from './Badge';

// ActionIcon Component - icon button
export { ActionIcon } from './ActionIcon';
export type {
  ActionIconProps,
  ActionIconVariant,
  ActionIconSize,
  ActionIconColor,
  ActionIconRadius,
} from './ActionIcon';

// Anchor Component - styled link component
export { Anchor } from './Anchor';
export type { AnchorProps, AnchorSize, AnchorWeight, AnchorColor, AnchorVariant } from './Anchor';

// Overlay Component - overlay/backdrop component
export { Overlay } from './Overlay';
export type {
  OverlayProps,
  OverlayOpacity,
  OverlayColor,
  OverlayBlur,
  OverlayRadius,
} from './Overlay';

// Note: All components are exported individually for optimal tree-shaking
// Import only the components you need:
// import { Button, Text, Title } from '@/components/ui';
