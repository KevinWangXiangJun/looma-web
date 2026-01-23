import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigationStore } from '@/store';
import { getSidebarPanelContent } from './SidebarPanelContent';

/**
 * 侧边栏展开面板容器组件
 * 根据当前选中的 nav item 动态显示对应的内容组件
 * 负责容器样式、布局和响应式调整
 */
export const SidebarPanel = memo((): JSX.Element | null => {
  const { t } = useTranslation();
  
  // 关键优化：只订阅 activeItem，完全移除对 isSidebarCollapsed 的订阅
  // 这样 Sidebar 的展开/折叠动画就不会触发 SidebarPanel 的任何重渲染
  const activeItem = useNavigationStore(
    (state) => state.activeItem
  );

  // 根据 activeItem 动态获取内容组件
  const ContentComponent = useMemo(() => {
    return activeItem?.id ? getSidebarPanelContent(activeItem.id) : null;
  }, [activeItem?.id]);

  return (
    <div 
      className="h-full flex flex-col overflow-hidden border-r border-gray-300"
      style={{
        // 宽度由 MainLayout 的 CSS 控制，这里只设置 CSS Containment
        contain: 'strict',
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
