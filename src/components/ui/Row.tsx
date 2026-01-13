import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Row = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex gap-4', className)} {...props}>
    {children}
  </div>
));
Row.displayName = 'Row';

interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  flex?: number;
}

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ className, flex = 1, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex-1', className)} style={{ flex }} {...props}>
    {children}
  </div>
));
Cell.displayName = 'Cell';

export { Row, Cell };
