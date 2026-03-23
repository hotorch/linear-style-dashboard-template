'use client';

import dynamic from 'next/dynamic';

/**
 * Client-only wrappers for Radix UI components to avoid hydration mismatches.
 * Radix UI generates different IDs on server vs client, causing hydration errors.
 * Using dynamic imports with ssr: false ensures these components only render on client.
 */

export const UserNavClient = dynamic(
  () => import('./user-nav').then((mod) => ({ default: mod.UserNav })),
  { ssr: false }
);

export const ThemeSelectorClient = dynamic(
  () =>
    import('./theme-selector').then((mod) => ({ default: mod.ThemeSelector })),
  { ssr: false }
);

export const ModeToggleClient = dynamic(
  () =>
    import('@/shared/ui/mode-toggle').then((mod) => ({
      default: mod.ModeToggle
    })),
  { ssr: false }
);
