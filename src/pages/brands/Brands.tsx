import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

/**
 * 品牌页面
 */
export const Brands = (): JSX.Element => {
  const { t } = useTranslation();
  usePageTitle('navigation.brands');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('brands.title')}</h1>
      <p className="text-gray-600">{t('brands.description')}</p>
    </div>
  );
};

export default Brands;
