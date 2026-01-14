import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

export function AITools(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('navigation.aiTools');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('aiTools.title')}</h1>
      <p className="text-gray-600">{t('aiTools.description')}</p>
    </div>
  );
}

export default AITools;
