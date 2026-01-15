import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '../../utils/cn';
import { useEffect, useRef, useState } from 'react';

/**
 * 增强的 HoverCard 组件
 * 解决 Alt+Tab 切换后 HoverCard 仍然打开的问题
 */
function HoverCard({ 
  delayDuration = 200, 
  open: openProp,
  onOpenChange: onOpenChangeProp,
  ...props 
}: { 
  delayDuration?: number; 
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  [key: string]: any 
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isRefocusingRef = useRef(false);
  
  // 判断组件是否受控
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const onOpenChange = isControlled ? onOpenChangeProp : setUncontrolledOpen;

  // 拦截 onOpenChange 以防止在窗口重新获得焦点时自动打开
  const handleOpenChange = (newOpen: boolean) => {
    // 如果在窗口恢复焦点的过程中尝试打开，则阻止它
    if (newOpen && isRefocusingRef.current) {
      return;
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  useEffect(() => {
    const handleWindowBlur = () => {
      // 窗口失去焦点时强制关闭
      if (onOpenChange) {
        onOpenChange(false);
      }
    };
    
    // 同时处理通过 Alt+Tab 返回时的焦点事件，确保状态被重置
    const handleWindowFocus = () => {
      // 标记为"正在恢复焦点"状态
      isRefocusingRef.current = true;
      
      // 立即强制关闭
      if (onOpenChange) {
         onOpenChange(false);
      }
      
      // 短暂延迟后清除标志（等待焦点事件稳定）
      setTimeout(() => {
        isRefocusingRef.current = false;
      }, 300);
    };
    
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [onOpenChange]);

  return (
    <HoverCardPrimitive.Root 
      data-slot="hover-card" 
      open={open}
      onOpenChange={handleOpenChange}
      openDelay={delayDuration}
      closeDelay={100}
      {...props} 
    />
  );
}

function HoverCardTrigger({ ...props }: { [key: string]: any }) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

function HoverCardContent({
  className,
  side = 'right',
  align = 'start',
  sideOffset = 4,
  showArrow = true,
  ...props
}: {
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  showArrow?: boolean;
  [key: string]: any;
}) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        ref={undefined}
        data-slot="hover-card-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(
          'bg-popover text-popover-foreground z-[100] w-64 rounded-md border border-gray-200 p-4 shadow-md outline-hidden bg-white',
          className
        )}
        {...props}
      >
        {props.children}
        {showArrow && <HoverCardPrimitive.Arrow width={12} height={6} className={cn('fill-popover')} />}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
export default HoverCard;
