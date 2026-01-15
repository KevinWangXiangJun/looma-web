/**
 * EXIF 信息展示组件
 * 显示 GPS、相机、拍摄时间等隐私信息
 * 用户教育和隐私风险提示
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { MapPin, Camera, Clock, AlertCircle, Info } from 'lucide-react';
import { ExifInfo, hasPrivacyData } from '@/utils/exifTools';

interface ExifInfoDisplayProps {
  exifInfo: ExifInfo | null;
  isLoading?: boolean;
}

export const ExifInfoDisplay: React.FC<ExifInfoDisplayProps> = ({
  exifInfo,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  // 检查是否有任何有意义的数据
  const privacyDataExists = hasPrivacyData(exifInfo);
  const hasBasicData = exifInfo && Object.keys(exifInfo).length > 0;

  if (!hasBasicData) {
    return (
      <Card className="p-4 text-center text-gray-600">
        <p>
          {isLoading
            ? t('tools.photoPrivacyViewer.analyzingExif', '正在分析 EXIF 数据...')
            : t('tools.photoPrivacyViewer.noExifData', '该图片未包含 EXIF 数据')}
        </p>
      </Card>
    );
  }

  return (
    <>
      {/* 隐私信息警告 - 仅在有隐私数据时显示 */}
      {privacyDataExists && (
        <Card className="p-4 border-red-200 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {t('tools.photoPrivacyViewer.privacyWarning', '检测到隐私信息')}
                </div>
              </h4>
              <p className="text-sm text-red-700 mb-3">
                {t('tools.photoPrivacyViewer.privacyWarningDesc', '此照片包含可能暴露您位置和设备信息的敏感数据。强烈建议清理后再分享。')}
              </p>
              <div className="space-y-1 text-xs text-red-600">
                {exifInfo.gps && <p>• {t('tools.photoPrivacyViewer.gpsWillRemove', 'GPS 坐标信息将被移除')}</p>}
                {exifInfo.make && <p>• {t('tools.photoPrivacyViewer.deviceWillRemove', '设备品牌和型号将被移除')}</p>}
                {exifInfo.dateTimeOriginal && (
                  <p>• {t('tools.photoPrivacyViewer.timeWillRemove', '拍摄时间将被移除')}</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* GPS 信息 */}
      {exifInfo.gps && (
        <Card className="p-4 border-purple-200 bg-purple-50">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t('tools.photoPrivacyViewer.locationInfo', '位置信息 (GPS)')}
                </div>
              </h4>
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium">{t('tools.photoPrivacyViewer.latitude', '纬度')}:</span>{' '}
                  {exifInfo.gps.latitude.toFixed(6)}°
                </p>
                <p>
                  <span className="font-medium">{t('tools.photoPrivacyViewer.longitude', '经度')}:</span>{' '}
                  {exifInfo.gps.longitude.toFixed(6)}°
                </p>
                {exifInfo.gps.altitude && (
                  <p>
                    <span className="font-medium">{t('tools.photoPrivacyViewer.altitude', '海拔')}:</span>{' '}
                    {exifInfo.gps.altitude.toFixed(1)}m
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* 相机信息 */}
      {(exifInfo.make || exifInfo.model) && (
        <Card className="p-4 border-blue-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <Camera className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  {t('tools.photoPrivacyViewer.deviceInfoTitle', '设备信息')}
                </div>
              </h4>
              <div className="space-y-1 text-sm text-gray-700">
                {exifInfo.make && (
                  <p>
                    <span className="font-medium">{t('tools.photoPrivacyViewer.brand', '品牌')}:</span>{' '}
                    {exifInfo.make}
                  </p>
                )}
                {exifInfo.model && (
                  <p>
                    <span className="font-medium">{t('tools.photoPrivacyViewer.model', '型号')}:</span>{' '}
                    {exifInfo.model}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* 拍摄时间 */}
      {exifInfo.dateTimeOriginal && (
        <Card className="p-4 border-green-200 bg-green-50">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {t('tools.photoPrivacyViewer.shootingTimeTitle', '拍摄时间')}
                </div>
              </h4>
              <p className="text-sm text-gray-700">
                {exifInfo.dateTimeOriginal}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* 拍摄参数 */}
      {(exifInfo.iso ||
        exifInfo.focalLength ||
        exifInfo.fNumber ||
        exifInfo.exposureTime) && (
        <Card className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              {t('tools.photoPrivacyViewer.shootingParams', '拍摄参数')}
            </div>
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {exifInfo.iso && (
              <div>
                <p className="text-gray-600">{t('tools.photoPrivacyViewer.iso', 'ISO')}</p>
                <p className="font-medium text-gray-900">
                  {exifInfo.iso}
                </p>
              </div>
            )}
            {exifInfo.focalLength && (
              <div>
                <p className="text-gray-600">{t('tools.photoPrivacyViewer.focalLength', '焦距')}</p>
                <p className="font-medium text-gray-900">
                  {exifInfo.focalLength}
                </p>
              </div>
            )}
            {exifInfo.fNumber && (
              <div>
                <p className="text-gray-600">{t('tools.photoPrivacyViewer.aperture', '光圈')}</p>
                <p className="font-medium text-gray-900">
                  {exifInfo.fNumber}
                </p>
              </div>
            )}
            {exifInfo.exposureTime && (
              <div>
                <p className="text-gray-600">{t('tools.photoPrivacyViewer.shutterSpeed', '快门速度')}</p>
                <p className="font-medium text-gray-900">
                  {exifInfo.exposureTime}
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 无隐私数据提示 */}
      {!privacyDataExists && (
        <Card className="p-4 border-green-200 bg-green-50">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-2">
                {t('tools.photoPrivacyViewer.noPrivacyData', '好消息！')}
              </h4>
              <p className="text-sm text-green-700">
                {t('tools.photoPrivacyViewer.noPrivacyDataDesc', '此照片未包含 GPS 位置、设备信息或拍摄时间等隐私数据，可以安心分享。')}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* 隐私保护建议 - 始终显示 */}
      {hasBasicData && (
        <Card className="p-4 border-blue-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                {t('tools.photoPrivacyViewer.privacyTip', '隐私保护建议')}
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {t('tools.photoPrivacyViewer.tip1', '社交媒体通常会自动移除 EXIF 数据')}</li>
                <li>• {t('tools.photoPrivacyViewer.tip2', '个人博客或云盘可能保留原始数据，建议先检查')}</li>
                <li>• {t('tools.photoPrivacyViewer.tip3', '若发现隐私信息，可使用本工具进行清理')}</li>
                <li>• {t('tools.photoPrivacyViewer.tip4', '我们计划推出更多隐私保护功能，敬请期待')}</li>
              </ul>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ExifInfoDisplay;
