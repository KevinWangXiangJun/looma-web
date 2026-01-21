// 图片格式类型
export type ImageFormat = 'jpg' | 'png' | 'svg' | 'gif' | 'webp';

// 单张图片数据结构
export interface GalleryImage {
  id: string;
  name: string;                       // 英文文件名（不含扩展名）
  chineseName?: string;               // 中文文件名（主题核心）- 展示在网格视图
  description?: string;               // 中文描述 - 展示在列表视图
  url: string;                        // 原始图片URL
  thumbnail: string;                  // 缩略图URL
  width: number;                      // 原始宽度
  height: number;                     // 原始高度
  format: ImageFormat;                // 图片格式
  size: number;                       // 文件大小（字节）
  uploadedAt: string;                 // 上传时间（ISO 8601）
  tags: string[];                     // 标签
  resolution?: string;                // 分辨率字符串（如 "1920x1080"）
  isFavorited?: boolean;              // 是否收藏
  isDeleted?: boolean;                // 是否删除（在回收站中）
}

// 图库过滤条件
export interface GalleryFilters {
  types: string[];                    // 过滤的格式 ['all'|'jpg'|'png'|...]
  search?: string;                    // 搜索关键词（可选）
  category?: 'all' | 'recent' | 'favorites' | 'downloads' | 'trash'; // 相册分类
}
