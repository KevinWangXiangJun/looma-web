/**
 * 工具配置和数据
 */
import { Shield, FileText, Files } from 'lucide-react';
import type { Tool, ToolCategory } from '@/types/tools';

/**
 * 颜色映射配置
 * 将颜色名称映射到具体的 Tailwind CSS 类
 */
export const COLOR_VARIANTS = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    darkText: 'text-blue-700',
    border: 'border-blue-400',
    hoverBorder: 'hover:border-blue-400',
    hoverBg: 'hover:bg-blue-50',
    badge: 'bg-blue-50 text-blue-700',
    selectedBg: 'bg-blue-600',
    selectedText: 'text-white',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    darkText: 'text-green-700',
    border: 'border-green-400',
    hoverBorder: 'hover:border-green-400',
    hoverBg: 'hover:bg-green-50',
    badge: 'bg-green-50 text-green-700',
    selectedBg: 'bg-green-600',
    selectedText: 'text-white',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    darkText: 'text-purple-700',
    border: 'border-purple-400',
    hoverBorder: 'hover:border-purple-400',
    hoverBg: 'hover:bg-purple-50',
    badge: 'bg-purple-50 text-purple-700',
    selectedBg: 'bg-purple-600',
    selectedText: 'text-white',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    darkText: 'text-orange-700',
    border: 'border-orange-400',
    hoverBorder: 'hover:border-orange-400',
    hoverBg: 'hover:bg-orange-50',
    badge: 'bg-orange-50 text-orange-700',
    selectedBg: 'bg-orange-600',
    selectedText: 'text-white',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    darkText: 'text-red-700',
    border: 'border-red-400',
    hoverBorder: 'hover:border-red-400',
    hoverBg: 'hover:bg-red-50',
    badge: 'bg-red-50 text-red-700',
    selectedBg: 'bg-red-600',
    selectedText: 'text-white',
  },
  cyan: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-600',
    darkText: 'text-cyan-700',
    border: 'border-cyan-400',
    hoverBorder: 'hover:border-cyan-400',
    hoverBg: 'hover:bg-cyan-50',
    badge: 'bg-cyan-50 text-cyan-700',
    selectedBg: 'bg-cyan-600',
    selectedText: 'text-white',
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-600',
    darkText: 'text-pink-700',
    border: 'border-pink-400',
    hoverBorder: 'hover:border-pink-400',
    hoverBg: 'hover:bg-pink-50',
    badge: 'bg-pink-50 text-pink-700',
    selectedBg: 'bg-pink-600',
    selectedText: 'text-white',
  },
} as const;

/**
 * 获取颜色映射
 * @param color 颜色名称，默认为 'blue'
 */
export const getColorVariant = (color?: string) => {
  const colorName = (color || 'blue') as keyof typeof COLOR_VARIANTS;
  return COLOR_VARIANTS[colorName] || COLOR_VARIANTS.blue;
};

/**
 * 所有可用工具列表
 * 工具的 name 和 description 通过 i18n key 配置
 */
export const TOOLS: Tool[] = [
  // 照片隐私清理工具：用于移除照片中的元数据和隐私信息（如GPS位置、相机信息等）
  {
    id: 'photo-privacy-cleaner',
    name: 'tools.photoPrivacyCleaner.name',
    description: 'tools.photoPrivacyCleaner.description',
    category: 'privacy',
    icon: Shield,
    color: 'purple',
  },
  // 文档转换器：支持多种文档格式之间的转换（PDF, DOCX, DOC, TXT, HTML等）
  {
    id: 'document-converter',
    name: 'tools.documentConverter.name',
    description: 'tools.documentConverter.description',
    category: 'conversion',
    icon: FileText,
    color: 'blue',
  },
  // 批量重命名工具：支持多种文件重命名模式和规则，可以批量处理文件名
  {
    id: 'batch-renamer',
    name: 'tools.batchRenamer.name',
    description: 'tools.batchRenamer.description',
    category: 'file-management',
    icon: Files,
    color: 'green',
  },
];

/**
 * 工具分类
 */
export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'privacy',
    name: 'Privacy Tools',
    tools: TOOLS.filter(tool => tool.category === 'privacy'),
  },
];
