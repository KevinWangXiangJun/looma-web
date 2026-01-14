import { STORAGE_KEYS } from '@/constants';

/**
 * 生成用户特定的存储键名
 * @param key - 存储键的模板（从 STORAGE_KEYS 中选择）
 * @param userId - 用户 ID（可选，如果不提供则返回全局键名）
 * @returns 用户特定的存储键名或全局键名
 */
export const getStorageKey = (key: string, userId?: string): string => {
  // AUTH_USER 和 AUTH_TOKEN 是全局的（用于登录状态恢复），不需要用户 ID
  if (key === STORAGE_KEYS.AUTH_USER || key === STORAGE_KEYS.AUTH_TOKEN) {
    return key;
  }

  // 其他键名需要关联到用户
  if (userId) {
    return `${key}:${userId}`;
  }

  // 如果没有提供用户 ID，返回原始键名（用于应用初始化时调用）
  return key;
};
