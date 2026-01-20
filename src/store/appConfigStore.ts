import { create } from 'zustand';
import { LANGUAGE_CONFIG, STORAGE_KEYS, THEME_CONFIG } from '@/constants';
import { getStorageKey } from '@/utils/storage';

/**
 * 应用配置 Store
 * 管理主题、语言等应用级别配置
 */
interface AppConfigStore {
  // 当前语言
  language: string;
  // 改变语言
  changeLanguage: (lang: string) => void;
  // 当前主题
  theme: 'light' | 'dark' | 'auto';
  // 改变主题
  changeTheme: (theme: 'light' | 'dark' | 'auto') => void;
  // 应用主题到DOM
  applyTheme: (theme: 'light' | 'dark' | 'auto') => void;
  // 从存储中初始化主题
  initThemeFromStorage: (userId?: string) => void;
  // 侧边栏是否展开
  sidebarOpen: boolean;
  // 切换侧边栏
  toggleSidebar: () => void;
}

export const useAppConfigStore = create<AppConfigStore>((set) => ({
  // 初始语言
  language: LANGUAGE_CONFIG.ZH_CN,
  // 改变语言
  changeLanguage: (lang: string) => {
    set({ language: lang });
  },

  // 初始主题
  theme: 'light',
  // 改变主题 - 更新state并持久化到storage
  changeTheme: (theme: 'light' | 'dark' | 'auto') => {
    set({ theme });
    // 保存到localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_THEME, theme);
    } catch (e) {
      console.error('Failed to save theme to localStorage:', e);
    }
    // 应用主题到DOM
    useAppConfigStore.getState().applyTheme(theme);
  },

  // 应用主题到DOM
  applyTheme: (theme: 'light' | 'dark' | 'auto') => {
    const root = document.documentElement;
    
    if (theme === 'auto') {
      // 跟随系统
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  },

  // 从存储中初始化主题
  initThemeFromStorage: (userId?: string) => {
    try {
      const storageKey = getStorageKey(STORAGE_KEYS.AUTH_THEME, userId);
      const savedTheme = localStorage.getItem(storageKey) as string | null;
      const theme = (savedTheme || THEME_CONFIG.LIGHT) as 'light' | 'dark' | 'auto';
      
      set({ theme });
      useAppConfigStore.getState().applyTheme(theme);
    } catch (e) {
      console.error('Failed to load theme from localStorage:', e);
      set({ theme: THEME_CONFIG.LIGHT as 'light' | 'dark' | 'auto' });
    }
  },

  // 初始侧边栏状态
  sidebarOpen: true,
  // 切换侧边栏
  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    }));
  },
}));
