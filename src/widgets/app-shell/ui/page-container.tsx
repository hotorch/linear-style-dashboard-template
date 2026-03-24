import React from 'react';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Heading } from '@/shared/ui/heading';
import { Skeleton } from '@/shared/ui/skeleton';
import type { InfobarContent } from '@/shared/ui/infobar';

function PageSkeleton() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:px-6'>
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='mb-2 h-8 w-48' />
          <Skeleton className='h-4 w-72' />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-32 rounded-xl' />
        ))}
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Skeleton className='col-span-4 h-[350px] rounded-xl' />
        <Skeleton className='col-span-3 h-[350px] rounded-xl' />
      </div>
    </div>
  );
}

export default function PageContainer({
  children,
  scrollable = true,
  isloading = false,
  access = true,
  accessFallback,
  pageTitle,
  pageDescription,
  infoContent,
  pageHeaderAction
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  isloading?: boolean;
  access?: boolean;
  accessFallback?: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  infoContent?: InfobarContent;
  pageHeaderAction?: React.ReactNode;
}) {
  if (!access) {
    return (
      <div className='flex flex-1 items-center justify-center p-4 md:px-6'>
        {accessFallback ?? (
          <div className='text-muted-foreground text-center text-lg'>
            You do not have access to this page.
          </div>
        )}
      </div>
    );
  }

  const content = isloading ? <PageSkeleton /> : children;

  return scrollable ? (
    <ScrollArea className='h-[calc(100dvh-52px)]'>
      <div className='dark:bg-dot-pattern flex flex-1 flex-col p-4 md:px-6'>
        <div className='mb-4 flex items-start justify-between'>
          <Heading
            title={pageTitle ?? ''}
            description={pageDescription ?? ''}
            infoContent={infoContent}
          />
          {pageHeaderAction && <div>{pageHeaderAction}</div>}
        </div>
        {content}
      </div>
    </ScrollArea>
  ) : (
    <div className='dark:bg-dot-pattern flex min-w-0 flex-1 flex-col p-4 md:px-6'>
      <div className='mb-4 flex items-start justify-between'>
        <Heading
          title={pageTitle ?? ''}
          description={pageDescription ?? ''}
          infoContent={infoContent}
        />
        {pageHeaderAction && <div>{pageHeaderAction}</div>}
      </div>
      {content}
    </div>
  );
}
