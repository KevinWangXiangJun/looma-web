import React, { useEffect } from 'react';
import Sidebar from './Sidebar';

/**
 * 主布局组件
 * 左侧 Sidebar + 右侧内容区域的两部分布局
 */
export const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  useEffect(() => {
    // 路由变化时滚动到顶部
    const mainScrollContainer = document.getElementById('main-content-scroll');
    if (mainScrollContainer) {
      mainScrollContainer.scrollTop = 0;
    }
  }, [children]);

  return (
    <div className="flex h-screen w-full bg-white transition-all overflow-hidden">
      {/* 左侧：Sidebar */}
      <Sidebar />

      {/* 右侧：内容区域 */}
      <main className="flex-1 h-full overflow-hidden relative flex flex-col">
        <div id="main-content-scroll" className="flex-1 overflow-auto scroll-smooth" style={{ scrollbarGutter: 'stable' }}>
          <div className="w-full bg-white p-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
