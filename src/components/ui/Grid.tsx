import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type GapSize = 2 | 3 | 4 | 6 | 8;

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: GapSize;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = 12, gap = 4, children, ...props }, ref) => {
  const gapClasses: Record<GapSize, string> = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div
      ref={ref}
      className={cn('grid', `grid-cols-${columns}`, gapClasses[gap], className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap * 0.25}rem`,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: number;
  rowSpan?: number;
}

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan = 1, rowSpan = 1, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          gridColumn: `span ${colSpan}`,
          gridRow: `span ${rowSpan}`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';

export { Grid, GridItem };
