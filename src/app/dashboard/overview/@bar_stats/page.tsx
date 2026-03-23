import { delay } from '@/shared/config/mock-api';
import { BarGraphDynamic } from '@/features/overview/components/dynamic-charts';

export default async function BarStats() {
  await delay(1000);
  return <BarGraphDynamic />;
}
