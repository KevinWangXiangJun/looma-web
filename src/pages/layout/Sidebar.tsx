import { useEffect, useMemo, memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigationStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { getNavItems, getMoreNavItems } from '@/constants/navigation';
import { UserProfile } from '@/pages/userProfile/UserProfile';
import { NotificationButton } from '@/pages/notification/NotificationButton';
import { SidebarPanel } from './SidebarPanel';
import { MenuToggleButton } from './MenuToggleButton';
import { CreateButton } from '@/pages/create/CreateButton';
import { MoreNavButton } from './MoreNavButton';
import { getSidebarPanelContent } from './SidebarPanelContent';
import type { NavItem } from '@/types';

// 单独提取导航项组件以优化性能
const SidebarNavItem = memo(({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: NavItem; 
  isActive: boolean; 
  onClick: (item: NavItem) => void;
}) => {
  const Icon = item.icon;
  
  return (
    <button
      onClick={() => onClick(item)}
      className="py-2 flex flex-col items-center gap-1 relative cursor-pointer group w-full"
    >
      <div className={`p-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
        isActive 
          ? 'bg-primary-600/30 text-primary-600' 
          : 'text-primary-600 hover:bg-primary-600/20'
      }`}>
        <Icon
          size={20}
          className={`
            ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px] group-hover:stroke-[2px]'}
            transition-all duration-200 group-hover:scale-110`
          }
        />
      </div>
      <span className="text-xs font-medium text-primary-600 leading-none text-center max-w-full truncate px-1">
        {item.label}
      </span>
    </button>
  );
});
SidebarNavItem.displayName = 'SidebarNavItem';

export const Sidebar = (): JSX.Element => {
  // 性能优化：使用 useShallow 选择器，避免不必要的重渲染
  const { activeItem, setActiveItem, isSidebarCollapsed } = useNavigationStore(
    useShallow((state) => ({
      activeItem: state.activeItem,
      setActiveItem: state.setActiveItem,
      isSidebarCollapsed: state.isSidebarCollapsed,
    }))
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // 使用 useMemo 缓存导航配置，避免每次渲染重新计算
  const { navItems, moreNavItems, allNavItems } = useMemo(() => {
    const items = getNavItems(t);
    const more = getMoreNavItems(t);
    return {
      navItems: items,
      moreNavItems: more,
      allNavItems: [...items, ...more]
    };
  }, [t]);

  // 根据当前路径确定活跃项
  const currentActiveItem = useMemo(() => 
    allNavItems.find(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    ) || navItems[0],
    [allNavItems, location.pathname, navItems]
  );

  // 初始化和同步：
  // 1. 初始化时，如果 activeItem 为空，设置初始值
  // 2. 监听 URL 变化，确保 Store 中的 activeItem 与 URL 保持同步
  //    这样 SidebarPanel 等使用 Store 的子组件即使在浏览器后退时也能正确显示
  useEffect(() => {
    // 如果 Store 中的 activeItem 与当前 URL 对应的项不一致，则同步更新 Store
    if (navItems.length > 0 && currentActiveItem) {
      if (!activeItem || activeItem.id !== currentActiveItem.id) {
        setActiveItem(currentActiveItem);
      }
    }
  }, [currentActiveItem, activeItem, setActiveItem, navItems.length]);

  const scrollToTop = () => {
    const mainScrollContainer = document.getElementById('main-content-scroll');
    if (mainScrollContainer) {
      mainScrollContainer.scrollTop = 0;
    }
  };

  const handleNavItemClick = useCallback((item: NavItem) => {
    setActiveItem(item);
    if (item.path) {
      // 如果点击的是当前路径，则不进行跳转和滚动重置
      if (item.path === location.pathname) return;

      navigate(item.path);
      // 导航时也滚动到顶部
      scrollToTop();
    }
  }, [location.pathname, navigate, setActiveItem]);

  return (
    <aside className="flex-shrink-0 flex max-w-[21rem] h-full z-40 pointer-events-auto">
      {/* 主图标列（固定宽度栏） */}
      <div className="flex flex-col items-center w-[72px] h-full pt-4 z-20 relative text-primary-600 border-r border-gray-300">
        {/* 菜单切换按钮 */}
        <MenuToggleButton />

        {/* 创建按钮 */}
        <CreateButton />

        {/* 导航项（图标+文本竖排） */}
        <div className="w-full flex-1 flex flex-col items-center gap-2 overflow-x-hidden overflow-y-auto px-1 no-scrollbar">
          {navItems.map((item: NavItem) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              // 为了确保 UI 高亮即时响应 URL 变化（防止 Store 更新微小延迟），这里优先使用 currentActiveItem
              // 如果只想要 Store 驱动，可以改为 `activeItem?.id === item.id`
              isActive={(activeItem?.id || currentActiveItem?.id) === item.id}
              onClick={handleNavItemClick}
            />
          ))}

          {/* "更多" 按钮 */}
          <MoreNavButton 
            moreNavItems={moreNavItems}
          />
        </div>

        {/* 通知和账户（底部） */}
        <div className="my-2 mb-4 w-full flex flex-col items-center gap-2">
          <NotificationButton />
          <UserProfile />
        </div>
      </div>

      {/* 展开面板（动态内容）- 使用 overflow-hidden 和 transition 包装器实现平滑展开/折叠 */}
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ width: isSidebarCollapsed ? 0 : 'auto' }}>
        <SidebarPanel />
      </div>
    </aside>
  );
};

export default Sidebar;
