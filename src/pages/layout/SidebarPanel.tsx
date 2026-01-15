import React from 'react';
import { useTranslation } from 'react-i18next';
import type { NavItem } from '@/types';

interface SidebarPanelProps {
  isSidebarCollapsed: boolean;
  activeItem?: NavItem;
  ContentComponent?: React.ComponentType<{ activeItem?: NavItem }> | null;
}

/**
 * 侧边栏展开面板容器组件
 * 根据当前选中的 nav item 动态显示对应的内容组件
 * 负责容器样式、布局和响应式调整
 */
export const SidebarPanel = ({ isSidebarCollapsed, activeItem, ContentComponent }: SidebarPanelProps): JSX.Element | null => {
  const { t } = useTranslation();

  if (isSidebarCollapsed) return null;

  return (
    <div className="w-[20rem] h-full flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-r border-gray-300">
      {/* 面板头部 */}
      <div className="h-16 flex items-center px-4 gap-3 flex-shrink-0 border-b border-gray-200">
        <img src="/logo.svg" alt="Looma" className="h-10 w-10 flex-shrink-0" />
        <div 
          className="text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent"
        >
          {t('common.appName') || 'Looma'}
        </div>
      </div>

      {/* 动态内容区域 */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        {ContentComponent ? (
          <ContentComponent activeItem={activeItem} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            {t('common.noData') || 'No content'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarPanel;
