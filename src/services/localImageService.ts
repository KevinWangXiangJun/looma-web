import { GalleryImage } from '@/types/gallery';
import { createMockGalleryImages } from '@/__mock__/gallery';

// 缓存已处理的图片（仅处理一次）
let processedImages: GalleryImage[] | null = null;

// 从 mock 数据获取所有图片
const getBaseImages = async (): Promise<GalleryImage[]> => {
  if (processedImages) return processedImages;
  processedImages = await createMockGalleryImages();
  return processedImages;
};

/**
 * 根据本地图片进行分页查询
 * @param page 页码（从1开始）
 * @param limit 每页数量
 * @returns 当前页数据和是否有更多数据
 */
export const getGalleryImagesPaginated = async (
  page: number,
  limit: number
): Promise<{ data: GalleryImage[]; hasMore: boolean }> => {
  // 极短的延迟（100ms）用于骨架屏展示，避免严重的UI冻结
  // 如果需要演示加载状态，在真实API中应该是真实的网络延迟
  await new Promise(resolve => setTimeout(resolve, 100));

  const allImages = await getBaseImages();
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // 没有更多数据
  if (startIndex >= allImages.length) {
    return { data: [], hasMore: false };
  }

  const data = allImages.slice(startIndex, endIndex);

  return {
    data,
    hasMore: endIndex < allImages.length,
  };
};


/**
 * 兼容性导出：获取所有本地图片
 */
export const fetchLocalImages = getBaseImages;
