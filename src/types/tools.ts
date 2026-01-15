/**
 * 工具相关的类型定义
 */

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon?: any; // lucide-react icon component
  category?: string;
  component?: React.ComponentType;
  color?: string; // 工具主题颜色：'blue', 'green', 'purple', 'orange', 'red', 'cyan', 'pink'
}

export interface ToolCategory {
  id: string;
  name: string;
  tools: Tool[];
}
