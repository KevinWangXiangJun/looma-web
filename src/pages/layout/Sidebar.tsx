import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigationStore } from '@/store';
import { getNavItems, getMoreNavItems } from '@/constants/navigation';
import { UserProfile } from '@/pages/userProfile/UserProfile';
import { NotificationButton } from '@/pages/notification/NotificationButton';
import { ExpandedPanel } from './ExpandedPanel';
import { MenuToggleButton } from './MenuToggleButton';
import { CreateButton } from '@/pages/create/CreateButton';
import { MoreNavButton } from './MoreNavButton';
import type { NavItem } from '@/types';

export const Sidebar = (): JSX.Element => {
  const { activeItem, setActiveItem, isSidebarCollapsed, setIsSidebarCollapsed } = useNavigationStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [hoveredIconId, setHoveredIconId] = useState<string | null>(null);

  const navItems = getNavItems(t);
  const moreNavItems = getMoreNavItems(t);
  const allNavItems = [...navItems, ...moreNavItems];

  // 根据当前路径确定活跃项
  const currentActiveItem =
    allNavItems.find(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    ) || navItems[0];

  // 如果 store 中的 activeItem 未设置或需要更新（基于 URL），则使用 currentActiveItem
  const displayActiveItem = activeItem || currentActiveItem;

  const handleToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNavItemClick = (item: NavItem) => {
    setActiveItem(item);
    if (item.path) navigate(item.path);
  };

  return (
    <aside className="flex-shrink-0 flex h-full z-40 shadow-xl pointer-events-auto">
      {/* 主图标列（固定宽度栏） */}
      <div className="flex flex-col items-center w-[92px] h-full pt-4 z-20 relative text-primary-600 border-r border-gray-300">
        {/* 菜单切换按钮 */}
        <MenuToggleButton isSidebarCollapsed={isSidebarCollapsed} onToggle={handleToggle} />

        {/* 创建按钮 */}
        <CreateButton />

        {/* 导航项（图标+文本竖排） */}
        <div className="w-full flex-1 flex flex-col items-center gap-2 overflow-x-hidden overflow-y-auto px-1 no-scrollbar">
          {navItems.map((item: NavItem) => {
            const Icon = item.icon;
            const isActive = displayActiveItem?.id === item.id;
            const isHovered = hoveredIconId === item.id;

            return (
              <button
                key={item.id}
                onMouseEnter={() => setHoveredIconId(item.id)}
                onMouseLeave={() => setHoveredIconId(null)}
                onClick={() => handleNavItemClick(item)}
                className={`py-2 flex flex-col items-center gap-1 relative cursor-pointer`}
              >
                <div className={`p-2 rounded-md flex items-center justify-center transition-all duration-200 ${isActive ? 'bg-primary-600/30 text-primary-600' : 'text-primary-600 hover:bg-primary-600/20'}`}>
                  <Icon
                    size={20}
                    className={`
                      ${isActive || isHovered ? 'stroke-[2px]' : 'stroke-[1.5px]'}
                      transition-all duration-200 group-hover:scale-110`
                    }
                  />
                </div>
                <span className="text-xs font-medium text-primary-600 leading-none text-center max-w-full truncate px-1">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* "更多" 按钮 */}
          <MoreNavButton 
            moreNavItems={moreNavItems}
          />
        </div>

        {/* 通知和账户（底部） */}
        <div className="my-2 w-full flex flex-col items-center gap-4">
          <NotificationButton />
          <UserProfile />
        </div>
      </div>

      {/* 展开面板（动态内容） */}
      <ExpandedPanel
        isSidebarCollapsed={isSidebarCollapsed}
        activeItem={displayActiveItem}
        ContentComponent={() => <div>Content</div>}
      />
    </aside>
  );
};

export default Sidebar;
