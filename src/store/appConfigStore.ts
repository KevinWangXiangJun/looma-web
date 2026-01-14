import { create } from 'zustand';
import { LANGUAGE_CONFIG } from '@/constants';

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
  // 改变主题
  changeTheme: (theme: 'light' | 'dark' | 'auto') => {
    set({ theme });
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
