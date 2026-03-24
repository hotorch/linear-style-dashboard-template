import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query = '(max-width: 768px)') {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  const isOpen = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return { isOpen };
}
