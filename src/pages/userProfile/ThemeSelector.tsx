import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppConfigStore } from '@/store';
import { THEME_OPTIONS } from '@/constants';

/**
 * 主题选择器组件
 * 用于在HoverCard中展示主题选项（浅色、深色、跟随系统）
 * 参考设计图1
 */
export const ThemeSelector = (): JSX.Element => {
  const { t } = useTranslation();
  const { theme, changeTheme } = useAppConfigStore();

  // 图标映射
  const iconMap = {
    sun: Sun,
    moon: Moon,
    monitor: Monitor,
  };

  return (
    <div className="space-y-2 w-56">
      {THEME_OPTIONS.map((option) => {
        const Icon = iconMap[option.icon as keyof typeof iconMap];
        const isSelected = theme === option.id;
        const label = t(option.labelKey) || option.labelFallback;

        return (
          <button
            key={option.id}
            onClick={() => changeTheme(option.id as 'light' | 'dark' | 'auto')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors`}
          >
            <Icon size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">{label}</span>
            {isSelected && (
              <Check size={20} className="ml-auto flex-shrink-0 text-gray-700" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
