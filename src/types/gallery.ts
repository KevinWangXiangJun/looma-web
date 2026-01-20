// 图片格式类型
export type ImageFormat = 'jpg' | 'png' | 'svg' | 'gif' | 'webp';

// 单张图片数据结构
export interface GalleryImage {
  id: string;
  name: string;                       // 图片名称
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
}
