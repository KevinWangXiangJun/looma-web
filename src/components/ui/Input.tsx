import { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';
import { INPUT_PRESETS } from './input-styles';

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
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'disabled:pointer-events-none focus:cursor-text',
          'md:text-sm lg:text-base',
          INPUT_PRESETS.standard,
          className
        )}
        {...props}
      />
    );
  }
);

InputBase.displayName = 'Input';

export const Input = memo(InputBase);
