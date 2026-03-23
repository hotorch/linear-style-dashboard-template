'use client';

/**
 * Dynamic imports for chart components
 *
 * Recharts is a heavy library (~234KB). These dynamic wrappers ensure
 * the charts are only loaded when needed, reducing initial bundle size.
 */

import dynamic from 'next/dynamic';
import { AreaGraphSkeleton } from './area-graph-skeleton';
import { BarGraphSkeleton } from './bar-graph-skeleton';
import { PieGraphSkeleton } from './pie-graph-skeleton';

export const AreaGraphDynamic = dynamic(
  () => import('./area-graph').then((mod) => mod.AreaGraph),
  {
    loading: () => <AreaGraphSkeleton />,
    ssr: false
  }
);

export const BarGraphDynamic = dynamic(
  () => import('./bar-graph').then((mod) => mod.BarGraph),
  {
    loading: () => <BarGraphSkeleton />,
    ssr: false
  }
);

export const PieGraphDynamic = dynamic(
  () => import('./pie-graph').then((mod) => mod.PieGraph),
  {
    loading: () => <PieGraphSkeleton />,
    ssr: false
  }
);
