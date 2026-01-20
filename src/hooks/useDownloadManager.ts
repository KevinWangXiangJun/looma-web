import { useCallback } from 'react';
import { toast } from 'sonner';
import { galleryAPI } from '@/services/galleryAPI';

interface DownloadInput {
  url: string;
  fileName?: string;
}

export const useDownloadManager = () => {
  const handleDownload = useCallback(async (input: DownloadInput) => {
    try {
      if (!input.url) return;
      const fileName = input.fileName || 'image.jpg';
      await galleryAPI.downloadImage(input.url, fileName);
      toast.success('下载成功');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('下载失败');
      throw error;
    }
  }, []);

  const handleBatchDownload = useCallback(async (inputs: DownloadInput[]) => {
    try {
      for (const input of inputs) {
        if (!input.url) continue;
        const fileName = input.fileName || 'image.jpg';
        await galleryAPI.downloadImage(input.url, fileName);
      }
      toast.success(`成功下载 ${inputs.length} 张图片`);
    } catch (error) {
      console.error('Batch download error:', error);
      toast.error('下载失败');
      throw error;
    }
  }, []);

  return { handleDownload, handleBatchDownload };
};

