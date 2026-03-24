'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/shared/ui/card';
import { motion, useReducedMotion } from 'motion/react';

const salesData = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
    fallback: 'OM',
    amount: '+$1,999.00'
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
    fallback: 'JL',
    amount: '+$39.00'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
    fallback: 'IN',
    amount: '+$299.00'
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'WK',
    amount: '+$99.00'
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/5.png',
    fallback: 'SD',
    amount: '+$39.00'
  }
];

export function RecentSales() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-0'>
          {salesData.map((sale, index) => {
            const content = (
              <div className='group border-border/20 hover:bg-accent/50 -mx-3 flex cursor-default items-center rounded-lg border-b px-3 py-3 transition-all duration-200 last:border-b-0 hover:translate-x-1 motion-reduce:hover:translate-x-0'>
                <Avatar className='group-hover:ring-primary/20 h-9 w-9 ring-2 ring-transparent transition-all duration-200'>
                  <AvatarImage src={sale.avatar} alt='Avatar' />
                  <AvatarFallback>{sale.fallback}</AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1'>
                  <p className='text-sm leading-none font-medium'>
                    {sale.name}
                  </p>
                  <p className='text-muted-foreground text-sm'>{sale.email}</p>
                </div>
                <div className='ml-auto font-medium text-emerald-600 dark:text-emerald-400'>
                  {sale.amount}
                </div>
              </div>
            );

            if (prefersReducedMotion) {
              return <div key={index}>{content}</div>;
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
