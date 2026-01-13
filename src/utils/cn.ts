import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 CSS 类名工具函数
 * 使用 clsx 进行类名合并，并使用 tailwind-merge 解决冲突
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
