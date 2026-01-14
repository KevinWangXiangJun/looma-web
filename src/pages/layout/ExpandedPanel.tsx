import React from 'react';
import { useTranslation } from 'react-i18next';
import type { NavItem } from '@/types';

interface ExpandedPanelProps {
  isSidebarCollapsed: boolean;
  activeItem?: NavItem;
  ContentComponent?: React.ComponentType<{ activeItem?: NavItem }>;
}

/**
 * 通用展开面板容器组件
 * 接收自定义内容组件，负责容器样式和布局
 */
export const ExpandedPanel = ({ isSidebarCollapsed, activeItem, ContentComponent }: ExpandedPanelProps): JSX.Element | null => {
  const { t } = useTranslation();

  if (isSidebarCollapsed || !ContentComponent) return null;

  return (
    <div
      className="flex flex-col h-full transition-all duration-300 ease-in-out overflow-hidden border-r border-gray-300"
      style={{ width: '240px' }}
    >
      {/* 面板头部 */}
      <div className="h-16 flex items-center px-4 gap-3 flex-shrink-0 border-b border-gray-200">
        <img src="/logo.svg" alt="Looma" className="h-10 w-10 flex-shrink-0" />
        <div 
          className="text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent"
        >
          {t('common.appName') || 'Looma'}
        </div>
      </div>

      {/* 面板标题和描述 */}
      <div className="px-4 pt-4 flex-shrink-0">
        <h2 className="text-md font-semibold text-primary-700 uppercase tracking-wider">
          {activeItem?.label}
        </h2>
        {activeItem?.description && (
          <p className="text-xs text-gray-500 mt-1">{activeItem.description}</p>
        )}
      </div>

      {/* 动态内容区域 */}
      <div className="px-4 pt-4 flex-1 overflow-y-auto scroll-smooth">
        <ContentComponent activeItem={activeItem} />
      </div>
    </div>
  );
};

export default ExpandedPanel;
