import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

/**
 * 项目页面
 */
export const Projects = (): JSX.Element => {
  const { t } = useTranslation();
  usePageTitle('navigation.projects');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('projects.title')}</h1>
      <p className="text-gray-600">{t('projects.description')}</p>
    </div>
  );
};

export default Projects;
