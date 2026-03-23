'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/shared/lib/utils';

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  initialY?: number;
}

export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.08,
  duration = 0.4,
  initialY = 16
}: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const items = React.Children.toArray(children);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {items.map((child, index) => (
        <motion.div
          key={React.isValidElement(child) ? child.key : index}
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
