import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = 'Avatar', size = 'md', children, ...props }, ref) => {
    const sizes: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white font-semibold',
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
        ) : (
          children
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
