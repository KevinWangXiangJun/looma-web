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
  // 保存登录凭证（手机号或用户名）
  saveLoginCredential: (type: 'phone' | 'username', value: string, country?: string) => void;
  // 清除登录凭证
  clearLoginCredential: () => void;
  // 是否已初始化（从 localStorage 恢复）
  isInitialized: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // 初始状态
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  lastLoginCredential: undefined,
  isInitialized: false,

  // 登录
  login: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    set({
      isAuthenticated: true,
      user,
      error: null,
      loading: false,
    });
  },

  // 登出
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    set({
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false,
      lastLoginCredential: undefined,
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
    const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        // 验证用户对象是否有必要的 id 字段
        if (user && user.id) {
          set({
            isAuthenticated: true,
            user,
            loading: false,
            error: null,
            isInitialized: true,
          });
          return;
        } else {
          // 如果用户对象不完整，清除存储的数据
          localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        }
      } catch (_error) {
        // 如果解析失败，清除存储的数据
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      }
    }
    // 无论是否有存储的用户数据，都需要标记为已初始化
    set({
      isInitialized: true,
    });
  },

  // 保存登录凭证
  saveLoginCredential: (type: 'phone' | 'username', value: string, country?: string) => {
    set({
      lastLoginCredential: {
        type,
        value,
        country,
      },
    });
  },

  // 清除登录凭证
  clearLoginCredential: () => {
    set({
      lastLoginCredential: undefined,
    });
  },
}));
