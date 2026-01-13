import { useMemo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from '@/components/ui/Carousel';
// import carousel1 from '@/assets/images/carousel-1.jfif';
// import carousel2 from '@/assets/assets/images/carousel-2.jfif';
// import carousel3 from '@/assets/assets/images/carousel-3.jfif';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const carouselItems = useMemo(() => {
    // const items = [carousel1, carousel2, carousel3].filter(Boolean);
    // return items.length > 0 ? items : [];
    return [];
  }, []);

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden">
      {/* 左侧 - 轮播图 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-100 to-blue-100 flex-col p-8 h-full relative">
        {/* 内容 - 轮播图和副事 */}
        <div className="flex-1 flex flex-col items-center justify-center w-full pt-24">
          <div className="w-full h-4/5 relative">
            {carouselItems.length > 0 ? (
              <Carousel
                items={carouselItems}
                autoplay
                interval={5000}
                className="w-full h-full rounded shadow-2xl absolute inset-0"
                showNavigation={false}
              />
            ) : (
              <div className="w-full h-full rounded shadow-2xl bg-gray-300 flex items-center justify-center absolute inset-0">
                <p className="text-gray-600">{t('login.layout.loadingImages')}</p>
              </div>
            )}
          </div>
        </div>

        {/* 页脚 */}
        <div className="text-center text-xs text-gray-500 flex-shrink-0">
          <div className="mt-10 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-xs">
              <span>{t('login.layout.appTagline')}</span>
              <span> | </span>
              <span>
                © {currentYear} {t('login.layout.appTitle')}. {t('login.layout.allRightsReserved')}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 右侧 - 表单内容 */}
      <div className="flex-1 flex flex-col items-center justify-start pt-20 lg:pt-32 p-6 bg-blue-100 lg:w-1/2 h-full">
        <div className="w-full max-w-sm flex flex-col">
          <div className="mb-8 pl-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t('login.layout.welcome')}{' '}
              <span className="text-primary">{t('login.layout.appTitle')}</span>
            </h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
