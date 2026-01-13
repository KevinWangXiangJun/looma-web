import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'success' | 'warning';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants: Record<BadgeVariant, string> = {
      default: 'bg-primary-100 text-primary-800',
      secondary: 'bg-gray-100 text-gray-800',
      destructive: 'bg-red-100 text-red-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
    };

    const sizes: Record<BadgeSize, string> = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
