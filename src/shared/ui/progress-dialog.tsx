'use client';

/**
 * ProgressDialog Component
 *
 * A modal dialog for showing progress of long-running operations.
 * Supports both simple progress and multi-step progress with tqdm-style counts.
 */

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/shared/lib/utils';
import { Progress } from './progress';
import { IconCheck, IconX, IconCircleDashed } from '@tabler/icons-react';

export type ProgressStatus = 'idle' | 'loading' | 'success' | 'error';

export type StepStatus = 'pending' | 'active' | 'completed' | 'error';

export interface ProgressStep {
  id: string;
  label: string;
  status: StepStatus;
  current?: number;
  total?: number;
  message?: string;
}

export interface ProgressDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  status: ProgressStatus;
  message?: string;
  progress?: number; // 0-100, undefined for indeterminate
  /** Current count for tqdm-style display (e.g., 45) */
  current?: number;
  /** Total count for tqdm-style display (e.g., 466) */
  total?: number;
  /** Multi-step progress */
  steps?: ProgressStep[];
  onClose?: () => void;
}

function StepIcon({ status }: { status: StepStatus }) {
  switch (status) {
    case 'completed':
      return (
        <IconCheck className='h-4 w-4 text-green-600 dark:text-green-400' />
      );
    case 'active':
      return (
        <div className='border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent' />
      );
    case 'error':
      return <IconX className='h-4 w-4 text-red-600 dark:text-red-400' />;
    default:
      return <IconCircleDashed className='text-muted-foreground h-4 w-4' />;
  }
}

function StepItem({ step }: { step: ProgressStep }) {
  const hasCount = step.current !== undefined && step.total !== undefined;
  const percentage = hasCount
    ? Math.round((step.current! / step.total!) * 100)
    : undefined;

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <StepIcon status={step.status} />
          <span
            className={cn(
              'text-sm',
              step.status === 'active' && 'font-medium',
              step.status === 'completed' && 'text-muted-foreground',
              step.status === 'pending' && 'text-muted-foreground'
            )}
          >
            {step.label}
          </span>
        </div>
        {hasCount && step.status === 'active' && (
          <span className='text-muted-foreground font-mono text-xs'>
            {step.current}/{step.total}
          </span>
        )}
        {step.status === 'completed' && (
          <span className='text-muted-foreground text-xs'>done</span>
        )}
      </div>

      {/* Progress bar for active step with count */}
      {step.status === 'active' && hasCount && (
        <div className='ml-6'>
          <Progress value={percentage} className='h-1.5' />
          {step.message && (
            <p className='text-muted-foreground mt-1 text-xs'>{step.message}</p>
          )}
        </div>
      )}

      {/* Indeterminate progress for active step without count */}
      {step.status === 'active' && !hasCount && (
        <div className='ml-6'>
          <div className='bg-primary/20 relative h-1.5 w-full overflow-hidden rounded-full'>
            <div className='bg-primary absolute h-full w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite] rounded-full' />
          </div>
          {step.message && (
            <p className='text-muted-foreground mt-1 text-xs'>{step.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function ProgressDialog({
  open,
  onOpenChange,
  title,
  status,
  message,
  progress,
  current,
  total,
  steps,
  onClose
}: ProgressDialogProps) {
  const isCompleted = status === 'success' || status === 'error';
  const hasSteps = steps && steps.length > 0;
  const hasCount = current !== undefined && total !== undefined;
  const percentage =
    progress ?? (hasCount ? Math.round((current / total) * 100) : undefined);

  const handleOpenChange = (newOpen: boolean) => {
    // Only allow closing when completed
    if (!newOpen && isCompleted) {
      onOpenChange?.(false);
      onClose?.();
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/50',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            'bg-background fixed top-[50%] left-[50%] z-50 w-full max-w-md',
            'translate-x-[-50%] translate-y-[-50%] rounded-lg border p-6 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
          )}
          onPointerDownOutside={(e) => {
            if (!isCompleted) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (!isCompleted) {
              e.preventDefault();
            }
          }}
        >
          <div className='flex flex-col gap-4'>
            {/* Header with Icon and Title */}
            <div className='flex items-center gap-3'>
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  status === 'loading' && 'bg-primary/10',
                  status === 'success' && 'bg-green-100 dark:bg-green-900/30',
                  status === 'error' && 'bg-red-100 dark:bg-red-900/30'
                )}
              >
                {status === 'loading' && (
                  <div className='border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent' />
                )}
                {status === 'success' && (
                  <IconCheck className='h-5 w-5 text-green-600 dark:text-green-400' />
                )}
                {status === 'error' && (
                  <IconX className='h-5 w-5 text-red-600 dark:text-red-400' />
                )}
              </div>
              <div className='flex-1'>
                <DialogPrimitive.Title className='text-base font-semibold'>
                  {title}
                </DialogPrimitive.Title>
                {/* Count display for simple mode */}
                {!hasSteps && hasCount && status === 'loading' && (
                  <p className='text-muted-foreground font-mono text-sm'>
                    {current} / {total}
                  </p>
                )}
              </div>
            </div>

            {/* Multi-step progress */}
            {hasSteps && (
              <div className='border-border space-y-3 border-t pt-4'>
                {steps.map((step) => (
                  <StepItem key={step.id} step={step} />
                ))}
              </div>
            )}

            {/* Simple progress bar (when no steps) */}
            {!hasSteps && status === 'loading' && (
              <div className='w-full'>
                {percentage !== undefined ? (
                  <Progress value={percentage} className='h-2' />
                ) : (
                  <div className='bg-primary/20 relative h-2 w-full overflow-hidden rounded-full'>
                    <div className='bg-primary absolute h-full w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite] rounded-full' />
                  </div>
                )}
              </div>
            )}

            {/* Message */}
            {message && (
              <p
                className={cn(
                  'text-sm',
                  status === 'error'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-muted-foreground',
                  hasSteps && 'border-border border-t pt-3'
                )}
              >
                {message}
              </p>
            )}

            {/* Close Button (only when completed) */}
            {isCompleted && (
              <button
                onClick={() => handleOpenChange(false)}
                className={cn(
                  'mt-2 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
              >
                Close
              </button>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
