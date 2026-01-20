import HttpClient from './http';
import { GalleryImage } from '@/types/gallery';

interface FetchImagesResponse {
  images: GalleryImage[];
  total: number;
  counts: Record<string, number>;
}

const httpClient = new HttpClient('');

class GalleryAPI {
  /**
   * Fetch paginated gallery images with filters
   */
  async fetchImages(endpoint: string, queryParams: string): Promise<FetchImagesResponse> {
    try {
      const fullUrl = `${endpoint}?${queryParams}`;
      const response = await httpClient.get<{
        images: GalleryImage[];
        total: number;
        counts?: Record<string, number>;
      }>(fullUrl);

      return {
        images: response.data.images || [],
        total: response.data.total || 0,
        counts: response.data.counts || {},
      };
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      throw error;
    }
  }

  /**
   * Delete single image
   */
  async deleteImage(imageId: string): Promise<void> {
    try {
      await httpClient.delete(`/gallery/${imageId}`);
    } catch (error) {
      console.error('Failed to delete image:', error);
      throw error;
    }
  }

  /**
   * Batch delete images
   */
  async deleteBatch(imageIds: string[]): Promise<void> {
    try {
      await httpClient.post('/gallery/batch-delete', { ids: imageIds });
    } catch (error) {
      console.error('Failed to batch delete images:', error);
      throw error;
    }
  }

  /**
   * Download image
   */
  async downloadImage(imageUrl: string, fileName: string): Promise<void> {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Failed to download image:', error);
      throw error;
    }
  }
}

export const galleryAPI = new GalleryAPI();
