import React, { useMemo } from 'react';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { GalleryListItem } from './GalleryListItem';
import { useGalleryStore } from '@/store/galleryStore';
import { GallerySkeleton } from './GallerySkeleton';
import { GalleryImage } from '@/types/gallery';

interface GalleryListProps {
  renderedVisibleImages: GalleryImage[];
}

// 性能优化：提取常量，避免在每次渲染时重新计算
const LIST_ITEM_STYLE = {
  width: '100%',
  marginBottom: '12px',
  // 性能优化：使用 will-change 提示浏览器准备 GPU 加速
  // 特别是当项目被选中时，会改变背景色和边框
  willChange: 'background-color, border-color',
} as const;

const SKELETON_WRAPPER_STYLE = {
  paddingTop: '1rem',
  paddingBottom: '1rem',
} as const;

export const GalleryListView: React.FC<GalleryListProps> = React.memo(({ renderedVisibleImages }) => {
  const isLoading = useGalleryStore(state => state.isLoading);

  // 性能优化：使用 useMemo 缓存 MasonryInfiniteGrid 配置对象
  // 避免每次渲染时创建新对象，导致 MasonryInfiniteGrid 重新初始化
  const gridOptions = useMemo(() => ({
    gap: 12,
    column: 1,
    container: true,
    align: 'start',
    useResizeObserver: true,
    observeChildren: false,
    threshold: 100,
  }), []);

  return (
    <div style={{ width: '100%', paddingBottom: '1rem', paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
      <MasonryInfiniteGrid
        gap={gridOptions.gap}
        column={gridOptions.column}
        container={gridOptions.container as any}
        containerTag="div"
        align={gridOptions.align as any}
        useResizeObserver={gridOptions.useResizeObserver}
        observeChildren={gridOptions.observeChildren}
        className="w-full !overflow-hidden"
        threshold={gridOptions.threshold}
        passive="true"
      >
        {renderedVisibleImages.map((img) => (
          <div key={img.id} style={LIST_ITEM_STYLE}>
             <GalleryListItem image={img} />
          </div>
        ))}
      </MasonryInfiniteGrid>
      
      {isLoading && renderedVisibleImages.length > 0 && (
        <div style={SKELETON_WRAPPER_STYLE}>
          <GallerySkeleton viewMode="list" />
        </div>
      )}
    </div>
  );
});

export default GalleryListView;


