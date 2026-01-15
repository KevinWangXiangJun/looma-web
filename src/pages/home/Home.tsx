import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import { usePageTitle } from '@/hooks';
import { Sparkles, Zap, Users, TrendingUp, BarChart3, Shield, Check, Bot, Link2, Infinity, ArrowRight } from 'lucide-react';
import { CreateDialog } from '@/pages/create/CreateDialog';

/**
 * 首页
 * 展示 Hero 区、功能特性、统计数据和行业案例
 */
export function Home(): JSX.Element {
  const { t } = useTranslation();
  usePageTitle('navigation.home');
  const currentYear = new Date().getFullYear();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  /**
   * 处理立即开始按钮点击事件
   */
  const handleGetStarted = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div>
      {/* Hero 区 */}
      <section className="py-24 px-6 rounded bg-gradient-to-br from-primary-700 via-primary-500 to-cyan-500 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
            <Sparkles size={16} className="text-white" />
            <span className="text-sm text-white font-medium">{t('home.hero.poweredBy')}</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('home.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-white text-primary-600 hover:bg-gray-100" onClick={handleGetStarted}>
              {t('home.hero.getStarted')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              {t('home.hero.learnMore')}
            </Button>
          </div>

          {/* 社交证明 */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <p className="text-white/70 text-sm mb-6">{t('home.hero.trustedBy')}</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {(t('home.hero.brands', { returnObjects: true }) as string[]).map((brand, idx) => (
                <div key={idx} className="text-white/60 font-medium">{brand}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 统计数据区 */}
      <section className="py-16 px-6 rounded bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {[
            { icon: Users, key: 'users' },
            { icon: TrendingUp, key: 'projects' },
            { icon: BarChart3, key: 'uptime' },
            { icon: Zap, key: 'response' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const statData = t(`home.stats.${stat.key}`, { returnObjects: true }) as { label: string; description: string };
            return (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                  <Icon className="text-primary-600" size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{statData.label}</div>
                <p className="text-gray-600">{statData.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 功能特性区 */}
      <section className="py-24 px-6 rounded bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.features.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 特性 1 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform"><Bot className="w-12 h-12 text-primary-600" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('home.features.feature1.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('home.features.feature1.description')}
              </p>
              <div className="flex items-center text-primary-600 font-medium hover:translate-x-1 transition-transform">
                {t('home.features.feature1.learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* 特性 2 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group md:translate-y-4">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform"><Link2 className="w-12 h-12 text-blue-600" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('home.features.feature2.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('home.features.feature2.description')}
              </p>
              <div className="flex items-center text-blue-600 font-medium hover:translate-x-1 transition-transform">
                {t('home.features.feature2.learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* 特性 3 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform"><Infinity className="w-12 h-12 text-green-600" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('home.features.feature3.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('home.features.feature3.description')}
              </p>
              <div className="flex items-center text-green-600 font-medium hover:translate-x-1 transition-transform">
                {t('home.features.feature3.learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 额外功能区 */}
      <section className="py-24 px-6 rounded bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('home.collaboration.title')}</h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('home.collaboration.description')}
              </p>
              <ul className="space-y-4">
                {(t('home.collaboration.features', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-xl"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <Zap size={48} className="text-primary-600 mx-auto mb-4" />
                <p className="text-gray-600">{t('home.collaboration.preview')}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-12 h-80 flex items-center justify-center order-2">
              <div className="text-center">
                <Shield size={48} className="text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">{t('home.security.preview')}</p>
              </div>
            </div>
            <div className="order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('home.security.title')}</h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('home.security.description')}
              </p>
              <ul className="space-y-4">
                {(t('home.security.features', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 定价表预览区 */}
      <section className="py-24 px-6 rounded bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('home.pricing.title')}</h2>
            <p className="text-xl text-gray-600">{t('home.pricing.description')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(t('home.pricing.plans', { returnObjects: true }) as Array<{name: string; price: string; period?: string; features: string[]; cta: string}>).map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-8 transition-all ${
                  idx === 1
                    ? 'bg-gradient-to-br from-primary-600 to-blue-600 text-white shadow-xl scale-105'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-4xl font-bold mb-6 ${idx === 1 ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                  {plan.period && <span className="text-lg">{plan.period}</span>}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${idx === 1 ? 'bg-white/20' : 'bg-primary-100'}`}>
                        <Check className={`w-4 h-4 ${idx === 1 ? 'text-white' : 'text-primary-600'}`} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex item-center justify-start">
                    <Button
                    size="lg"
                    className={`"w-full" ${
                        idx === 1
                        ? 'bg-white text-primary-600 hover:bg-gray-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                    variant={idx === 1 ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区 */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary-700 via-primary-500 to-blue-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl opacity-90 mb-8">
            {t('home.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-white text-primary-600 hover:bg-gray-200">
              {t('home.cta.getStarted')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              {t('home.cta.scheduleDemo')}
            </Button>
          </div>
        </div>
      </section>

      {/* 页脚信息 */}
      <section className="py-12 px-6 rounded-b bg-gray-900 text-white text-center">
        <p className="text-gray-400">
          © {currentYear} {t('home.footer.copyright')} • {t('home.footer.madeBy')}
        </p>
      </section>

      {/* 创建对话框 */}
      <CreateDialog isOpen={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  );
}

export default Home;
