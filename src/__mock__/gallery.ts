import { GalleryImage } from '@/types/gallery';
import { galleryMetadataMap } from '@/__mock__/galleryMetadata';

// 导入所有本地照片
const galleryImages = import.meta.glob<{ default: string }>(
  '@/assets/images/gallery/*',
  { eager: true }
);

// 将图片路径转换为数组
const imagePaths = Object.values(galleryImages).map((module) => module.default);

// 从路径提取文件名
const getFileName = (path: string): string => {
  const match = path.match(/\/([^/]+)$/);
  return match ? match[1] : 'image';
};

// 获取图片尺寸（实时加载）
export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
};

/**
 * 从本地照片生成mock数据
 * 使用动态导入的方式获取实际图片
 * 同时关联中文名称和描述
 */
export const createMockGalleryImages = async (): Promise<GalleryImage[]> => {
  const images: GalleryImage[] = [];

  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    const fileName = getFileName(imagePath);
    const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');

    try {
      // 获取实际图片尺寸
      const { width, height } = await getImageDimensions(imagePath);

      // 从元数据映射中获取中文名称和描述
      const metadata = galleryMetadataMap[fileNameWithoutExt];

      const image: GalleryImage = {
        id: `local-${i}`,
        name: fileNameWithoutExt,
        chineseName: metadata?.chineseName || fileNameWithoutExt, // 中文名称，默认使用英文名
        description: metadata?.description, // 中文描述
        url: imagePath,
        thumbnail: imagePath,
        width,
        height,
        format: (fileName.split('.').pop()?.toLowerCase() as any) || 'jpg',
        size: 0, // 本地文件大小未知
        uploadedAt: new Date().toISOString(),
        tags: ['local', 'gallery'],
        resolution: `${width}x${height}`,
      };

      images.push(image);
    } catch (error) {
      console.warn(`Failed to process image: ${fileName}`, error);
    }
  }

  return images;
};

// 预先生成的同步mock数据（用于初始化）
export const mockGalleryImages: GalleryImage[] = imagePaths.map((imagePath, i) => {
  const fileName = getFileName(imagePath);
  const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  const metadata = galleryMetadataMap[fileNameWithoutExt];

  return {
    id: `local-${i}`,
    name: fileNameWithoutExt,
    chineseName: metadata?.chineseName || fileNameWithoutExt,
    description: metadata?.description,
    url: imagePath,
    thumbnail: imagePath,
    width: 400, // 占位符，会通过getImageDimensions更新
    height: 300, // 占位符，会通过getImageDimensions更新
    format: (fileName.split('.').pop()?.toLowerCase() as any) || 'jpg',
    size: 0,
    uploadedAt: new Date().toISOString(),
    tags: ['local', 'gallery'],
    resolution: '400x300', // 占位符
  };
});
