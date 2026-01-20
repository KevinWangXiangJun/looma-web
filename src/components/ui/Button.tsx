import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }
>(
  ({ className, variant = 'default', size = 'md', disabled = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants: Record<ButtonVariant, string> = {
      default: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-600',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-primary-600',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500',
      destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
