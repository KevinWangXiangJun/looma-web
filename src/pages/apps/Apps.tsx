import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

export function Apps(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('nav.apps');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('apps.title')}</h1>
      <p className="text-gray-600">{t('apps.description')}</p>
    </div>
  );
}

export default Apps;
