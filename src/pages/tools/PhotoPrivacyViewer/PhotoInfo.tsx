/**
 * 照片基础信息组件
 * 显示文件名、大小、格式、像素等信息
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatFileSize } from '@/utils/format';
import { getFormatName } from '@/utils/tools';

interface PhotoInfoProps {
  fileName?: string;
  fileSize?: number;
  format?: string;
  width?: number;
  height?: number;
}

export const PhotoInfo: React.FC<PhotoInfoProps> = ({
  fileName,
  fileSize,
  format,
  width,
  height,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="p-4 border-l-4 border-l-primary-500">
      <div className="flex items-center gap-2 mb-3">
        <Image className="w-4 h-4 text-primary-500" />
        <h4 className="font-semibold text-gray-900">{t('tools.photoPrivacyViewer.photoInfo', '照片信息')}</h4>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between pb-2">
          <span className="text-gray-600">{t('tools.photoPrivacyViewer.fileName', '文件名')}:</span>
          <span className="font-medium text-gray-900 truncate">
            {fileName || '-'}
          </span>
        </div>
        <div className="flex justify-between pb-2">
          <span className="text-gray-600">{t('tools.photoPrivacyViewer.fileSize', '文件大小')}:</span>
          <span className="font-medium text-gray-900">
            {fileSize ? formatFileSize(fileSize) : '-'}
          </span>
        </div>
        <div className="flex justify-between pb-2">
          <span className="text-gray-600">{t('tools.photoPrivacyViewer.format', '格式')}:</span>
          <span className="font-medium text-gray-900">
            {format ? getFormatName(format) : '-'}
          </span>
        </div>
        {width && height && (
          <div className="flex justify-between pb-2">
            <span className="text-gray-600">{t('tools.photoPrivacyViewer.pixels', '像素')}:</span>
            <span className="font-medium text-gray-900">
              {width} × {height}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PhotoInfo;
