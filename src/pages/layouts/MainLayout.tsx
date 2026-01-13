import React from 'react';
import { Sidebar } from '@/pages/layouts/Sidebar';

/**
 * 主布局组件
 * 包含 Sidebar 和内容区域
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区域 */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
export { MainLayout };
