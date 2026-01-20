import { useCallback } from 'react';
import { toast } from 'sonner';
import { galleryAPI } from '@/services/galleryAPI';
import { GalleryImage } from '@/types/gallery';

interface DeleteResult {
  success: boolean;
  deletedCount?: number;
  error?: string;
}

export const useDeleteManager = () => {
  const handleDelete = useCallback(
    async (imageId: string, _images?: GalleryImage[]): Promise<DeleteResult> => {
      try {
        await galleryAPI.deleteImage(imageId);
        toast.success('删除成功');
        return { success: true, deletedCount: 1 };
      } catch (error) {
         console.error('Delete error:', error);
         toast.error('删除失败');
         return {
           success: false,
           error: error instanceof Error ? error.message : 'Unknown error',
         };
      }
    },
    []
  );

  const handleBatchDelete = useCallback(
    async (imageIds: string[], _images: GalleryImage[]): Promise<DeleteResult> => {
      try {
        if (imageIds.length === 0) {
          throw new Error('No images selected');
        }

        await galleryAPI.deleteBatch(imageIds);
        toast.success(`成功删除 ${imageIds.length} 张图片`);

        return {
          success: true,
          deletedCount: imageIds.length,
        };
      } catch (error) {
        console.error('Batch delete error:', error);
        toast.error('删除失败');
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
    []
  );

  return { handleDelete, handleBatchDelete };
};
