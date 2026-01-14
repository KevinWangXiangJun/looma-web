import { useAuthStore } from '@/store';

/**
 * 获取最后一次登录的凭证信息
 * 方便在其他页面中使用（如预填手机号、发送短信等）
 */
export const useLoginCredential = () => {
  const lastLoginCredential = useAuthStore((state) => state.lastLoginCredential);
  const clearLoginCredential = useAuthStore((state) => state.clearLoginCredential);

  return {
    // 凭证类型：phone 或 username
    type: lastLoginCredential?.type,
    // 凭证值（手机号或用户名）
    value: lastLoginCredential?.value,
    // 国家代码（仅用于手机号）
    country: lastLoginCredential?.country,
    // 是否有可用的凭证
    hasCredential: !!lastLoginCredential,
    // 清除凭证
    clear: clearLoginCredential,
  };
};

