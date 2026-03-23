import { delay } from '@/shared/config/mock-api';
import { AreaGraphDynamic } from '@/features/overview/components/dynamic-charts';

export default async function AreaStats() {
  await delay(2000);
  return <AreaGraphDynamic />;
}
