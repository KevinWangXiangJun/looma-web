import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/HoverCard';
import { MenuToggleIcon, MenuToggleWithArrowIcon } from '@/components/ui/MenuToggleIcon';

interface MenuToggleButtonProps {
  isSidebarCollapsed: boolean;
  onToggle: () => void;
}

/**
 * 菜单切换按钮组件
 * 包含 HoverCard 提示
 * 展开时显示"关闭菜单"，折叠时显示"打开菜单"
 */
export const MenuToggleButton = ({ isSidebarCollapsed, onToggle }: MenuToggleButtonProps): JSX.Element => {
  return (
    <HoverCard delayDuration={200}>
      <HoverCardTrigger asChild>
        <button
          onClick={onToggle}
          className="w-10 h-10 mb-4 flex items-center justify-center rounded text-primary-600 hover:bg-primary-100 hover:text-primary-700 transition-colors overflow-visible cursor-pointer"
        >
          {!isSidebarCollapsed ? (
            <MenuToggleIcon color="#9333ea" size={20} />
          ) : (
            <MenuToggleWithArrowIcon color="#9333ea" size={20} />
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" align="center" sideOffset={0} className="w-auto p-2 bg-gray-700 border-gray-700 text-white [&_svg]:fill-gray-700">
        <div className="text-xs font-medium">
          {!isSidebarCollapsed ? '关闭菜单' : '打开菜单'}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MenuToggleButton;
