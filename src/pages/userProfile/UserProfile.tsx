import { useState } from 'react';
import { LogOut, ChevronRight, Users, Palette, HelpCircle, Zap, CreditCard, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store';
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

  const menuItems = [
    { icon: Palette, label: t('userProfile.theme') || 'Theme', action: () => console.log('Theme') },
    { icon: HelpCircle, label: t('userProfile.help') || 'Help & Resources', action: () => console.log('Help') },
    { icon: Zap, label: t('userProfile.advancedTools') || 'Advanced Tools (Trial)', action: () => console.log('Tools') },
    { icon: CreditCard, label: t('userProfile.pricing') || 'Subscription Plans & Pricing', action: () => console.log('Pricing') },
    { icon: Download, label: t('userProfile.buyHistory') || 'Purchase History', action: () => console.log('History') },
  ];

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
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
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
              size="sm"
              onClick={handleCreateTeam}
              className="w-full flex items-center justify-center gap-2 border-gray-300"
            >
              <Users size={16} />
              {t('userProfile.createTeam') || 'Create Team'}
            </Button>
          </div>

          {/* 设置 */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-3">{t('userProfile.settings') || 'Settings'}</p>
            <div className="space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-gray-600 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 下载应用 */}
          <div className="px-4 py-3 border-b border-gray-200">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors">
              <div className="flex items-center gap-3">
                <Download size={18} className="text-gray-600 flex-shrink-0" />
                <span>{t('userProfile.downloadApp') || 'Download Canvas App'}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* 退出按钮（固定底部） */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} className="flex-shrink-0" />
              <span>{t('userProfile.logout') || 'Logout'}</span>
            </div>
            <ChevronRight size={16} className="flex-shrink-0" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
