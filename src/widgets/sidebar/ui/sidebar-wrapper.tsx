'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';
import type { Infobar } from '@/shared/ui/infobar';

// Loading fallback for sidebar
function SidebarSkeleton() {
  return (
    <div className='bg-sidebar flex h-full w-[var(--sidebar-width)] flex-col gap-4 border-r p-4'>
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-8 w-3/4' />
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className='h-8 w-full' />
        ))}
      </div>
    </div>
  );
}

// Dynamic imports with ssr: false to prevent Radix UI hydration mismatch
export const AppSidebarClient = dynamic(
  () => import('./app-sidebar').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <SidebarSkeleton />
  }
);

export const InfoSidebarClient = dynamic(
  () => import('./info-sidebar').then((mod) => mod.InfoSidebar),
  {
    ssr: false
  }
) as React.ComponentType<ComponentProps<typeof Infobar>>;
