import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 自定义 Hook：动态更新页面标题
 * @param titleKey i18n key 或 纯文本标题
 * @param isKey 是否作为 i18n key 处理，默认为 true
 */
export const usePageTitle = (titleKey: string, isKey = true) => {
  const { t } = useTranslation();

  useEffect(() => {
    const appName = t('login.layout.appTitle') || 'Looma';
    const pageTitle = isKey ? t(titleKey) : titleKey;
    
    document.title = `${appName} - ${pageTitle}`;
    
    // 清理函数（可选）：如果需要离开页面时还原，可以在这里处理
    // 但通常不需要，因为下一个页面会覆盖它
  }, [t, titleKey, isKey]);
};
