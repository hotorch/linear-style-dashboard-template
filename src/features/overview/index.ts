// Dynamic (lazy-loaded) chart components - use these for code splitting
export {
  AreaGraphDynamic,
  BarGraphDynamic,
  PieGraphDynamic
} from './components/dynamic-charts';

// Original chart components (static import - larger bundle)
export { AreaGraph } from './components/area-graph';
export { BarGraph } from './components/bar-graph';
export { PieGraph } from './components/pie-graph';

// Skeleton components
export { AreaGraphSkeleton } from './components/area-graph-skeleton';
export { BarGraphSkeleton } from './components/bar-graph-skeleton';
export { PieGraphSkeleton } from './components/pie-graph-skeleton';

// Other components
export { default as Overview } from './components/overview';
export { RecentSales } from './components/recent-sales';
export { RecentSalesSkeleton } from './components/recent-sales-skeleton';
export { ChartGrid } from './components/chart-grid';
export { Greeting } from './components/greeting';
export { StatCards } from './components/stat-cards';
