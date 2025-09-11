import { useEffect, useState } from 'react';

export interface ViewportSize {
  width: number;
  height: number;
}

/**
 * Custom hook to track viewport dimensions
 * Useful for responsive design and conditional rendering
 *
 * @returns Object containing current viewport width and height
 */
export function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Set initial size
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
