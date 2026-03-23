import { PageContainer } from '@/widgets/app-shell';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';
import { BadgeCheck } from 'lucide-react';

export default function ExclusivePage() {
  return (
    <PageContainer>
      <div className='space-y-6'>
        <div>
          <h1 className='flex items-center gap-2 text-3xl font-bold tracking-tight'>
            <BadgeCheck className='h-7 w-7 text-green-600' />
            Exclusive Area
          </h1>
          <p className='text-muted-foreground'>
            This page contains exclusive features for premium users.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to the Exclusive Page</CardTitle>
            <CardDescription>
              This is a placeholder for premium features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-lg'>
              Add your exclusive content and features here.
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
