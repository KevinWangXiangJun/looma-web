/**
 * 隐私信息卡片组件
 * 显示照片隐私信息说明
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const InfoCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card className="p-6 bg-blue-50 border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">{t('tools.photoPrivacyCleaner.aboutPhotoPrivacy', '关于照片隐私')}</h3>
      </div>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          <span className="font-medium">{t('tools.photoPrivacyCleaner.gpsData', 'GPS 数据')}:</span> {t('tools.photoPrivacyCleaner.gpsDataDesc', '显示照片拍摄的确切位置')}
        </li>
        <li>
          <span className="font-medium">{t('tools.photoPrivacyCleaner.deviceInfo', '设备信息')}:</span> {t('tools.photoPrivacyCleaner.deviceInfoDesc', '包括相机品牌、型号等个人识别信息')}
        </li>
        <li>
          <span className="font-medium">{t('tools.photoPrivacyCleaner.shootingTime', '拍摄时间')}:</span> {t('tools.photoPrivacyCleaner.shootingTimeDesc', '记录照片的拍摄日期和时间')}
        </li>
        <li>
          <span className="font-medium">{t('tools.photoPrivacyCleaner.privacyProtection', '隐私保护')}:</span> {t('tools.photoPrivacyCleaner.privacyProtectionDesc', '本工具在本地处理，不会上传数据到服务器')}
        </li>
      </ul>
    </Card>
  );
};

export default InfoCard;
