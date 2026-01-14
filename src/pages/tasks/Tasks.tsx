import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

export function Tasks(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('nav.tasks');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('tasks.title')}</h1>
      <p className="text-gray-600">{t('tasks.description')}</p>
    </div>
  );
}

export default Tasks;
