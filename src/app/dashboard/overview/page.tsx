import { Suspense } from 'react';
import { PageContainer } from '@/widgets/app-shell';
import { delay } from '@/shared/config/mock-api';
import {
  Greeting,
  StatCards,
  ChartGrid,
  BarGraphDynamic,
  BarGraphSkeleton,
  RecentSales,
  RecentSalesSkeleton,
  AreaGraphDynamic,
  AreaGraphSkeleton,
  PieGraphDynamic,
  PieGraphSkeleton
} from '@/features/overview';

async function BarStats() {
  await delay(1000);
  return <BarGraphDynamic />;
}

async function Sales() {
  await delay(3000);
  return <RecentSales />;
}

async function AreaStats() {
  await delay(2000);
  return <AreaGraphDynamic />;
}

async function PieStats() {
  await delay(1000);
  return <PieGraphDynamic />;
}

export default function OverviewPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <Greeting />
        </div>

        <StatCards />

        <ChartGrid>
          <div className='col-span-4'>
            <Suspense fallback={<BarGraphSkeleton />}>
              <BarStats />
            </Suspense>
          </div>
          <div className='col-span-4 md:col-span-3'>
            <Suspense fallback={<RecentSalesSkeleton />}>
              <Sales />
            </Suspense>
          </div>
          <div className='col-span-4'>
            <Suspense fallback={<AreaGraphSkeleton />}>
              <AreaStats />
            </Suspense>
          </div>
          <div className='col-span-4 md:col-span-3'>
            <Suspense fallback={<PieGraphSkeleton />}>
              <PieStats />
            </Suspense>
          </div>
        </ChartGrid>
      </div>
    </PageContainer>
  );
}
