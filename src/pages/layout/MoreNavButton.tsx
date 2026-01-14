import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigationStore } from '@/store';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/HoverCard';
import type { NavItem } from '@/types';

interface MoreNavButtonProps {
  moreNavItems?: NavItem[];
}

/**
 * 更多导航按钮组件
 * 使用 HoverCard 展示额外的导航项，点击时在 ExpandedPanel 中展示
 */
export const MoreNavButton = ({ moreNavItems = [] }: MoreNavButtonProps): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { activeItem, setActiveItem } = useNavigationStore();

  // 判断当前按钮是否被选中：检查 activeItem 的 id 是否在 moreNavItems 中
  const isMoreButtonSelected = activeItem && moreNavItems.some(item => item.id === activeItem.id);

  const handleItemClick = (item: NavItem) => {
    // 通过 store 更新活跃项
    setActiveItem(item);

    // 导航到对应路径
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <HoverCard delayDuration={200}>
      <HoverCardTrigger asChild>
        <button
          className={`pt-2 flex flex-col items-center gap-1 relative cursor-pointer transition-all duration-200 ${
            isMoreButtonSelected ? 'text-primary-700' : 'text-primary-600'
          }`}
        >
          <div className={`p-2 rounded-md flex items-center justify-center transition-all duration-200 ${
            isMoreButtonSelected 
              ? 'bg-primary-600/30 text-primary-600' 
              : 'text-primary-600 hover:bg-primary-600/20'
          }`}>
            <MoreHorizontal
              size={20}
              className="stroke-[1.5px] transition-all duration-200 group-hover:scale-110"
            />
          </div>
          <span className={`text-xs font-medium text-primary-600 leading-none text-center max-w-full truncate px-1`}>
            {t('navigation.more') || 'More'}
          </span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="start" sideOffset={10} showArrow={false} className="w-auto">
        <div className="space-y-1 min-w-[200px]">
          {moreNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded text-left text-sm text-primary-600 hover:bg-primary-600/20 transition-colors"
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className="truncate">{t(item.label) || item.label}</span>
              </button>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MoreNavButton;
