import {
  Home,
  CheckSquare,
  Image,
  Wand2,
  Folder,
  Palette,
  LayoutTemplate,
  Puzzle,
  Calendar,
  PiggyBank,
  BookOpen,
} from 'lucide-react';
import type { NavItem } from '@/types';
import type { TFunction } from 'i18next';

/**
 * 主导航项
 * 始终显示在侧边栏上方
 */
export const getNavItems = (t: TFunction): NavItem[] => [
  {
    id: 'home',
    label: t('navigation.home') || 'Home',
    icon: Home,
    path: '/home',
    description: t('navSubtitles.home') || 'Manage your home page',
  },
  {
    id: 'tools',
    label: t('navigation.tools') || 'Tools',
    icon: Wand2,
    path: '/tools',
    description: t('navSubtitles.tools') || 'Manage your tools',
  },
  {
    id: 'projects',
    label: t('navigation.projects') || 'Projects',
    icon: Folder,
    path: '/projects',
    description: t('navSubtitles.projects') || 'Manage your projects',
  },
  {
    id: 'brands',
    label: t('navigation.brands') || 'Brands',
    icon: Palette,
    path: '/brands',
    description: t('navSubtitles.brands') || 'Manage your brands',
  },
  {
    id: 'gallery',
    label: t('navigation.gallery') || 'Gallery',
    icon: Image,
    path: '/gallery',
    description: t('navSubtitles.gallery') || 'Browse your media gallery',
  },
];

/**
 * 更多导航项
 * 显示在"更多"下拉菜单中
 */
export const getMoreNavItems = (t: TFunction): NavItem[] => [
  {
    id: 'tasks',
    label: t('navigation.tasks') || 'Tasks',
    icon: CheckSquare,
    path: '/tasks',
    description: t('navSubtitles.tasks') || 'View and manage your tasks',
  },
  {
    id: 'templates',
    label: t('navigation.templates') || 'Templates',
    icon: LayoutTemplate,
    path: '/templates',
    description: t('navSubtitles.templates') || 'Browse content templates',
  },
  {
    id: 'apps',
    label: t('navigation.apps') || 'Apps',
    icon: Puzzle,
    path: '/apps',
    description: t('navSubtitles.apps') || 'Install and manage apps',
  },
  {
    id: 'contentPlanning',
    label: t('navigation.contentPlanning') || 'Content Planning',
    icon: Calendar,
    path: '/contentPlanning',
    description: t('navSubtitles.contentPlanning') || 'Plan your content strategy',
  },
  {
    id: 'marketingStudio',
    label: t('navigation.marketingStudio') || 'Marketing Studio',
    icon: PiggyBank,
    path: '/marketingStudio',
    description: t('navSubtitles.marketingStudio') || 'Marketing tools and resources',
  },
  {
    id: 'designSchool',
    label: t('navigation.designSchool') || 'Design School',
    icon: BookOpen,
    path: '/designSchool',
    description: t('navSubtitles.designSchool') || 'Learn design principles',
  },
];
