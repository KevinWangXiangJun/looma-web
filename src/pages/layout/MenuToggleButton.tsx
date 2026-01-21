import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/HoverCard';
import { MenuToggleIcon, MenuToggleWithArrowIcon } from '@/components/ui/MenuToggleIcon';
import { useNavigationStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';

/**
 * 菜单切换按钮组件
 * 包含 HoverCard 提示
 * 展开时显示"关闭菜单"，折叠时显示"打开菜单"
 */
export const MenuToggleButton = (): JSX.Element => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useNavigationStore(
    useShallow((state) => ({
      isSidebarCollapsed: state.isSidebarCollapsed,
      setIsSidebarCollapsed: state.setIsSidebarCollapsed,
    }))
  );

  const handleToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <HoverCard delayDuration={200}>
      <HoverCardTrigger asChild>
        <button
          onClick={handleToggle}
          className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg text-primary-600 hover:bg-primary-600/20 transition-colors overflow-visible cursor-pointer"
        >
          {!isSidebarCollapsed ? (
            <MenuToggleIcon color="#9333ea" size={20} />
          ) : (
            <MenuToggleWithArrowIcon color="#9333ea" size={20} />
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" align="center" sideOffset={0} className="w-auto p-2 bg-gray-300 border-gray-300 text-gray-900 [&_svg]:fill-gray-300">
        <div className="text-xs font-medium">
          {!isSidebarCollapsed ? '关闭菜单' : '打开菜单'}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MenuToggleButton;
