import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { useNotificationStore } from '@/store';
import { NotificationPanel } from './NotificationPanel';

/**
 * 通知按钮组件
 * 位于侧边栏底部，点击打开通知弹框
 * 显示未读通知计数
 */
export const NotificationButton = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="cursor-pointer hover:opacity-80 transition-opacity relative">
          <div className="p-2 rounded-md flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors duration-200">
            <Bell size={26} className="stroke-[1.5px]" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={12} align="start" className="w-[25rem] p-0">
        <NotificationPanel />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
