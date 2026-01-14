import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { useAuthStore, useNavigationStore } from '@/store';
import AppRoutes from '@/router';

/**
 * 应用主入口组件
 * 包含路由、国际化等全局配置
 */
function App(): JSX.Element {
  const restoreFromStorage = useAuthStore((state) => state.restoreFromStorage);
  const restoreCollapsedState = useNavigationStore((state) => state.restoreCollapsedState);

  // 应用初始化时，从本地存储恢复认证状态和导航状态
  useEffect(() => {
    restoreFromStorage();
    restoreCollapsedState();
  }, [restoreFromStorage, restoreCollapsedState]);

  return (
    <I18nextProvider i18n={i18n}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </Router>
    </I18nextProvider>
  );
}

export default App;
