import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import AppRoutes from '@/router';

/**
 * 应用主入口组件
 * 包含路由、国际化等全局配置
 */
function App(): JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AppRoutes />
      </Router>
    </I18nextProvider>
  );
}

export default App;
