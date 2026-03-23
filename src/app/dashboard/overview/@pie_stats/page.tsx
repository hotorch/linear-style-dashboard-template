import { delay } from '@/shared/config/mock-api';
import { PieGraphDynamic } from '@/features/overview/components/dynamic-charts';

export default async function Stats() {
  await delay(1000);
  return <PieGraphDynamic />;
}
