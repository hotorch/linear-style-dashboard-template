import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon: Icon,
  iconClassName,
  title,
  description,
  action,
  className,
  compact = false
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'py-6' : 'py-12',
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            'bg-muted mb-3 flex items-center justify-center rounded-full',
            compact ? 'h-10 w-10' : 'h-12 w-12'
          )}
        >
          <Icon
            className={cn(
              'text-muted-foreground',
              compact ? 'h-5 w-5' : 'h-6 w-6',
              iconClassName
            )}
          />
        </div>
      )}
      <p className={cn('font-medium', compact ? 'text-sm' : 'text-base')}>
        {title}
      </p>
      {description && (
        <p
          className={cn(
            'text-muted-foreground mt-1',
            compact ? 'text-xs' : 'text-sm'
          )}
        >
          {description}
        </p>
      )}
      {action && (
        <div className='mt-4'>
          {action.href ? (
            <Button variant='outline' size='sm' asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button variant='outline' size='sm' onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
