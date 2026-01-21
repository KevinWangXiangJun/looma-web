/**
 * 工具主页面组件
 * 当未选择任何工具时显示，展示所有工具的介绍卡片
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useToolsStore } from '@/store';
import { TOOLS, getColorVariant } from '@/constants/tools';
import { Card } from '@/components/ui/Card';
import { Lightbulb, Zap, Users, Award } from 'lucide-react';
import type { Tool } from '@/types/tools';

export const ToolsHomepage: React.FC = memo(() => {
  const { t } = useTranslation();
  // 性能优化：直接获取 action，无需订阅状态
  const setSelectedToolId = useToolsStore(state => state.setSelectedToolId);

  const handleSelectTool = (tool: Tool) => {
    // 从主页点击工具卡片时，直接选中该工具
    setSelectedToolId(tool.id);
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* 页面头部 */}
      <section className="px-6 py-12 rounded-lg bg-gradient-to-r from-primary-600 via-primary-500 to-blue-500 text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-3 leading-tight">
            {t('tools.title')}
          </h1>
          <p className="text-lg text-primary-100 mb-6">
            {t('tools.description')}
          </p>
          
          {/* 统计信息 */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8" />
                <div>
                  <p className="text-sm text-primary-100">高效工具</p>
                  <p className="text-2xl font-bold">{TOOLS.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <div>
                  <p className="text-sm text-primary-100">用户信任</p>
                  <p className="text-2xl font-bold">10K+</p>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <p className="text-sm text-primary-100">功能完善</p>
                  <p className="text-2xl font-bold">100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 工具卡片网格 */}
      <section className="px-6 py-12 rounded-lg w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 my-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('tools.availableTools', '全部工具')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('tools.toolsDesc', '选择下方任意工具开始使用')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => {
            const IconComponent = tool.icon;
            const colorVariant = getColorVariant(tool.color);
            return (
              <button
                key={tool.id}
                onClick={() => handleSelectTool(tool)}
                className="h-full text-left transition-all duration-300 hover:scale-105 focus:outline-none group"
              >
                <Card className="h-full px-4 py-6 hover:shadow-xl hover:border-primary-300 cursor-pointer bg-white relative overflow-hidden">
                  {/* 背景装饰 */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${colorVariant.bg} opacity-10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-300`}></div>
                  
                  {/* 内容 */}
                  <div className="relative z-10">
                    {/* 图标和标题在一行 */}
                    <div className="flex items-center gap-3 mb-4">
                      {IconComponent ? (
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${colorVariant.bg} flex items-center justify-center shadow-sm`}>
                          <IconComponent className={`w-7 h-7 ${colorVariant.text}`} />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shadow-sm">
                          🔧
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
                        {t(tool.name as string)}
                      </h3>
                    </div>

                    {/* 分类标签 */}
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorVariant.badge}`}>
                        {tool.category && t(`tools.categories.${tool.category}` as any) || tool.category}
                      </span>
                    </div>

                    {/* 描述 */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {t(tool.description as string)}
                    </p>

                    {/* 功能列表 */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className={`w-1.5 h-1.5 rounded-full ${colorVariant.text}`}></span>
                        <span>{t(tool.feature1Key || 'tools.feature1', '快速处理')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className={`w-1.5 h-1.5 rounded-full ${colorVariant.text}`}></span>
                        <span>{t(tool.feature2Key || 'tools.feature2', '易于使用')}</span>
                      </div>
                    </div>

                    {/* CTA 按钮 */}
                    <div className={`pt-3 border-t border-gray-100 flex items-center gap-2 ${colorVariant.text} font-semibold text-sm group-hover:gap-3 transition-all`}>
                      <span>{t('common.startUsing', '开始使用')}</span>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      </section>

      {/* 优势展示 */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('tools.benefits', '为什么选择我们')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t('tools.benefit1', '高效处理')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('tools.benefit1Desc', '先进的算法和优化，确保最快的处理速度')}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t('tools.benefit2', '用户友好')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('tools.benefit2Desc', '简洁直观的界面设计，无需复杂操作')}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t('tools.benefit3', '专业可靠')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('tools.benefit3Desc', '经过严格测试，为专业用户所信赖')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 快速开始指南 */}
      <section className="px-6 pt-12 pb-2 w-full">
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary-600" />
            {t('tools.quickStart', '快速开始')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-600 text-white font-bold text-sm">
                  1
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t('tools.step1', '选择工具')}</p>
                <p className="text-sm text-gray-600">{t('tools.step1Desc', '从上面选择你需要的工具')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-600 text-white font-bold text-sm">
                  2
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t('tools.step2', '上传文件')}</p>
                <p className="text-sm text-gray-600">{t('tools.step2Desc', '导入你要处理的文件')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-600 text-white font-bold text-sm">
                  3
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t('tools.step3', '获取结果')}</p>
                <p className="text-sm text-gray-600">{t('tools.step3Desc', '处理完成后下载你的文件')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default ToolsHomepage;
