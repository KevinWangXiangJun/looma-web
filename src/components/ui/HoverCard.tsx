import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '../../utils/cn';

function HoverCard({ delayDuration = 200, ...props }: { delayDuration?: number; [key: string]: any }) {
  return (
    <HoverCardPrimitive.Root 
      data-slot="hover-card" 
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
