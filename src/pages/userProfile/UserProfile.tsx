import { useState } from 'react';
import { LogOut, ChevronRight, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store';
import { createUserProfileMenuItems } from '@/constants/userProfile';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

/**
 * 用户资料组件
 * 显示当前登录用户的头像和基本信息，以及相关功能菜单
 */
export const UserProfile = (): JSX.Element => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleCreateTeam = () => {
    // TODO: 创建团队功能
    console.log('创建团队');
  };

  const menuItems = createUserProfileMenuItems(
    (key, fallback) => t(key) || fallback,
    {
      onSettings: () => console.log('Settings'),
      onTheme: () => console.log('Theme'),
      onHelp: () => console.log('Help'),
      onAdvancedTools: () => console.log('Tools'),
      onPricing: () => console.log('Pricing'),
      onBuyHistory: () => console.log('History'),
    }
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar
            src={user?.avatar}
            alt={user?.username || 'User'}
            initials={user?.username ? user.username.substring(0, 2) : 'U'}
            size={40}
            isSelected={isOpen}
            className="cursor-pointer"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        sideOffset={12} 
        align="start" 
        className="w-[25rem] p-0 overflow-hidden flex flex-col"
      >
        {/* 用户信息区 */}
        <div className="bg-gray-50 py-3 border-b border-gray-200">
          <div className="flex items-center text-sm px-4 pb-2">账户</div>
          <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors">
            <Avatar
              src={user?.avatar}
              alt={user?.username || 'User'}
              initials={user?.username ? user.username.substring(0, 2) : 'U'}
              size="lg"
              showBorder={false}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900">{user?.username || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <ChevronRight size={18} className="text-gray-400 flex-shrink-0" />
          </div>
        </div>

        {/* 可滚动菜单区 */}
        <div className="overflow-y-auto flex-1">
          {/* 团队版 */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-3">{t('userProfile.teamVersion') || 'Team Version'}</p>
            <Button
              variant="outline"
              onClick={handleCreateTeam}
              className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-200 transition-colors"
            >
              <Users size={16} />
              {t('userProfile.createTeam') || 'Create Team'}
            </Button>
          </div>

          {/* 设置 */}
          <div className="py-3 border-b border-gray-200">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const label = t(item.labelKey) || item.labelFallback;

                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-gray-600 flex-shrink-0" />
                      <span>{label}</span>
                    </div>
                    {item.showChevron && <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 退出按钮（固定底部） */}
        <div className="py-3 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-red-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} className="flex-shrink-0" />
              <span>{t('userProfile.logout') || 'Logout'}</span>
            </div>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
