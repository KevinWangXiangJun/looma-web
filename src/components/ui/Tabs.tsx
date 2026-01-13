import { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../utils/cn';

type TabsVariant = 'default' | 'button';

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { variant?: TabsVariant }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants: Record<TabsVariant, string> = {
    default:
      'inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500',
    button: 'flex gap-2 bg-transparent p-0',
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { variant?: TabsVariant }
>(({ className, variant = 'default', ...props }, ref) => {
  const defaultStyles =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-colors transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-gray-900 hover:bg-gray-200 data-[state=active]:hover:bg-white data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm';

  const buttonStyles =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-600 focus-visible:outline-none disabled:opacity-50 hover:text-gray-900 hover:bg-gray-200 transition-colors data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary hover:data-[state=active]:bg-primary-600 hover:data-[state=active]:border-primary-600';

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(variant === 'button' ? buttonStyles : defaultStyles, className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, forceMount = true, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    forceMount={forceMount}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'data-[state=inactive]:hidden',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
