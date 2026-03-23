'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/shared/lib/utils';

const TabsLayoutIdContext = React.createContext<string>('tabs');

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const layoutId = React.useId();
  return (
    <TabsLayoutIdContext.Provider value={layoutId}>
      <TabsPrimitive.List
        data-slot='tabs-list'
        className={cn(
          'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
          className
        )}
        {...props}
      />
    </TabsLayoutIdContext.Provider>
  );
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const layoutId = React.useContext(TabsLayoutIdContext);
  const prefersReducedMotion = useReducedMotion();
  const [isActive, setIsActive] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      setIsActive(el.getAttribute('data-state') === 'active');
    });

    // Check initial state
    setIsActive(el.getAttribute('data-state') === 'active');

    observer.observe(el, {
      attributes: true,
      attributeFilter: ['data-state']
    });
    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot='tabs-trigger'
      className={cn(
        "dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input text-foreground dark:text-muted-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Fallback for reduced motion
        prefersReducedMotion &&
          'data-[state=active]:bg-background data-[state=active]:shadow-sm',
        className
      )}
      {...props}
    >
      {isActive && !prefersReducedMotion && (
        <motion.div
          layoutId={`tab-indicator-${layoutId}`}
          className='bg-background dark:bg-input/30 absolute inset-0 rounded-md shadow-sm'
          style={{ zIndex: -1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      {children}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
