import { create } from 'zustand';
import { User, AuthState } from '@/types';
import { STORAGE_KEYS } from '@/constants';

/**
 * 认证 Store
 * 管理用户认证状态、登录、登出等
 */
interface AuthStore extends AuthState {
  // 登录
  login: (user: User) => void;
  // 登出
  logout: () => void;
  // 更新用户信息
  updateUser: (user: Partial<User>) => void;
  // 从本地存储恢复状态
  restoreFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // 初始状态
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  // 登录
  login: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    set({
      isAuthenticated: true,
      user,
      error: null,
      loading: false,
    });
  },

  // 登出
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    set({
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false,
    });
  },

  // 更新用户信息
  updateUser: (user: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    }));
  },

  // 从本地存储恢复状态
  restoreFromStorage: () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } catch (_error) {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
  },
}));

export default useAuthStore;
