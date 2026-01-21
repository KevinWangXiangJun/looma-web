import React, { memo } from 'react';
import { GalleryImage } from '@/types/gallery';
import { useGalleryStore } from '@/store/galleryStore';

interface GalleryGridItemProps {
  image: GalleryImage;
  columns?: number;
}

export const GalleryGridItem: React.FC<GalleryGridItemProps> = memo(({
  image,
  columns = 3,
}) => {
  const isBatchMode = useGalleryStore((state) => state.isBatchMode);
  const toggleImageSelection = useGalleryStore((state) => state.toggleImageSelection);
  const setPreviewImage = useGalleryStore((state) => state.setPreviewImage);
  const setShowPreview = useGalleryStore((state) => state.setShowPreview);
  
  // 性能优化：只订阅当前图片是否被选中，而不是订阅整个 selectedImages 数组
  // 这样当操作其他图片时，当前组件不会重渲染
  const selected = useGalleryStore((state) => state.selectedImages.includes(image.id));

  const handleImageClick = (image: any) => {
    if (isBatchMode) {
      toggleImageSelection(image.id);
    } else {
      setPreviewImage(image);
      setShowPreview(true);
    }
  };

  return (
    <div 
      className={`relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow group ${selected ? 'border border-primary-500 bg-primary-50' : ''}`}
      style={{ aspectRatio: `${image.width}/${image.height}` }}
      onClick={() => handleImageClick(image)}
    >
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
