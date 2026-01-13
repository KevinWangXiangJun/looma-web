import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, disabled = false, placeholder, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full px-4 py-2 text-base border border-gray-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed',
          'transition-colors resize-vertical',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
