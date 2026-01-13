import { Navigate, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';

/**
 * 应用路由配置
 * 定义所有页面的路由
 */
function AppRoutes(): JSX.Element {
  return (
    <Routes>
      {/* 登录页面 */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* 首页 */}
      <Route path={ROUTES.HOME} element={<HomePage />} />

      {/* 默认路由跳转 */}
      <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />

      {/* 404 页面 */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default AppRoutes;

export const router = {
  ...ROUTES,
};
