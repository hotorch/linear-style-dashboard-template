import { delay } from '@/shared/config/mock-api';
import { RecentSales } from '@/features/overview/components/recent-sales';

export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}
