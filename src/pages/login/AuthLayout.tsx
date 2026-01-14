import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginCarousel } from './LoginCarousel';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-blue-300 to-primary-300 overflow-hidden items-center justify-center">
      <div className="w-full h-full max-w-[1920px] flex mx-auto relative lg:h-[90vh] lg:my-auto lg:overflow-hidden">
        {/* 左侧 - 轮播图 */}
        <LoginCarousel />

        {/* 右侧 - 表单内容 */}
        <div className="flex-1 flex flex-col items-center justify-start pt-10 lg:w-2/5 md:w-1/2 h-full relative">
          <div className="w-full max-w-sm flex flex-col">
            <div className="mb-8 pl-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t('login.layout.welcome')}{' '}
                <span className="bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">{t('login.layout.appTitle')}</span>
              </h2>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
