import { create } from 'zustand';
import { mockNotifications } from '@/__mock__';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isOpen: boolean;

  // 操作方法
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  // TODO: 实现 API 集成
  // fetchNotifications: () => Promise<void>;
}

const initializeNotifications = () => {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;
  return { notifications: mockNotifications, unreadCount };
};

export const useNotificationStore = create<NotificationState>((set) => {
  const { notifications, unreadCount } = initializeNotifications();

  return {
    notifications,
    unreadCount,
    isLoading: false,
    isOpen: false,

    addNotification: (notification: Notification) => {
      set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: notification.isRead ? state.unreadCount : state.unreadCount + 1,
      }));
    },

    markAsRead: (id: string) => {
      set((state) => {
        const notification = state.notifications.find((n) => n.id === id);
        if (notification && !notification.isRead) {
          return {
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, isRead: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          };
        }
        return state;
      });
    },

    markAllAsRead: () => {
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    },

    removeNotification: (id: string) => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    },

    clearNotifications: () => {
      set({
        notifications: [],
        unreadCount: 0,
      });
    },

    setIsOpen: (isOpen: boolean) => {
      set({ isOpen });
    },

    setIsLoading: (isLoading: boolean) => {
      set({ isLoading });
    },
  };
});
