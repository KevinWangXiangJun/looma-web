import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  closeable?: boolean;
  onClose?: () => void;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', closeable = false, onClose, children, ...props }, ref) => {
    const variants: Record<TagVariant, string> = {
      default: 'bg-blue-100 text-blue-800 border border-blue-300',
      primary: 'bg-primary-100 text-primary-800 border border-primary-300',
      success: 'bg-green-100 text-green-800 border border-green-300',
      warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      danger: 'bg-red-100 text-red-800 border border-red-300',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
        {closeable && (
          <button
            onClick={onClose}
            className="ml-1 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-1 rounded"
            aria-label="Remove tag"
          >
            ✕
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag };
