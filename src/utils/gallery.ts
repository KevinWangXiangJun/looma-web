/**
 * 本地图片处理工具
 * 用于读取本地照片并提取其基础信息
 */
import { extractExifFromImage, ExifInfo } from './exifTools';
import type { GalleryImage, ImageFormat } from '@/types/gallery';

/**
 * 读取本地文件并生成缩略图
 */
const generateThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * 获取图片的宽高信息
 */
const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
};

/**
 * 获取文件格式
 */
const getImageFormat = (file: File): ImageFormat => {
  const mimeType = file.type.toLowerCase();
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'jpg';
  if (mimeType.includes('png')) return 'png';
  if (mimeType.includes('svg')) return 'svg';
  if (mimeType.includes('gif')) return 'gif';
  if (mimeType.includes('webp')) return 'webp';
  return 'jpg'; // 默认值
};

/**
 * 从本地文件转换为 GalleryImage
 */
export const convertFileToGalleryImage = async (
  file: File,
  index: number
): Promise<GalleryImage> => {
  // 生成缩略图
  const thumbnail = await generateThumbnail(file);

  // 获取图片尺寸
  const { width, height } = await getImageDimensions(thumbnail);

  // 获取文件格式
  const format = getImageFormat(file);

  // 尝试获取 EXIF 信息（如果是 JPEG）
  let exifInfo: ExifInfo | null = null;
  if (format === 'jpg') {
    try {
      exifInfo = await extractExifFromImage(file);
    } catch (e) {
      console.warn('Failed to read EXIF data:', e);
    }
  }

  // 获取拍摄时间，如果没有 EXIF 则使用文件修改时间
  const uploadedAt = exifInfo?.dateTimeOriginal
    ? new Date(exifInfo.dateTimeOriginal).toISOString()
    : new Date(file.lastModified).toISOString();

  return {
    id: `local-${Date.now()}-${index}`,
    name: file.name.replace(/\.[^/.]+$/, ''), // 移除文件扩展名
    url: thumbnail,
    thumbnail,
    width,
    height,
    format,
    size: file.size,
    uploadedAt,
    tags: exifInfo?.make ? [exifInfo.make] : [],
    resolution: `${width}×${height}`,
  };
};

/**
 * 批量转换文件列表
 */
export const convertFilesToGalleryImages = async (
  files: File[]
): Promise<GalleryImage[]> => {
  const images: GalleryImage[] = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const image = await convertFileToGalleryImage(files[i], i);
      images.push(image);
    } catch (error) {
      console.error(`Failed to process file ${files[i].name}:`, error);
    }
  }

  return images;
};

/**
 * 验证是否为支持的图片格式
 */
export const isValidImageFormat = (file: File): boolean => {
  const supportedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'];
  return supportedTypes.includes(file.type.toLowerCase());
};

/**
 * 过滤和验证文件列表
 */
export const filterValidImageFiles = (files: FileList): File[] => {
  const validFiles: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (isValidImageFormat(file)) {
      validFiles.push(file);
    }
  }

  return validFiles;
};
