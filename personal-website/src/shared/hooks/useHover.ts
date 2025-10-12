import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseHoverReturn<T extends HTMLElement = HTMLElement> {
  hovered: boolean;
  ref: React.RefObject<T>;
}

/**
 * Custom hook to manage hover state on an element with improved TypeScript support and performance
 *
 * @template T - The type of HTML element to track hover on
 * @returns Object containing hovered state and ref to attach to the element
 */
export function useHover<T extends HTMLElement = HTMLElement>(): UseHoverReturn<T> {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add event listeners
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  // Reset hover state if ref changes
  useEffect(() => {
    if (!ref.current) {
      setHovered(false);
    }
  }, [ref.current]);

  return { hovered, ref };
}
