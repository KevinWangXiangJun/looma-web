import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from '@/components/ui/Carousel';
import carousel1 from '@/assets/images/carousel-1.jfif';
import carousel2 from '@/assets/images/carousel-2.jfif';
import carousel3 from '@/assets/images/carousel-3.jfif';
import carousel4 from '@/assets/images/carousel-4.jpg';
import carousel5 from '@/assets/images/carousel-5.jpg';
import carousel6 from '@/assets/images/carousel-6.jpg';

export const LoginCarousel = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const carouselItems = useMemo(() => {
    return [carousel1, carousel2, carousel3, carousel4, carousel5, carousel6];
  }, []);

  return (
    <div className="hidden md:flex lg:w-3/5 md:w-1/2 flex-col h-full pt-10 relative items-center justify-start">
      {/* 内容 - 轮播图和副事 */}
      <div className="flex-1 flex flex-col items-center justify-start w-full px-6 ">
        <div className="w-full aspect-[4/5] max-h-[70vh] relative">
          <Carousel
            items={carouselItems}
            autoplay
            interval={5000}
            className="w-full h-full rounded absolute inset-0 object-cover"
            showNavigation={false}
          />
        </div>
      </div>

      {/* 页脚 - 固定位置 */}
      <div className="absolute bottom-5 left-0 w-full text-center text-xs text-gray-500 z-10">
        <div className="flex flex-col items-center justify-center">
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
  );
};
