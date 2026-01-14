import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

export function Templates(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('nav.templates');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('templates.title')}</h1>
      <p className="text-gray-600">{t('templates.description')}</p>
    </div>
  );
}

export default Templates;
