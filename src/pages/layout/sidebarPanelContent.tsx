/**
 * SidebarPanel 内容映射和工厂函数
 * 为导航项提供对应的内容组件
 */
import React from 'react';
import { ToolsListPanel } from '@/pages/tools/ToolsListPanel';
import { GalleryListPanel } from '@/pages/gallery';
import type { NavItem } from '@/types';

/**
 * SidebarPanel 内容组件的通用 props 接口
 */
export interface SidebarPanelContentProps {
  activeItem?: NavItem;
  [key: string]: any;
}

/**
 * 内容映射器：根据导航项 ID 返回对应的内容组件
 */
const contentComponentMap: Record<string, React.ComponentType<any>> = {
  tools: ToolsListPanel,
  gallery: GalleryListPanel,
};

/**
 * 获取导航项对应的 SidebarPanel 内容组件
 * @param navItemId 导航项 ID
 * @returns 内容组件或 null
 */
export const getSidebarPanelContent = (navItemId?: string): React.ComponentType<any> | null => {
  if (!navItemId || !contentComponentMap[navItemId]) {
    return null;
  }
  return contentComponentMap[navItemId];
};
