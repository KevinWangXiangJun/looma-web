import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Layout = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col min-h-screen', className)} {...props}>
      {children}
    </div>
  )
);
Layout.displayName = 'Layout';

const LayoutHeader = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn('sticky top-0 z-40 w-full border-b border-gray-200 bg-white', className)}
      {...props}
    >
      {children}
    </header>
  )
);
LayoutHeader.displayName = 'LayoutHeader';

const LayoutContent = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <main ref={ref} className={cn('flex-1 w-full', className)} {...props}>
      {children}
    </main>
  )
);
LayoutContent.displayName = 'LayoutContent';

const LayoutFooter = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn('w-full border-t border-gray-200 bg-gray-50 py-6', className)}
      {...props}
    >
      {children}
    </footer>
  )
);
LayoutFooter.displayName = 'LayoutFooter';

const LayoutSidebar = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <aside ref={ref} className={cn('w-64 border-r border-gray-200 bg-gray-50', className)} {...props}>
      {children}
    </aside>
  )
);
LayoutSidebar.displayName = 'LayoutSidebar';

export { Layout, LayoutHeader, LayoutContent, LayoutFooter, LayoutSidebar };
