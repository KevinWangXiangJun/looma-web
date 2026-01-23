import React, { memo, useCallback } from 'react';
import { GalleryImage } from '@/types/gallery';
import { useGalleryStore } from '@/store/galleryStore';

interface GalleryGridItemProps {
  image: GalleryImage;
}

export const GalleryGridItem: React.FC<GalleryGridItemProps> = memo(({
  image,
}) => {
  // 性能优化：只订阅当前图片是否被选中，而不是订阅整个 selectedImages 数组
  // 这样当操作其他图片时，当前组件不会重渲染
  const selected = useGalleryStore((state) => !!state.selectedImages[image.id]);

  const handleImageClick = useCallback((image: any) => {
    // 性能优化：直接从 "getState()" 获取状态和方法
    const store = useGalleryStore.getState();
    const isBatchMode = store.isBatchMode;
    
    if (isBatchMode) {
      store.toggleImageSelection(image.id);
    } else {
      store.setPreviewImage(image);
      store.setShowPreview(true);
    }
  }, []);

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow group"
      style={{ 
        aspectRatio: `${image.width}/${image.height}`,
        // 性能优化：提示浏览器这些属性即将变化，准备 GPU 加速
        willChange: 'transform, box-shadow'
      }}
      onClick={() => handleImageClick(image)}
    >
      {/* 选中状态遮罩 - 使用绝对定位覆盖层，避免修改父容器 class 触发 Grid 重排 */}
      {selected && (
        <div className="absolute inset-0 z-8 border-2 border-primary-500 bg-primary-50/20 pointer-events-none rounded-lg" />
      )}
      
      <img 
        src={image.thumbnail || image.url} 
        alt={image.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* 悬停遮罩 */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      
      {/* 信息遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm font-medium truncate">{image.chineseName || image.name}</p>
        {image.width && image.height && (
          <p className="text-white/80 text-xs">{image.width} x {image.height}</p>
        )}
      </div>
    </div>
  );
});

export default GalleryGridItem;
