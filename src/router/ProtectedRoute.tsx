import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { MainLayout } from '@/pages/layout';
import { ROUTES } from '@/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 受保护的路由包装器
 * 检查用户是否已登录，如果未登录则重定向到登录页
 * 如果已登录，使用 MainLayout 包裹内容
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { user, isAuthenticated, isInitialized } = useAuthStore();

  // 等待初始化完成（从 localStorage 恢复状态）
  if (!isInitialized) {
    return <div />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default ProtectedRoute;
