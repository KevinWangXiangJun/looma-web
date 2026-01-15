import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  initials?: string;
  isSelected?: boolean;
  showBorder?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = 'Avatar', size = 'md', initials, isSelected = false, showBorder = true, children, ...props }, ref) => {
    const predefinedSizes: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    // 根据size类型确定样式
    const getSizeClass = (): string => {
      if (typeof size === 'number') {
        return '';
      }
      return predefinedSizes[size];
    };

    const getSizeStyle = (): React.CSSProperties | undefined => {
      if (typeof size === 'number') {
        return {
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${Math.floor(size / 3)}px`,
        };
      }
      return undefined;
    };

    // 从alt文本或initials中提取首字符
    const getInitials = (): string => {
      if (initials) return initials;
      if (alt && alt !== 'User') {
        // 支持中文和英文
        const trimmed = alt.trim();
        if (/[\u4e00-\u9fff]/.test(trimmed)) {
          // 中文：取前两个字符
          return trimmed.substring(0, 2);
        } else {
          // 英文：取第一个字母
          return trimmed.charAt(0).toUpperCase();
        }
      }
      return 'U';
    };

    // 边框样式：showBorder为true时才显示边框
    const borderClass = showBorder 
      ? (isSelected ? 'border-4 border-primary-500' : 'border-4 border-gray-200')
      : '';

    return (
      <div
        ref={ref}
        style={getSizeStyle()}
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white font-semibold',
          getSizeClass(),
          borderClass,
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="font-bold tracking-wider">{getInitials()}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
