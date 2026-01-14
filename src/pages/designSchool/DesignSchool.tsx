import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

export function DesignSchool(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('nav.designSchool');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('designSchool.title')}</h1>
      <p className="text-gray-600">{t('designSchool.description')}</p>
    </div>
  );
}

export default DesignSchool;
