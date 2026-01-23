import { Suspense, lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { Loader2 } from 'lucide-react';
import ProtectedRoute from './ProtectedRoute';

// 路由懒加载 - 性能优化
const Login = lazy(() => import('@/pages/login'));
const Home = lazy(() => import('@/pages/home'));
const Projects = lazy(() => import('@/pages/projects'));
const Brands = lazy(() => import('@/pages/brands'));
const Gallery = lazy(() => import('@/pages/gallery'));
const Tools = lazy(() => import('@/pages/tools'));
const Tasks = lazy(() => import('@/pages/tasks'));
const Templates = lazy(() => import('@/pages/templates'));
const Apps = lazy(() => import('@/pages/apps'));
const ContentPlanning = lazy(() => import('@/pages/contentPlanning'));
const MarketingStudio = lazy(() => import('@/pages/marketingStudio'));
const DesignSchool = lazy(() => import('@/pages/designSchool'));

// 加载中组件
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
  </div>
);

/**
 * 应用路由配置
 * 定义所有页面的路由
 * 登录后的所有页面都由 MainLayout 包裹
 */
function AppRoutes(): JSX.Element {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}

export default AppRoutes;

export const router = {
  ...ROUTES,
};
