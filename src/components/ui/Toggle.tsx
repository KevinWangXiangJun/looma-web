import { forwardRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cn } from '../../utils/cn';

type ToggleVariant = 'default' | 'outline';
type ToggleSize = 'sm' | 'md' | 'lg';

interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: ToggleVariant;
  size?: ToggleSize;
}

const Toggle = forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary-100 data-[state=on]:text-primary-900',
        variant === 'default' && 'bg-transparent text-gray-600',
        variant === 'outline' && 'border border-gray-300 bg-transparent text-gray-600',
        size === 'sm' && 'h-9 px-2.5',
        size === 'md' && 'h-10 px-3',
        size === 'lg' && 'h-11 px-5',
        className
      )}
      {...props}
    />
  )
);
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
