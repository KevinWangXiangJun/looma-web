import { useState, useCallback } from 'react';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/store';
import { LoginRequest } from '@/types';

/**
 * 认证相关 Hook
 * 提供登录、登出等认证操作
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, logout } = useAuthStore();

  /**
   * 登录
   */
  const handleLogin = useCallback(
    async (loginRequest: LoginRequest) => {
      try {
        setLoading(true);
        setError(null);
        const response = await authService.login(loginRequest);
        login(response.user);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : '登录失败';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  /**
   * 登出
   */
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    loading,
    error,
    handleLogin,
    handleLogout,
  };
};
