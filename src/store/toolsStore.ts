/**
 * Tools 模块 Store
 * 管理工具选择和工具页面的状态
 */
import { create } from 'zustand';

interface ToolsStoreState {
  selectedToolId: string | null;
  setSelectedToolId: (toolId: string | null) => void;
}

export const useToolsStore = create<ToolsStoreState>((set) => ({
  selectedToolId: null,
  setSelectedToolId: (toolId: string | null) => set({ selectedToolId: toolId }),
}));
