import React, { useEffect, useRef } from 'react';
import { useNavigationStore } from '@/store';
import Sidebar from './Sidebar';
import { cn } from '@/utils/cn';

/**
 * 主布局组件
 * 左侧 Sidebar + 右侧内容区域的两部分布局
 */
export const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const isSidebarCollapsed = useNavigationStore((state) => state.isSidebarCollapsed);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 路由变化时滚动到顶部
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [children]);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Sidebar 容器: 使用 tailwind 类处理过渡 */}
      <aside 
        className={cn(
          "flex-shrink-0 transition-all duration-300 ease-in-out border-r border-gray-100",
          isSidebarCollapsed ? "w-[72px]" : "w-[280px]" // 72px + 16.5rem(approx 264px) -> keeping 280px as standard width or adjusting to match text
        )}
      >
        <Sidebar />
      </aside>

      {/* 右侧：内容区域 */}
      <main className="flex-1 h-full overflow-hidden relative flex flex-col min-w-0">
        <div 
          ref={scrollRef}
          id="main-content-scroll" 
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{ scrollbarGutter: 'stable' }}
        >
          <div className="w-full bg-main-bg p-4 md:p-6 min-h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
