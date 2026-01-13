import { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';

const InputBase = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', disabled = false, placeholder, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'file:text-foreground selection:bg-primary selection:text-primary-foreground',
          'dark:bg-input/30 flex h-10 w-full min-w-0 rounded border px-3 py-1 text-base outline-none',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'md:text-sm lg:text-base',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'bg-white border-gray-200 transition-colors transition-shadow duration-300 placeholder:text-gray-400',
          'focus-visible:border-primary focus:cursor-text focus:border-primary hover:border-primary/40',
          className
        )}
        {...props}
      />
    );
  }
);

InputBase.displayName = 'Input';

export const Input = memo(InputBase);
