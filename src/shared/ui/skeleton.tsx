import { cn } from '@/shared/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn(
        'from-accent via-accent/50 to-accent motion-reduce:bg-accent animate-[shimmer_2s_ease-in-out_infinite] rounded-md bg-gradient-to-r bg-[length:200%_100%] motion-reduce:animate-none',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
