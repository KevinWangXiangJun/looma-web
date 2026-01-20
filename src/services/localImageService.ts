import { GalleryImage, GalleryFilters } from '@/types/gallery';
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
 * @param filters 过滤条件
 * @param downloadedIds 下载列表的ID（用于"我的下载"过滤）
 * @returns 当前页数据、是否有更多数据和总数
 */
export const getGalleryImagesPaginated = async (
  page: number,
  limit: number,
  filters?: GalleryFilters,
  downloadedIds?: string[]
): Promise<{ data: GalleryImage[]; hasMore: boolean; total: number }> => {
  // 极短的延迟（100ms）用于骨架屏展示，避免严重的UI冻结
  // 如果需要演示加载状态，在真实API中应该是真实的网络延迟
  await new Promise(resolve => setTimeout(resolve, 100));

  let allImages = await getBaseImages();

  // ----- 应用过滤逻辑 -----
  if (filters) {
    const { category, search } = filters;

    // 1. 分类过滤
    if (category) {
      switch (category) {
        case 'recent':
          // 最近上传：Mock逻辑，简单返回全部（已排除删除）
          allImages = allImages.filter(img => !img.isDeleted);
          break;
        case 'favorites':
          allImages = allImages.filter(img => img.isFavorited && !img.isDeleted);
          break;
        case 'downloads':
          if (downloadedIds && downloadedIds.length > 0) {
            allImages = allImages.filter(img => downloadedIds.includes(img.id) && !img.isDeleted);
          } else {
            allImages = []; 
          }
          break;
        case 'trash':
          allImages = allImages.filter(img => img.isDeleted);
          break;
        case 'all':
        default:
          // 默认：排除已删除的
          allImages = allImages.filter(img => !img.isDeleted);
          break;
      }
    } else {
      // 如果没有指定 category，默认也是排除回收站
       allImages = allImages.filter(img => !img.isDeleted);
    }

    // 2. 搜索过滤 (如果有)
    if (search) {
      const lowerSearch = search.toLowerCase();
      allImages = allImages.filter(img => img.name.toLowerCase().includes(lowerSearch));
    }
  } else {
     // 无 filters 时，默认排除回收站
     allImages = allImages.filter(img => !img.isDeleted);
  }

  const total = allImages.length;
  
  // 计算分页
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = allImages.slice(startIndex, endIndex);
  
  return {
    data,
    hasMore: endIndex < total,
    total
  };
};


/**
 * 兼容性导出：获取所有本地图片
 */
export const fetchLocalImages = getBaseImages;
