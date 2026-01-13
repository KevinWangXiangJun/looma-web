import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import MainLayout from '@/pages/layouts/MainLayout';

/**
 * 首页
 * 展示 Hero 区和功能特性
 */
function HomePage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <MainLayout>
      {/* Hero 区 */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default">
              {t('home.hero.getStarted')}
            </Button>
            <Button size="lg" variant="outline">
              {t('home.hero.learnMore')}
            </Button>
          </div>
        </div>
      </section>

      {/* 功能特性区 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {t('home.features.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 特性 1 */}
            <div className="text-center p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('home.features.feature1.title')}
              </h3>
              <p className="text-gray-600">{t('home.features.feature1.description')}</p>
            </div>

            {/* 特性 2 */}
            <div className="text-center p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('home.features.feature2.title')}
              </h3>
              <p className="text-gray-600">{t('home.features.feature2.description')}</p>
            </div>

            {/* 特性 3 */}
            <div className="text-center p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-4xl mb-4">∞</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('home.features.feature3.title')}
              </h3>
              <p className="text-gray-600">{t('home.features.feature3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区 */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-600 to-blue-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">{t('home.hero.title')}</h2>
          <p className="text-lg opacity-90 mb-8">{t('home.hero.description')}</p>
          <Button size="lg" variant="secondary">
            {t('home.hero.getStarted')}
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}

export default HomePage;
export { HomePage };
