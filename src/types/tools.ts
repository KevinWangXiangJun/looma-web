/**
 * 工具相关的类型定义
 */

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon?: any; // lucide-react 图标组件
  category?: string;
  component?: React.ComponentType;
  color?: string; // 工具主题颜色：'blue', 'green', 'purple', 'orange', 'red', 'cyan', 'pink'
  children?: Tool[]; // 子工具/功能列表
  feature1Key?: string; // 第一个功能特性的 i18n 键
  feature2Key?: string; // 第二个功能特性的 i18n 键
}

export interface ToolCategory {
  id: string;
  name: string;
  tools: Tool[];
}
