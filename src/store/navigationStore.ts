/**
 * 导航相关的Zustand Store
 * 管理导航的全局状态，如当前活跃的导航项和侧边栏折叠状态
 */
import { create } from 'zustand';
import { STORAGE_KEYS } from '@/constants';
import { getStorageKey } from '@/utils';
import { useAuthStore } from './authStore';

interface NavigationState {
  activeItem: any | null;
  setActiveItem: (item: any) => void;
  clearActiveItem: () => void;
  setActiveItemById: (itemId: string, allItems: any[]) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  // 从 localStorage 恢复侧边栏折叠状态
  restoreCollapsedState: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  // 当前活跃的导航项
  activeItem: null,

  // 设置活跃的导航项
  setActiveItem: (item: any) =>
    set({
      activeItem: item,
    }),

  // 清除活跃的导航项
  clearActiveItem: () =>
    set({
      activeItem: null,
    }),

  // 根据项的 id 更新活跃项（用于 URL 变化场景）
  setActiveItemById: (itemId: string, allItems: any[]) => {
    const item = allItems.find((i: any) => i.id === itemId);
    if (item) {
      set({ activeItem: item });
    }
  },

  // 侧边栏折叠状态（true 表示已折叠，false 表示展开）
  isSidebarCollapsed: true,

  // 设置折叠状态
  setIsSidebarCollapsed: (collapsed: boolean) => {
    // 获取当前用户 ID
    const user = useAuthStore.getState().user;
    const userId = user?.id;
    // 保存到 localStorage，使用用户特定的键名
    localStorage.setItem(getStorageKey(STORAGE_KEYS.AUTH_SIDEBAR_COLLAPSED, userId), JSON.stringify(collapsed));
    set({
      isSidebarCollapsed: collapsed,
    });
  },

  // 切换折叠状态
  toggleSidebarCollapsed: () =>
    set((state) => {
      const newCollapsed = !state.isSidebarCollapsed;
      // 获取当前用户 ID
      const user = useAuthStore.getState().user;
      const userId = user?.id;
      // 保存到 localStorage，使用用户特定的键名
      localStorage.setItem(getStorageKey(STORAGE_KEYS.AUTH_SIDEBAR_COLLAPSED, userId), JSON.stringify(newCollapsed));
      return {
        isSidebarCollapsed: newCollapsed,
      };
    }),

  // 从 localStorage 恢复侧边栏折叠状态
  restoreCollapsedState: () => {
    try {
      // 获取当前用户 ID
      const user = useAuthStore.getState().user;
      const userId = user?.id;
      const saved = localStorage.getItem(getStorageKey(STORAGE_KEYS.AUTH_SIDEBAR_COLLAPSED, userId));
      if (saved !== null) {
        const isSidebarCollapsed = JSON.parse(saved);
        set({
          isSidebarCollapsed,
        });
      }
    } catch (_error) {
      // 如果解析失败，使用默认值
    }
  },
}));
