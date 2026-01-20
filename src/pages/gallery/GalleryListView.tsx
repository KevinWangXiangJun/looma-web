import React from 'react';
import { GalleryListItem } from './GalleryListItem';
import { useGalleryStore } from '@/store/galleryStore';
import { GallerySkeleton } from './GallerySkeleton';
import { GalleryImage } from '@/types/gallery';

interface GalleryListProps {
  renderedVisibleImages: GalleryImage[];
}

export const GalleryListView: React.FC<GalleryListProps> = ({ renderedVisibleImages }) => {
  const {
    images,
    isLoading,
    selectionMode,
    selectedIds,
    toggleSelection,
    setPreviewImage,
    setShowPreview,
  } = useGalleryStore();

  const handleImageClick = (image: any) => {
    if (selectionMode) {
      toggleSelection(image.id);
    } else {
      setPreviewImage(image);
      setShowPreview(true);
    }
  };

  return (
    <div className="w-full space-y-3 pb-4">
      {renderedVisibleImages.map((img) => (
        <GalleryListItem
          key={img.id}
          image={img}
          onClick={handleImageClick}
          onViewDetails={handleImageClick}
          selected={selectedIds.includes(img.id)}
        />
      ))}
      
      {isLoading && images.length > 0 && (
        <div className="py-4">
          <GallerySkeleton viewMode="list" />
        </div>
      )}
    </div>
  );
};

export default GalleryListView;


