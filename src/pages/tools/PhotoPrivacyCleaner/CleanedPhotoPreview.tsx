/**
 * 清理后照片预览组件
 * 显示清理后的照片及下载按钮
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Download, Check } from 'lucide-react';

interface CleanedPhotoPreviewProps {
  image: string | null;
  onDownload: () => void;
}

export const CleanedPhotoPreview: React.FC<CleanedPhotoPreviewProps> = ({
  image,
  onDownload,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">{t('tools.photoPrivacyCleaner.cleanedPhoto', '清理后的图片')}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 font-medium rounded transition-colors"
          >
            <Download className="w-4 h-4" />
            {t('tools.photoPrivacyCleaner.download', '下载')}
          </button>
        </div>
      </div>
      {image ? (
        <img
          src={image}
          alt="Cleaned"
          className="w-full max-h-[70vh] rounded-lg object-contain bg-gray-100 mb-4"
        />
      ) : null}
      <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
        <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-4 h-4 text-white" />
        </div>
        <p className="text-sm text-green-700">
          {t('tools.photoPrivacyCleaner.cleanedSuccess', '所有隐私信息已被移除，图片质量保持不变')}
        </p>
      </div>
    </Card>
  );
};

export default CleanedPhotoPreview;
