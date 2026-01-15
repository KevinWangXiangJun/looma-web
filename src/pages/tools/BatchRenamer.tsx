/**
 * 批量重命名工具组件
 */
import { useTranslation } from 'react-i18next';
import { Files } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function BatchRenamer(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-200 rounded-lg">
          <Files className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('tools.batchRenamer.name')}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {t('tools.batchRenamer.description')}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            支持的重命名模式
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span><strong>序列号模式：</strong>image_001.jpg, image_002.jpg</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span><strong>日期时间模式：</strong>使用当前日期时间命名</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span><strong>查找替换：</strong>替换文件名中的特定文本</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span><strong>大小写转换：</strong>转换为大写、小写或标题格式</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            高级功能
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              支持多种文件类型
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              预览重命名结果
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              撤销操作功能
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              自定义规则保存
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full">
          选择文件
        </Button>
      </div>
    </div>
  );
}

export default BatchRenamer;
