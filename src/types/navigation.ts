import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
  description?: string;
}

export type NavItemWithoutIcon = Omit<NavItem, 'icon'> & {
  icon?: LucideIcon;
};
