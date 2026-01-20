import { Plus, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store';
import { Avatar } from '@/components/ui/Avatar';

/**
 * 账户切换器组件
 * 用于在HoverCard中展示账户信息和切换选项
 * 参考设计图2
 */
export const AccountSwitcher = (): JSX.Element => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const handleAddAccount = () => {
    // TODO: 添加其他账户
    console.log('Add another account');
  };

  const handleManageAccount = () => {
    // TODO: 管理账户
    console.log('Manage account');
  };

  return (
    <div className="space-y-2 w-80">
      {/* 当前账户 */}
      <div className="px-4 pt-3 py-2">
        <p className="text-sm font-semibold text-gray-600 uppercase mb-2">
          {t('userProfile.switchAccount') || 'Switch Account'}
        </p>
        <div className="flex items-center gap-3 px-2 py-2 pb-0">
          <Avatar
            src={user?.avatar}
            alt={user?.username || 'User'}
            initials={user?.username ? user.username.substring(0, 2) : 'U'}
            size={40}
            showBorder={false}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900">
              {user?.username || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-2 pb-3">
        <button
          onClick={handleAddAccount}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <Plus size={18} className="text-gray-600 flex-shrink-0" />
          <span>{t('userProfile.addAccount') || 'Add another account'}</span>
        </button>

        <button
          onClick={handleManageAccount}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <Settings size={18} className="text-gray-600 flex-shrink-0" />
          <span>{t('userProfile.manageAccount') || 'Manage account'}</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSwitcher;
