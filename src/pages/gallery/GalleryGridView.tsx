import React, { useRef, useLayoutEffect, useState, forwardRef } from 'react';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useGalleryStore } from '@/store/galleryStore';
import { GallerySkeleton } from './GallerySkeleton';
import { GalleryGridItem } from './GalleryGridItem';
import { GalleryImage } from '@/types/gallery';
import { GALLERY_GAP } from '@/constants/gallery';

interface GalleryGridProps {
  renderedVisibleImages: GalleryImage[];
  containerRef: React.RefObject<HTMLDivElement>; // 保留以兼容接口，但不使用
  columns: number | null;
  itemWidth: number | null;
}

export const GalleryGridView = React.memo(forwardRef<
  HTMLDivElement,
  GalleryGridProps
>(({ renderedVisibleImages, columns: propsColumns, itemWidth: propsItemWidth }, ref) => {
  // 使用具体的 selector 避免不必要的重渲染
  const images = useGalleryStore(state => state.images);
  const isLoading = useGalleryStore(state => state.isLoading);

  const internalGridRef = useRef<any>(null);
  
  // 从 props 获取值，直接使用
  // 初始化为 null，只有当 props 都有真实值时才更新
  const [columns, setColumns] = useState<number | null>(null);
  const [itemWidth, setItemWidth] = useState<number | null>(null);

  // 当 props 变化时更新内部状态
  // 只有当 props 都不为 null 时才更新
  useLayoutEffect(() => {
    if (propsColumns !== null && propsItemWidth !== null) {
      setColumns(propsColumns);
      setItemWidth(propsItemWidth);
      console.log(`[GalleryGridView] Props updated: ${propsColumns} columns, ${propsItemWidth}px itemWidth`);
      
      // 更新 Masonry 实例
      const g = internalGridRef.current;
      try {
        if (g) {
          const inst = typeof g.getInstance === 'function' ? g.getInstance() : g;
          if (inst && typeof inst.setOptions === 'function') {
            inst.setOptions({ column: propsColumns, gap: GALLERY_GAP });
          }
        }
      } catch (e) {
        console.warn('Grid layout update failed', e);
      }
    }
  }, [propsColumns, propsItemWidth]);

  // 只有当布局计算完成后才渲染
  // 如果 columns 或 itemWidth 为 null，说明 Gallery 还在计算，暂不渲染
  if (columns === null || itemWidth === null) {
    return <div className="w-full min-h-full" />;
  }

  // 此时 columns 和 itemWidth 都已确定是 number 类型
  const safeColumns: number = columns;
  const safeItemWidth: number = itemWidth;

  return (
    <div 
      ref={ref}
      className="w-full min-h-full"
      style={{ opacity: 1 }}
    >
      <MasonryInfiniteGrid
        ref={internalGridRef}
        gap={GALLERY_GAP}
        column={safeColumns}
        container={true}
        containerTag="div"
        align="start"
        useResizeObserver={true}
        observeChildren={true}
        className="w-full !overflow-hidden"
        threshold={50}
        passive="true"
      >
        {renderedVisibleImages.map((image) => (
          <div 
            key={image.id}
            className="mb-4"
            style={{ width: `${safeItemWidth}px` }}
          >
            <GalleryGridItem
              image={image}
              columns={safeColumns}
            />
          </div>
        ))}
      </MasonryInfiniteGrid>
      
      {isLoading && images.length > 0 && (
         <div className="py-4">
            <GallerySkeleton viewMode="grid" /> 
         </div>
      )}
    </div>
  );
}));

export default GalleryGridView;

