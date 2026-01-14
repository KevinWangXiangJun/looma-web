/**
 * 导航相关的Zustand Store
 * 管理导航的全局状态，如当前活跃的导航项
 */
import { create } from 'zustand';

interface NavigationState {
  activeItem: any | null;
  setActiveItem: (item: any) => void;
  clearActiveItem: () => void;
  setActiveItemById: (itemId: string, allItems: any[]) => void;
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
      set({
        activeItem: item,
      });
    }
  },
}));
