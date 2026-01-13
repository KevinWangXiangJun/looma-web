
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';

/**
 * Sidebar 组件
 * 左侧导航栏
 */
function Sidebar(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const user = useAuthStore((state) => state.user);

  const menuItems = [
    { label: t('sidebar.dashboard'), path: ROUTES.DASHBOARD, icon: '📊' },
    { label: t('sidebar.projects'), path: '#', icon: '📁' },
    { label: t('sidebar.tasks'), path: '#', icon: '✓' },
    { label: t('sidebar.analytics'), path: '#', icon: '📈' },
    { label: t('sidebar.profile'), path: ROUTES.PROFILE, icon: '👤' },
    { label: t('sidebar.settings'), path: ROUTES.SETTINGS, icon: '⚙️' },
  ];

  const handleLogoutClick = () => {
    handleLogout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col overflow-y-auto">
      {/* Logo 区 */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600">Looma</h1>
        <p className="text-xs text-gray-500 mt-1">AI 赋能平台</p>
      </div>

      {/* 用户信息区 */}
      {user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.username || user.phone}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user.username || user.phone}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* 菜单项 */}
      <nav className="flex-1 px-3 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.path !== '#') navigate(item.path);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors text-sm"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 登出按钮 */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleLogoutClick}
          variant="outline"
          className="w-full justify-center"
        >
          {t('common.logout')}
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
export { Sidebar };
