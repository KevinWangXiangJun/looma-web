import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { Avatar } from '@/components/ui/Avatar';

/**
 * 用户资料组件
 * 显示当前登录用户的头像和基本信息
 */
export const UserProfile = (): JSX.Element => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

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
      <PopoverContent side="right" sideOffset={12} align="start" className="w-[25rem] p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={user?.avatar}
              alt={user?.username || 'User'}
              initials={user?.username ? user.username.substring(0, 2) : 'U'}
              size="md"
              showBorder={false}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.username || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-3 py-2 text-sm text-red-600 hover:bg-primary-600/20 rounded transition-colors"
          >
            <LogOut size={16} className="text-red-600" />
            <span>{t('userProfile.logout')}</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
