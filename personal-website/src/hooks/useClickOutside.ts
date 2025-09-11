import { useEffect, useRef } from 'react';

/**
 * Custom hook to detect clicks outside of a specified element
 * Useful for modals, dropdowns, and other overlay components
 *
 * @template T - The type of HTML element to track
 * @param handler - Callback function to execute when clicking outside
 * @returns Ref to attach to the element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
}
