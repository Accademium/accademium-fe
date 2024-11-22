import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number; // The current value of the progress
  max?: number; // Add a max prop to control the maximum value
  color?: string; // The color of the indicator
  direction?: "horizontal" | "vertical"; // Direction prop to control the orientation of the bar
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, max = 100, color = 'bg-primary', direction = 'horizontal', ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative overflow-hidden rounded-lg bg-secondary',
      direction === 'vertical' ? 'h-full w-1' : 'h-4 w-full',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn('h-full w-full flex-1 transition-all', color)}
      style={
      direction === 'vertical'
      ? { transform: `translateY(-${100 - (value / max) * 100}%)` }
      : { transform: `translateX(-${100 - (value / max) * 100}%)` }
    }
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
