import React, { memo } from 'react';
import { GalleryImage } from '@/types/gallery';
import { useGalleryStore } from '@/store/galleryStore';

interface GalleryGridItemProps {
  item: GalleryImage;
  columns?: number;
}

export const GalleryGridItem: React.FC<GalleryGridItemProps> = memo(({ item, columns = 3 }) => {
  const setPreviewImage = useGalleryStore((state) => state.setPreviewImage);
  const setShowPreview = useGalleryStore((state) => state.setShowPreview);

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow group"
      style={{ aspectRatio: `${item.width}/${item.height}` }}
      onClick={() => {
        setPreviewImage(item);
        setShowPreview(true);
      }}
    >
      <img 
        src={item.thumbnail || item.url} 
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-100"
        loading="lazy"
      />
      
      {/* 悬停遮罩 */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      
      {/* 信息遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm font-medium truncate">{item.name}</p>
        {columns <= 2 && (
          <p className="text-white/80 text-xs">{item.width} x {item.height}</p>
        )}
      </div>
    </div>
  );
});

export default GalleryGridItem;
