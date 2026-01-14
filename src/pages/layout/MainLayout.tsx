import React from 'react';
import Sidebar from './Sidebar';

/**
 * 主布局组件
 * 左侧 Sidebar + 右侧内容区域的两部分布局
 */
export const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 via-primary-50 to-pink-50 transition-all overflow-hidden">
      {/* 左侧：Sidebar */}
      <Sidebar />

      {/* 右侧：内容区域 */}
      <main className="flex-1 h-full overflow-hidden relative flex flex-col">
        <div className="flex-1 overflow-auto scroll-smooth pl-4 pt-2 pr-2 pb-2">
          <div className="w-full rounded-md bg-white p-6 border border-gray-200">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
