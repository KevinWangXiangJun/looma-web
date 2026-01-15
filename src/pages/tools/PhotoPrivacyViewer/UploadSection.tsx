/**
 * 照片上传区域组件
 * 包含标题、上传/图库按钮和文件上传界面
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { FileUpload } from '@/components/common';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface UploadSectionProps {
  onFileSelect: (files: File[]) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onFileSelect }) => {
  const { t } = useTranslation();

  return (
    <Card className="p-4">
      {/* 标题 + 上传/图库按钮 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{t('tools.photoPrivacyViewer.selectPhoto', '上传照片检查隐私信息')}</h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              const input = document.querySelector('input[type="file"]') as HTMLInputElement;
              input?.click();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            {t('tools.photoPrivacyViewer.uploadBtn', '上传')}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 bg-gray-50 hover:bg-gray-200 font-medium text-sm rounded-lg transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
            {t('tools.photoPrivacyViewer.galleryBtn', '图库')}
          </button>
        </div>
      </div>

      {/* FileUpload 组件 */}
      <FileUpload
        accept=".png,.jpg,.jpeg,.bmp,image/png,image/jpeg,image/bmp"
        multiple={false}
        onFileSelect={onFileSelect}
        title={t('tools.photoPrivacyViewer.selectPhotoTitle', '检查照片隐私信息')}
        description={t('tools.photoPrivacyViewer.selectPhotoDesc', '拖拽或点击选择照片，查看是否包含 GPS 位置、设备信息或拍摄时间')}
        supportedFormats={t('tools.photoPrivacyViewer.supportedFormats', 'PNG、JPG、JPEG、BMP')}
        maxSize={50 * 1024 * 1024}
      />
    </Card>
  );
};

export default UploadSection;
