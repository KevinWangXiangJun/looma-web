import { useCallback } from 'react';
import { useAppConfigStore } from '@/store';

/**
 * 应用配置相关 Hook
 * 提供主题、语言切换等功能
 */
export const useAppConfig = () => {
  const { language, changeLanguage, theme, changeTheme, sidebarOpen, toggleSidebar } =
    useAppConfigStore();

  /**
   * 切换语言
   */
  const handleChangeLanguage = useCallback(
    (lang: string) => {
      changeLanguage(lang);
    },
    [changeLanguage]
  );

  /**
   * 切换主题
   */
  const handleChangeTheme = useCallback(
    (newTheme: 'light' | 'dark' | 'auto') => {
      changeTheme(newTheme);
    },
    [changeTheme]
  );

  /**
   * 切换侧边栏
   */
  const handleToggleSidebar = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  return {
    language,
    handleChangeLanguage,
    theme,
    handleChangeTheme,
    sidebarOpen,
    handleToggleSidebar,
  };
};
