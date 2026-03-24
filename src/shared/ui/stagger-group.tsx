'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';

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
      {items.map((child, index) => {
        // Forward child's className to motion.div so grid/flex item classes work
        const childClassName = React.isValidElement<{ className?: string }>(
          child
        )
          ? child.props.className
          : undefined;

        return (
          <motion.div
            key={React.isValidElement(child) ? child.key : index}
            className={childClassName}
            initial={{ opacity: 0, y: initialY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration,
              delay: index * staggerDelay,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
          >
            {React.isValidElement<{ className?: string }>(child)
              ? React.cloneElement(child, { className: undefined })
              : child}
          </motion.div>
        );
      })}
    </div>
  );
}
