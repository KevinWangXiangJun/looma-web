/**
 * 隐私信息卡片组件
 * 显示照片隐私信息说明和用户教育内容
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lightbulb, Shield, AlertTriangle, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const InfoCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* 主要隐私信息卡片 */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">{t('tools.photoPrivacyViewer.aboutPhotoPrivacy', '照片中的隐私信息')}</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <span className="font-medium">{t('tools.photoPrivacyViewer.gpsData', 'GPS 数据')}:</span> {t('tools.photoPrivacyViewer.gpsDataDesc', '显示照片拍摄的确切位置')}
          </li>
          <li>
            <span className="font-medium">{t('tools.photoPrivacyViewer.deviceInfo', '设备信息')}:</span> {t('tools.photoPrivacyViewer.deviceInfoDesc', '包括相机品牌、型号等个人识别信息')}
          </li>
          <li>
            <span className="font-medium">{t('tools.photoPrivacyViewer.shootingTime', '拍摄时间')}:</span> {t('tools.photoPrivacyViewer.shootingTimeDesc', '记录照片的拍摄日期和时间')}
          </li>
        </ul>
      </Card>

      {/* 平台隐私说明卡片 */}
      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-gray-900">{t('tools.photoPrivacyViewer.platformPrivacy', '社交平台隐私说明')}</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <span className="font-medium">微信、QQ、微博：</span>
            自动剥离 EXIF 数据，相对安全
          </li>
          <li>
            <span className="font-medium">Facebook、Instagram：</span>
            大多数情况下移除 EXIF，但建议自行检查
          </li>
          <li>
            <span className="font-medium">个人博客、云盘：</span>
            可能保留 EXIF 数据，建议先清理后上传
          </li>
          <li>
            <span className="font-medium">邮件、文件分享：</span>
            通常保留原始数据，务必先清理
          </li>
        </ul>
      </Card>

      {/* 隐私保护和功能说明卡片 */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">{t('tools.photoPrivacyViewer.privacyProtection', '隐私保护')}</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{t('tools.photoPrivacyViewer.localProcessing', '本地处理：所有操作均在您的浏览器中进行')}</span>
            </div>
          </li>
          <li>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{t('tools.photoPrivacyViewer.noUpload', '无上传：处理的照片数据不会上传到任何服务器')}</span>
            </div>
          </li>
          <li>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{t('tools.photoPrivacyViewer.noCaching', '无缓存：刷新页面后数据自动清除')}</span>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default InfoCard;
