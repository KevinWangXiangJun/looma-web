/**
 * 用户资料类型定义
 */
import type { LucideIcon } from 'lucide-react';

export interface UserProfileMenuItem {
  icon: LucideIcon;
  labelKey: string;
  labelFallback: string;
  action: () => void;
  showChevron: boolean;
}
