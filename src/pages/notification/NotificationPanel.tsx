import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '@/store';

/**
 * 通知面板组件
 * 展示通知列表，如果没有通知则显示骨架图
 */
export const NotificationPanel = (): JSX.Element => {
  const { t } = useTranslation();
  const notifications = useNotificationStore((state) => state.notifications);
  const isLoading = useNotificationStore((state) => state.isLoading);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);

  // 骨架图组件
  const SkeletonLoader = () => (
    <div className="space-y-6 p-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-3 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 mt-1 bg-gray-300 rounded w-full"></div>
            <div className="h-3 mt-1 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg">
      {/* 头部 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{t('common.notifications')}</h3>
        <button
          onClick={() => markAllAsRead()}
          disabled={notifications.length === 0}
          className={`text-sm font-medium transition-colors ${
            notifications.length === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-primary-600 hover:text-primary-700'
          }`}
        >
          {t('common.markAllAsRead')}
        </button>
      </div>

      {/* 通知列表或骨架图 */}
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <SkeletonLoader />
        ) : notifications.length === 0 ? (
          <>
            <SkeletonLoader />
            {/* 空状态提示 */}
            <div className="px-4 py-3 text-center text-gray-500 text-sm">
              <p>{t('common.noNotifications')}</p>
            </div>
          </>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => {
                  if (!notification.isRead) {
                    markAsRead(notification.id);
                  }
                }}
                className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex gap-3">
                  {/* 头像占位符 */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-blue-500 flex-shrink-0"></div>
                  
                  {/* 通知内容 */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                  
                  {/* 未读指示 */}
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部 - 查看全部 */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            {t('common.viewAllNotifications')}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
