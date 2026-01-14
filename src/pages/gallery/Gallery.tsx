import { usePageTitle } from '@/hooks';
import { useTranslation } from 'react-i18next';

export function Gallery(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('navigation.gallery');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('gallery.title')}</h1>
      <p className="text-gray-600">{t('gallery.description')}</p>
    </div>
  );
}

export default Gallery;
