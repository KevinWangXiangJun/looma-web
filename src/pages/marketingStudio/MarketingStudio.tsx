import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

export function MarketingStudio(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('nav.marketingStudio');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('marketingStudio.title')}</h1>
      <p className="text-gray-600">{t('marketingStudio.description')}</p>
    </div>
  );
}

export default MarketingStudio;
