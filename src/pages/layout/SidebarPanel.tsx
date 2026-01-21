import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigationStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { getSidebarPanelContent } from './SidebarPanelContent';

/**
 * 侧边栏展开面板容器组件
 * 根据当前选中的 nav item 动态显示对应的内容组件
 * 负责容器样式、布局和响应式调整
 */
export const SidebarPanel = memo((): JSX.Element | null => {
  const { t } = useTranslation();
  
  const { isSidebarCollapsed, activeItem } = useNavigationStore(
    useShallow((state) => ({
      isSidebarCollapsed: state.isSidebarCollapsed,
      activeItem: state.activeItem,
    }))
  );

  // 根据 activeItem 动态获取内容组件
  const ContentComponent = useMemo(() => {
    return activeItem?.id ? getSidebarPanelContent(activeItem.id) : null;
  }, [activeItem?.id]);
  
  // 性能优化策略：
  // - 当折叠时返回 null，完全卸载 DOM
  // - 使用 will-change 提示浏览器做好渲染层的准备
  // - 使用 transform 和 opacity 做动画（比 width 更高效），但由于直接返回 null 就不需要了
  if (isSidebarCollapsed) return null;

  return (
    <div 
      className="h-full flex flex-col overflow-hidden border-r border-gray-300 animate-in fade-in slide-in-from-left-64 duration-300"
      style={{
        width: '16.5rem',
        // 为了让动画在浏览器层面更高效
        willChange: 'contents',
      }}
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
});

export default SidebarPanel;
