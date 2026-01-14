import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

export function ContentPlanning(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('nav.contentPlanning');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('contentPlanning.title')}</h1>
      <p className="text-gray-600">{t('contentPlanning.description')}</p>
    </div>
  );
}

export default ContentPlanning;
