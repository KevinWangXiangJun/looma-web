import { useEffect, useMemo, memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigationStore } from '@/store';
import { getNavItems, getMoreNavItems } from '@/constants/navigation';
import { UserProfile } from '@/pages/userProfile/UserProfile';
import { NotificationButton } from '@/pages/notification/NotificationButton';
import { SidebarPanel } from './SidebarPanel';
import { MenuToggleButton } from './MenuToggleButton';
import { CreateButton } from '@/pages/create/CreateButton';
import { MoreNavButton } from './MoreNavButton';
import { cn } from '@/utils/cn';
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
      className="py-2 flex flex-col items-center gap-1 relative cursor-pointer group w-full focus:outline-none"
    >
      <div className={cn(
        "p-2 rounded-lg flex items-center justify-center transition-all duration-200",
        isActive 
          ? "bg-primary-50 text-primary-600" 
          : "text-gray-600 hover:bg-gray-200 hover:text-primary-600"
      )}>
        <Icon
          size={20}
          className={cn(
            "transition-all duration-200",
            isActive ? "stroke-2" : "stroke-[1.5px] group-hover:scale-105"
          )}
        />
      </div>
      <span className={cn(
        "text-[10px] font-medium leading-none text-center max-w-full truncate px-1",
        isActive ? "text-primary-600" : "text-gray-600"
      )}>
        {item.label}
      </span>
    </button>
  );
});
SidebarNavItem.displayName = 'SidebarNavItem';

export const Sidebar = (): JSX.Element => {
  const { activeItem, setActiveItem } = useNavigationStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Navigation Items Memoization
  const { navItems, moreNavItems, allNavItems } = useMemo(() => {
    const items = getNavItems(t);
    const more = getMoreNavItems(t);
    return {
      navItems: items,
      moreNavItems: more,
      allNavItems: [...items, ...more]
    };
  }, [t]);

  // Determine active item from URL
  const currentActiveItem = useMemo(() => 
    allNavItems.find(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    ) || navItems[0],
    [allNavItems, location.pathname, navItems]
  );

  // Sync state with URL
  useEffect(() => {
    if (navItems.length > 0 && currentActiveItem) {
      if (!activeItem || activeItem.id !== currentActiveItem.id) {
        setActiveItem(currentActiveItem);
      }
    }
  }, [currentActiveItem, activeItem, setActiveItem, navItems.length]);

  const handleNavItemClick = useCallback((item: NavItem) => {
    setActiveItem(item);
    if (item.path && item.path !== location.pathname) {
      navigate(item.path);
    }
  }, [location.pathname, navigate, setActiveItem]);

  return (
    <aside className="flex h-full w-full bg-white">
      {/* Primary Icon Column (Fixed Width) */}
      <div className="flex flex-col items-center w-[72px] h-full pt-4 z-20 relative border-r border-gray-200 bg-white flex-shrink-0">
        <MenuToggleButton />
        <CreateButton />

        {/* Navigation Items */}
        <div className="w-full flex-1 flex flex-col items-center gap-2 overflow-x-hidden overflow-y-auto px-1 py-1 scrollbar-hide">
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={(activeItem?.id || currentActiveItem?.id) === item.id}
              onClick={handleNavItemClick}
            />
          ))}

          <MoreNavButton moreNavItems={moreNavItems} />
        </div>

        {/* Footer Actions */}
        <div className="my-2 mb-4 w-full flex flex-col items-center gap-2">
          <NotificationButton />
          <UserProfile />
        </div>
      </div>

      {/* Expandable Panel Content */}
      <div className="flex-1 overflow-hidden h-full min-w-0 bg-gray-50/50">
        <SidebarPanel />
      </div>
    </aside>
  );
};

export default Sidebar;
