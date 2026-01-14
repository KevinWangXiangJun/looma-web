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
          'bg-white border-gray-200 transition-colors transition-shadow duration-300 placeholder:text-gray-400',
          // 正常状态：hover 和 focus
          'hover:border-primary/60 focus-visible:border-primary focus:cursor-text focus:border-primary',
          'ring-primary/20 dark:ring-primary/40',
          className
        )}
        {...props}
      />
    );
  }
);

InputBase.displayName = 'Input';

export const Input = memo(InputBase);
