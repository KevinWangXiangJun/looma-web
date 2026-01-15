import { Navigate, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants';
import Login from '@/pages/login';
import Home from '@/pages/home';
import Projects from '@/pages/projects';
import Brands from '@/pages/brands';
import Gallery from '@/pages/gallery';
import Tools from '@/pages/tools';
import Tasks from '@/pages/tasks';
import Templates from '@/pages/templates';
import Apps from '@/pages/apps';
import ContentPlanning from '@/pages/contentPlanning';
import MarketingStudio from '@/pages/marketingStudio';
import DesignSchool from '@/pages/designSchool';
import ProtectedRoute from './ProtectedRoute';

/**
 * 应用路由配置
 * 定义所有页面的路由
 * 登录后的所有页面都由 MainLayout 包裹
 */
function AppRoutes(): JSX.Element {
  return (
    <Routes>
      {/* 登录页面 - 公开路由 */}
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* 首页 - 受保护路由（需要登录） */}
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* 项目页面 */}
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />

      {/* 品牌页面 */}
      <Route
        path="/brands"
        element={
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        }
      />

      {/* 图库页面 */}
      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />

      {/* 工具页面 */}
      <Route
        path="/tools"
        element={
          <ProtectedRoute>
            <Tools />
          </ProtectedRoute>
        }
      />

      {/* 任务页面 */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      {/* 模版页面 */}
      <Route
        path="/templates"
        element={
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        }
      />

      {/* 应用页面 */}
      <Route
        path="/apps"
        element={
          <ProtectedRoute>
            <Apps />
          </ProtectedRoute>
        }
      />

      {/* 内容规划页面 */}
      <Route
        path="/contentPlanning"
        element={
          <ProtectedRoute>
            <ContentPlanning />
          </ProtectedRoute>
        }
      />

      {/* 营销工作室页面 */}
      <Route
        path="/marketingStudio"
        element={
          <ProtectedRoute>
            <MarketingStudio />
          </ProtectedRoute>
        }
      />

      {/* Design School页面 */}
      <Route
        path="/designSchool"
        element={
          <ProtectedRoute>
            <DesignSchool />
          </ProtectedRoute>
        }
      />

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
