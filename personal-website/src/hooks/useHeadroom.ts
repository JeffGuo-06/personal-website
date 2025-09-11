import { useCallback, useEffect, useState } from 'react';

export interface UseHeadroomOptions {
  fixedAt?: number;
}

/**
 * Custom hook to manage header visibility based on scroll behavior with improved performance
 *
 * @param options - Configuration options
 * @param options.fixedAt - The scroll position at which the header should start hiding/showing (default: 120)
 * @returns Boolean indicating whether the header should be pinned (visible)
 */
export function useHeadroom({ fixedAt = 120 }: UseHeadroomOptions = {}) {
  const [pinned, setPinned] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.pageYOffset;

    // Always show header when at the top
    if (currentScrollY < fixedAt) {
      setPinned(true);
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down - hide header
      setPinned(false);
    } else {
      // Scrolling up - show header
      setPinned(true);
    }

    setLastScrollY(currentScrollY);
  }, [fixedAt, lastScrollY]);

  useEffect(() => {
    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout;

    const throttledHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 10);
    };

    // Set initial scroll position
    setLastScrollY(window.pageYOffset);

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll]);

  return pinned;
}
