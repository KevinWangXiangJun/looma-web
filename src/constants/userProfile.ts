/**
 * 用户资料菜单配置
 * 定义用户个人资料菜单项的配置
 */
import { Palette, HelpCircle, Zap, CreditCard, Download, Settings } from 'lucide-react';
import type { UserProfileMenuItem } from '@/types';

export const createUserProfileMenuItems = (
  actions: {
    onSettings: () => void;
    onTheme: () => void;
    onHelp: () => void;
    onAdvancedTools: () => void;
    onPricing: () => void;
    onBuyHistory: () => void;
  }
): UserProfileMenuItem[] => [
  {
    id: 'settings',
    icon: Settings,
    labelKey: 'userProfile.settings',
    labelFallback: 'Settings',
    action: actions.onSettings,
    showChevron: false,
  },
  {
    id: 'theme',
    icon: Palette,
    labelKey: 'userProfile.theme',
    labelFallback: 'Theme',
    action: actions.onTheme,
    showChevron: false,
  },
  {
    id: 'help',
    icon: HelpCircle,
    labelKey: 'userProfile.help',
    labelFallback: 'Help & Resources',
    action: actions.onHelp,
    showChevron: false,
  },
  {
    id: 'advancedTools',
    icon: Zap,
    labelKey: 'userProfile.advancedTools',
    labelFallback: 'Advanced Tools (Trial)',
    action: actions.onAdvancedTools,
    showChevron: true,
  },
  {
    id: 'pricing',
    icon: CreditCard,
    labelKey: 'userProfile.pricing',
    labelFallback: 'Subscription Plans & Pricing',
    action: actions.onPricing,
    showChevron: false,
  },
  {
    id: 'buyHistory',
    icon: Download,
    labelKey: 'userProfile.buyHistory',
    labelFallback: 'Purchase History',
    action: actions.onBuyHistory,
    showChevron: false,
  },
];
