/**
 * 照片隐私查看器页面
 * 支持上传图片、查看 EXIF 信息、清理隐私数据
 * 帮助用户识别和保护照片中的隐私信息
 */
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Download, RotateCcw, Shield, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { removeExifFromImage, downloadCleanedImage, ExifInfo, extractExifFromImage, hasPrivacyData } from '@/utils/exifTools';
import { Card } from '@/components/ui';
import { useToolsStore } from '@/store';
import {
  UploadSection,
  InfoCard,
  PhotoPreview,
  PhotoInfo,
  ExifInfoDisplay,
  CleanedPhotoPreview,
} from './index';

interface PhotoState {
  originalFile: File | null;
  originalImage: string | null;
  cleanedBlob: Blob | null;
  cleanedImage: string | null;
  exifInfo: ExifInfo | null;
  isLoading: boolean;
  error: string | null;
  fileInfo?: {
    size: number;
    width?: number;
    height?: number;
    format: string;
  };
}

export const PhotoPrivacyViewer: React.FC = () => {
  const { t } = useTranslation();
  const { setSelectedToolId } = useToolsStore();
  const [state, setState] = useState<PhotoState>({
    originalFile: null,
    originalImage: null,
    cleanedBlob: null,
    cleanedImage: null,
    exifInfo: null,
    isLoading: false,
    error: null,
    fileInfo: undefined,
  });

  /**
   * 处理文件选择
   */
  const handleFileSelect = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // 并行处理：提取 EXIF 数据和读取图片
      let exifInfo: ExifInfo | null = null;
      
      // 1. 提取 EXIF 数据
      try {
        exifInfo = await extractExifFromImage(file);
      } catch (err) {
        console.error('EXIF extraction error:', err);
        exifInfo = null;
      }

      // 2. 读取并显示图片
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        
        try {
          // 获取图片尺寸
          const img = new Image();
          let width: number | undefined;
          let height: number | undefined;
          
          img.onload = () => {
            width = img.width;
            height = img.height;

            setState((prev) => ({
              ...prev,
              originalFile: file,
              originalImage: imageData,
              exifInfo,
              fileInfo: {
                size: file.size,
                width,
                height,
                format: file.type || 'unknown',
              },
              isLoading: false,
            }));
          };

          img.onerror = () => {
            setState((prev) => ({
              ...prev,
              originalFile: file,
              originalImage: imageData,
              exifInfo,
              fileInfo: {
                size: file.size,
                format: file.type || 'unknown',
              },
              isLoading: false,
            }));
          };

          img.src = imageData;
        } catch (err) {
          console.error('Image loading error:', err);
          setState((prev) => ({
            ...prev,
            error: t('tools.photoPrivacyViewer.imageFailed', '图片处理失败'),
            isLoading: false,
          }));
        }
      };
      
      reader.onerror = () => {
        setState((prev) => ({
          ...prev,
          error: t('tools.photoPrivacyViewer.fileReadFailed', '文件读取失败'),
          isLoading: false,
        }));
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: t('tools.photoPrivacyViewer.fileReadFailed', '文件读取失败'),
        isLoading: false,
      }));
    }
  };

  /**
   * 清理照片
   */
  const handleCleanPhoto = async () => {
    if (!state.originalFile) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const cleanedBlob = await removeExifFromImage(state.originalFile);
      const cleanedImage = URL.createObjectURL(cleanedBlob);

      setState((prev) => ({
        ...prev,
        cleanedBlob,
        cleanedImage,
        isLoading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: t('tools.photoPrivacyViewer.imageCleanFailed', '图片清理失败'),
        isLoading: false,
      }));
    }
  };

  /**
   * 下载清理后的图片
   */
  const handleDownload = () => {
    if (!state.cleanedBlob || !state.originalFile) return;
    downloadCleanedImage(state.cleanedBlob, state.originalFile.name);
  };

  /**
   * 重置状态
   */
  const handleReset = () => {
    setState({
      originalFile: null,
      originalImage: null,
      cleanedBlob: null,
      cleanedImage: null,
      exifInfo: null,
      isLoading: false,
      error: null,
      fileInfo: undefined,
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="w-full mx-auto space-y-4">
        {/* 页面标题 */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-3 bg-primary-200 rounded-lg">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('tools.photoPrivacyViewer.name', '照片隐私查看器')}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {t('tools.photoPrivacyViewer.description', '检查和清理照片中的隐私信息（GPS、设备信息、拍摄时间等）')}
                </p>
              </div>
            </div>
            {/* 返回按钮 */}
            <button
              onClick={() => setSelectedToolId(null)}
              className="ml-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="返回工具首页"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </Card>

        {/* 错误提示 */}
        {state.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">{state.error}</p>
            </div>
          </div>
        )}

        {!state.originalFile ? (
          // 初始上传状态
          <div className="space-y-4">
            <UploadSection onFileSelect={handleFileSelect} />
          </div>
        ) : (
          // 图片处理界面
          <div className="space-y-4">
            {/* 操作栏：标题 + 重新选择 + 操作按钮 */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">{t('tools.photoPrivacyViewer.photoInfoAndClean', '照片信息与清理')}</h2>
              <div className="flex items-center gap-4">
                {/* 仅在包含隐私数据时显示操作按钮 */}
                {hasPrivacyData(state.exifInfo) && (
                  <>
                    {!state.cleanedImage ? (
                      <button
                        onClick={handleCleanPhoto}
                        disabled={state.isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {state.isLoading ? t('tools.photoPrivacyViewer.processing', '处理中...') : t('tools.photoPrivacyViewer.cleanPrivacy', '一键清除隐私')}
                      </button>
                    ) : (
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        {t('tools.photoPrivacyViewer.downloadCleaned', '下载清理后的图片')}
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 bg-gray-50 hover:bg-gray-200 font-medium text-sm rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('tools.photoPrivacyViewer.reselect', '重新选择')}
                </button>
              </div>
            </div>

            {/* 主要内容区：左侧大图 + 右侧信息 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 左侧：原始图片预览（占 2/3） */}
              <div className="lg:col-span-2">
                <PhotoPreview image={state.originalImage} />
              </div>

              {/* 右侧：信息和隐私警告（占 1/3） */}
              <div className="lg:col-span-1 space-y-4 overflow-y-auto" style={{ maxHeight: '75vh' }}>
                {/* 照片基础信息 */}
                <PhotoInfo
                  fileName={state.originalFile?.name}
                  fileSize={state.fileInfo?.size}
                  format={state.fileInfo?.format}
                  width={state.fileInfo?.width}
                  height={state.fileInfo?.height}
                />

                {/* EXIF 隐私信息 */}
                <ExifInfoDisplay
                  exifInfo={state.exifInfo}
                  isLoading={state.isLoading}
                />
              </div>
            </div>

            {/* 清理后的图片预览 */}
            {state.cleanedImage && (
              <CleanedPhotoPreview
                image={state.cleanedImage}
                onDownload={handleDownload}
              />
            )}
          </div>
        )}

        {/* 隐私信息卡片 - 底部 */}
        <div className="mt-4">
          <InfoCard />
        </div>
      </div>
    </div>
  );
};

export default PhotoPrivacyViewer;
