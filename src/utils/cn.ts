import { clsx, type ClassValue } from 'clsx';

/**
 * 合并 CSS 类名工具函数
 * 使用 clsx 进行类名合并
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
