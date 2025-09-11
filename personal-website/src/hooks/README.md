# Custom React Hooks

This directory contains custom React hooks providing TypeScript support, better performance, and clean APIs for common use cases.

## Available Hooks

### useHeadroom

Manages header visibility based on scroll behavior.

```tsx
import { useHeadroom } from '../hooks';

function Header() {
  const pinned = useHeadroom({ fixedAt: 120 });
  
  return (
    <div style={{
      transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
      transition: 'transform 400ms ease'
    }}>
      Header content
    </div>
  );
}
```

**Features:**
- Throttled scroll events for better performance
- Configurable `fixedAt` position
- Smooth transitions

### useHover

Manages hover state on elements.

```tsx
import { useHover } from '../hooks';

function HoverCard() {
  const { hovered, ref } = useHover<HTMLDivElement>();
  
  return (
    <div ref={ref} style={{ opacity: hovered ? 1 : 0.7 }}>
      Hover me!
    </div>
  );
}
```

**Features:**
- TypeScript generics for element type safety
- Automatic cleanup of event listeners
- Performance optimized with useCallback

### useViewportSize

Tracks viewport dimensions for responsive design.

```tsx
import { useViewportSize } from '../hooks';

function ResponsiveComponent() {
  const { width, height } = useViewportSize();
  
  return (
    <div>
      Viewport: {width} x {height}
    </div>
  );
}
```

**Features:**
- Server-side rendering safe
- Automatic resize handling
- Minimal re-renders

### useLocalStorage

Manages localStorage with React state synchronization.

```tsx
import { useLocalStorage } from '../hooks';

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

**Features:**
- Automatic JSON serialization/deserialization
- Cross-tab synchronization
- Error handling for storage failures
- TypeScript support

### useDebounce

Debounces a value to optimize performance for expensive operations.

```tsx
import { useDebounce } from '../hooks';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Perform search when debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### useClickOutside

Detects clicks outside of a specified element.

```tsx
import { useClickOutside } from '../hooks';

function Modal({ onClose }) {
  const ref = useClickOutside<HTMLDivElement>(onClose);
  
  return (
    <div className="modal-overlay">
      <div ref={ref} className="modal-content">
        Modal content
      </div>
    </div>
  );
}
```

## Common Patterns

These hooks cover common React patterns:

- `useHeadroom` for scroll-based header visibility
- `useHover` for hover state management  
- Additional utility hooks for common use cases

## TypeScript Support

All hooks are fully typed with TypeScript, providing:
- Proper type inference
- Generic type parameters where applicable
- Comprehensive JSDoc documentation
- Type-safe return values and parameters