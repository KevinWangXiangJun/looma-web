/**
 * 文档转换器工具组件
 */
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DocumentConverter(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-200 rounded-lg">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('tools.documentConverter.name')}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {t('tools.documentConverter.description')}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            支持的格式转换
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-medium text-gray-700">从格式</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PDF</li>
                <li>• DOCX</li>
                <li>• DOC</li>
                <li>• TXT</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-700">到格式</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PDF</li>
                <li>• DOCX</li>
                <li>• HTML</li>
                <li>• TXT</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            功能特性
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              高质量格式转换
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              批量处理支持
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              保留原始格式
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              快速处理速度
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full">
          开始转换
        </Button>
      </div>
    </div>
  );
}

export default DocumentConverter;
