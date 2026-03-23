'use client';

import { useMemo } from 'react';
import type { NavItem } from '@/shared/types';

/**
 * Hook to filter navigation items based on access control
 */
export function useFilteredNavItems(items: NavItem[]) {
  const filteredItems = useMemo(() => {
    return items
      .map((item) => {
        if (item.items && item.items.length > 0) {
          return {
            ...item,
            items: item.items.filter(
              (childItem) => !childItem.access?.requireOrg
            )
          };
        }
        return item;
      })
      .filter((item) => !item.access?.requireOrg);
  }, [items]);

  return filteredItems;
}
