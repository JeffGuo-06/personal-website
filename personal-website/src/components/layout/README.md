# Layout Components

Custom React layout components providing flexible and responsive layout solutions.

## Components

### Container
Responsive container with max-width constraints.

```tsx
import { Container } from './layout';

<Container size="lg">
  <div>Your content here</div>
</Container>

// Fluid container (100% width)
<Container fluid>
  <div>Full width content</div>
</Container>

// Custom size
<Container size={1200}>
  <div>Content with custom max-width</div>
</Container>
```

### Stack
Vertical layout with configurable gap between items.

```tsx
import { Stack } from './layout';

<Stack gap="md" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Flex
Flexible layout container with full control over flex properties.

```tsx
import { Flex } from './layout';

<Flex direction="row" justify="space-between" align="center" gap="lg">
  <div>Left content</div>
  <div>Right content</div>
</Flex>
```

### Group
Horizontal layout with gap (simplified Flex for horizontal layouts).

```tsx
import { Group } from './layout';

<Group gap="sm" justify="flex-end">
  <button>Cancel</button>
  <button>Submit</button>
</Group>
```

### Box
Basic div wrapper with convenient styling props.

```tsx
import { Box } from './layout';

<Box p="md" m="lg" bg="var(--theme-bg-secondary)">
  <div>Content with padding, margin, and background</div>
</Box>

// Custom component type
<Box component="section" p="xl">
  <div>Renders as a section element</div>
</Box>
```

### Center
Component for centering content both horizontally and vertically.

```tsx
import { Center } from './layout';

<Center>
  <div>This content will be centered</div>
</Center>

// Inline centering
<Center inline>
  <span>Inline centered content</span>
</Center>
```

### Space
Spacer component for adding consistent spacing.

```tsx
import { Space } from './layout';

<div>
  <div>Content above</div>
  <Space h="lg" />
  <div>Content below with large gap</div>
</div>

// Horizontal spacing
<div style={{ display: 'flex' }}>
  <div>Left content</div>
  <Space w="md" />
  <div>Right content</div>
</div>
```

## Spacing Values

All components use the following spacing scale:
- `xs`: 4px (var(--theme-spacing-xs))
- `sm`: 8px (var(--theme-spacing-sm))
- `md`: 16px (var(--theme-spacing-md))
- `lg`: 24px (var(--theme-spacing-lg))
- `xl`: 32px (var(--theme-spacing-xl))

You can also use custom numeric values in pixels.

## Container Sizes

Container component supports these predefined sizes:
- `xs`: 576px
- `sm`: 768px
- `md`: 992px
- `lg`: 1200px
- `xl`: 1400px

## CSS Variables

The components use CSS variables from your theme system:
- `--theme-spacing-xs`, `--theme-spacing-sm`, etc. for spacing
- These variables provide fallback values for consistent styling

## Features

These components provide:

- Flexible layout solutions for common patterns
- Responsive design with breakpoint support
- TypeScript support with full type safety
- CSS modules for scoped styling
- Consistent spacing system using CSS custom properties
- Accessibility-focused design

## Design Philosophy

1. Spacing props use string values (`'md'`) or numbers for flexibility
2. CSS modules provide scoped styles and better performance
3. Props are simplified but cover the most common use cases
4. Components are built with accessibility and responsive design in mind