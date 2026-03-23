'use client';

import * as React from 'react';
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
  useReducedMotion
} from 'motion/react';
import { cn } from '@/shared/lib/utils';

function formatLargeNumber(num: number): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return Math.round(num).toString();
}

function formatDecimal(num: number): string {
  return num.toFixed(1);
}

type FormatType = 'compact' | 'decimal';

function getFormatter(formatType?: FormatType): (n: number) => string {
  switch (formatType) {
    case 'compact':
      return formatLargeNumber;
    case 'decimal':
      return formatDecimal;
    default:
      return (n) => Math.round(n).toLocaleString();
  }
}

interface AnimatedNumberProps {
  value: number;
  formatType?: FormatType;
  className?: string;
}

export function AnimatedNumber({
  value,
  formatType,
  className
}: AnimatedNumberProps) {
  const prefersReducedMotion = useReducedMotion();
  const formatter = getFormatter(formatType);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, formatter);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      motionValue.jump(value);
    } else {
      motionValue.set(value);
    }
  }, [value, motionValue, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{formatter(value)}</div>;
  }

  return <motion.div className={cn(className)}>{display}</motion.div>;
}
