'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { AnimatedNumber } from '@/shared/ui/animated-number';
import { StaggerGroup } from '@/shared/ui/stagger-group';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

interface StatCardData {
  label: string;
  value: number;
  formatter: (n: number) => string;
  trend: 'up' | 'down';
  trendValue: string;
  footerTitle: string;
  footerDescription: string;
}

const statCardsData: StatCardData[] = [
  {
    label: 'Total Revenue',
    value: 1250,
    formatter: (n: number) =>
      `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    trend: 'up',
    trendValue: '+12.5%',
    footerTitle: 'Trending up this month',
    footerDescription: 'Visitors for the last 6 months'
  },
  {
    label: 'New Customers',
    value: 1234,
    formatter: (n: number) => Math.round(n).toLocaleString(),
    trend: 'down',
    trendValue: '-20%',
    footerTitle: 'Down 20% this period',
    footerDescription: 'Acquisition needs attention'
  },
  {
    label: 'Active Accounts',
    value: 45678,
    formatter: (n: number) => Math.round(n).toLocaleString(),
    trend: 'up',
    trendValue: '+12.5%',
    footerTitle: 'Strong user retention',
    footerDescription: 'Engagement exceed targets'
  },
  {
    label: 'Growth Rate',
    value: 4.5,
    formatter: (n: number) => `${n.toFixed(1)}%`,
    trend: 'up',
    trendValue: '+4.5%',
    footerTitle: 'Steady performance increase',
    footerDescription: 'Meets growth projections'
  }
];

export function StatCards() {
  return (
    <StaggerGroup
      className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'
      staggerDelay={0.08}
    >
      {statCardsData.map((card) => {
        const TrendIcon =
          card.trend === 'up' ? IconTrendingUp : IconTrendingDown;
        const badgeVariant =
          card.trend === 'up' ? 'success-outline' : 'warning-outline';

        return (
          <Card
            key={card.label}
            className='@container/card transition-shadow duration-200 hover:shadow-[inset_0_1px_8px_hsl(var(--primary)/0.06)]'
          >
            <CardHeader>
              <CardDescription>{card.label}</CardDescription>
              <CardTitle className='font-kpi text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                <AnimatedNumber value={card.value} formatter={card.formatter} />
              </CardTitle>
              <CardAction>
                <Badge
                  variant={
                    badgeVariant as 'success-outline' | 'warning-outline'
                  }
                >
                  <TrendIcon />
                  {card.trendValue}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {card.footerTitle} <TrendIcon className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                {card.footerDescription}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </StaggerGroup>
  );
}
