import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { zhCN } from '@/i18n/locales/zh-CN';
import { en } from '@/i18n/locales/en';
import { LANGUAGE_CONFIG, STORAGE_KEYS } from '@/constants';

/**
 * i18n 配置和初始化
 * 支持中文和英文两种语言
 */

// 获取保存的语言或使用默认语言
const getSavedLanguage = (): string => {
  const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  return saved || LANGUAGE_CONFIG.ZH_CN;
};

// i18n 资源配置
const resources = {
  [LANGUAGE_CONFIG.ZH_CN]: {
    translation: zhCN,
  },
  [LANGUAGE_CONFIG.EN]: {
    translation: en,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: LANGUAGE_CONFIG.ZH_CN,
    interpolation: {
      escapeValue: false, // React 已经保护 XSS
    },
    react: {
      useSuspense: false, // 禁用 Suspense 以避免加载问题
    },
  });

// 监听语言变化并保存到本地存储
i18n.on('languageChanged', (lng: string) => {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, lng);
});

export default i18n;
