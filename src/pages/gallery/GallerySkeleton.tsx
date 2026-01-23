import React from 'react';

interface GallerySkeletonProps {
  viewMode: 'grid' | 'list';
  count?: number;  // 可配置显示的 Skeleton 数量，默认 8，List 视图传 3 以降低成本
}

const COLUMN_CLASSES = "overflow-hidden animate-pulse space-y-2 w-full";

export const GallerySkeleton: React.FC<GallerySkeletonProps> = ({ viewMode, count = 8 }) => {
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col space-y-4 w-full">
        {/* 限制 Skeleton 数量，减少 DOM 节点和渲染成本 */}
        {[...Array(count)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 animate-pulse p-2 border border-gray-100 rounded-lg">
            <div className="w-20 h-20 bg-gray-200 rounded-md" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  // 网格骨架屏 - 使用 CSS Grid 响应式布局
  // MasonryInfiniteGrid 会自动计算每个 item 的宽度，count 参数控制显示数量
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className={COLUMN_CLASSES}
        >
          {/* 随机高度以模拟瀑布流纵横比 */}
          <div 
            className="bg-gray-200 rounded-lg w-full" 
            style={{ height: `${200 + ((i * 10) % 50)}px` }} 
          />
        </div>
      ))}
    </div>
  );
};

export default GallerySkeleton;
