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
  } = useGalleryStore();

  

  return (
    <div className="w-full space-y-3 pb-4">
      {renderedVisibleImages.map((img) => (
        <GalleryListItem
          key={img.id}
          image={img}
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


