/**
 * 工具相关的工具函数
 */
import { TOOLS } from '@/constants/tools';
import type { Tool } from '@/types/tools';

/**
 * 按 ID 获取工具
 * @param id 工具 ID
 * @returns 工具对象或 undefined
 */
export const getToolById = (id: string): Tool | undefined => {
  return TOOLS.find(tool => tool.id === id);
};

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 获取文件格式名称
 * @param mimeType MIME 类型
 * @returns 格式名称
 */
export const getFormatName = (mimeType: string): string => {
  const formats: Record<string, string> = {
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/webp': 'WebP',
    'image/gif': 'GIF',
    'image/bmp': 'BMP',
    'image/tiff': 'TIFF',
  };
  return formats[mimeType] || mimeType || '未知';
};
