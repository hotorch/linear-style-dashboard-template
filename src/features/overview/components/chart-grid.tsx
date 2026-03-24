'use client';

import { StaggerGroup } from '@/shared/ui/stagger-group';

export function ChartGrid({ children }: { children: React.ReactNode }) {
  return (
    <StaggerGroup
      className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'
      staggerDelay={0.12}
      initialY={24}
    >
      {children}
    </StaggerGroup>
  );
}
