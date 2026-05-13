import { useState, useEffect } from 'react';
import { fetchInstagramMedia, type InstagramMedia } from '../lib/instagram';

export function useInstagramData() {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchInstagramMedia();
        if (!cancelled) {
          setMedia(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load Instagram data');
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { media, loading, error };
}
