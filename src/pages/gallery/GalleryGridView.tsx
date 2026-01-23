import React, { useRef, useLayoutEffect, useState, forwardRef, useEffect } from 'react';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useGalleryStore } from '@/store/galleryStore';
import { GallerySkeleton } from './GallerySkeleton';
import { GalleryGridItem } from './GalleryGridItem';
import { GalleryImage } from '@/types/gallery';
import { getGridColumns } from '@/utils/gallery';
import { GALLERY_IMAGE_MIN_WIDTH, GALLERY_GAP } from '@/constants/gallery';

interface GalleryGridProps {
  renderedVisibleImages: GalleryImage[];
}

export const GalleryGridView = React.memo(forwardRef<
  HTMLDivElement,
  GalleryGridProps
>(({ renderedVisibleImages }, ref) => {
  const isLoading = useGalleryStore(state => state.isLoading);
  const internalGridRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 内部维护列数和宽度状态
  const [layout, setLayout] = useState<{ columns: number; itemWidth: number } | null>(null);

  // 布局计算逻辑
  const calculateLayout = (width: number) => {
    if (width <= 0) return null;

    // 优先使用 utils 中定义的断点规则，遵循设计系统的列数限制（例如最大4列）
    let columns = getGridColumns(width);
    
    const minW = typeof GALLERY_IMAGE_MIN_WIDTH === 'number' && GALLERY_IMAGE_MIN_WIDTH > 0 
      ? GALLERY_IMAGE_MIN_WIDTH 
      : 250;
    const gap = GALLERY_GAP;

    // 初始计算
    let totalGap = gap * Math.max(0, columns - 1);
    let itemWidth = Math.floor((width - totalGap) / columns);
    
    // 兜底策略：如果基于断点的列数导致单个图片宽度过小（小于最小宽度），则减少列数
    while (columns > 1 && itemWidth < minW) {
      columns -= 1;
      totalGap = gap * Math.max(0, columns - 1);
      itemWidth = Math.floor((width - totalGap) / columns);
    }

    return { columns, itemWidth };
  };

  useLayoutEffect(() => {
    // 初始化或 Resize 时的处理
    const container = containerRef.current;
    if (!container) return;

    let resizeTimer: NodeJS.Timeout;

    const performLayout = (width: number) => {
        const newLayout = calculateLayout(width);
        if (newLayout) {
          setLayout(prev => {
             if (!prev || prev.columns !== newLayout.columns || prev.itemWidth !== newLayout.itemWidth) {
                 return newLayout;
             }
             return prev;
          });
        }
    };

    const handleResize = (entries: ResizeObserverEntry[]) => {
      // 防抖处理：避免 resize 过程中频繁触发重排
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        for (const entry of entries) {
           performLayout(entry.contentRect.width);
        }
      }, 60);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 初始计算
    const initialWidth = container.clientWidth;
     if (initialWidth > 0) {
        performLayout(initialWidth);
    }

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimer);
    };
  }, []); // 仅挂载时执行一次 observer 绑定

  // 同步更新 Masonry 实例选项
  useLayoutEffect(() => {
    const g = internalGridRef.current;
    if (g && layout) {
       try {
        const inst = typeof g.getInstance === 'function' ? g.getInstance() : g;
        if (inst) {
           if (typeof inst.setOptions === 'function') {
             inst.setOptions({ column: layout.columns, gap: GALLERY_GAP });
           }
           // 强制重新布局以确保 grid 内部计算使用子元素最新的宽度
           if (typeof inst.layout === 'function') {
             inst.layout(false);
           }
        }
       } catch(e) { /* ignore */ }
    }
  }, [layout]);

  // 合并 ref
  const setRef = (node: HTMLDivElement) => {
    containerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  // 如果尚未计算出布局，渲染占位符或 loading 状态（视需求而定），这里保持之前的逻辑渲染空 div
  if (!layout) {
    return <div ref={setRef} className="w-full min-h-full" />;
  }

  return (
    <div 
      ref={setRef}
      className="w-full min-h-full"
      style={{ opacity: 1 }}
    >
      <MasonryInfiniteGrid
        ref={internalGridRef}
        gap={GALLERY_GAP}
        column={layout.columns}
        container={false}
        containerTag="div"
        align="start"
        useResizeObserver={true}
        observeChildren={true}
        className="w-full !overflow-hidden"
        threshold={100}
        style={{ overflow: 'hidden' }}
      >
        {renderedVisibleImages.map((image) => (
          <div 
            key={image.id}
            className="mb-4"
            style={{ width: layout.itemWidth }}
          >
            <GalleryGridItem
              image={image}
            />
          </div>
        ))}
      </MasonryInfiniteGrid>
      
      {isLoading && renderedVisibleImages.length > 0 && (
         <div className="py-4">
            <GallerySkeleton viewMode="grid" /> 
         </div>
      )}
    </div>
  );
}));

export default GalleryGridView;

