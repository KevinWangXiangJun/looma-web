/**
 * 工具详情容器组件
 * 负责根据选中的工具显示对应的内容组件
 */
import React from 'react';
import PhotoPrivacyViewer from './PhotoPrivacyViewer/PhotoPrivacyViewer';
import { DocumentConverter } from './DocumentConverter';
import { BatchRenamer } from './BatchRenamer';
import type { Tool } from '@/types/tools';

interface ToolDetailProps {
  selectedTool: Tool;
}

/**
 * 获取工具对应的组件
 */
const getToolComponent = (toolId: string): React.ComponentType | null => {
  const componentMap: Record<string, React.ComponentType> = {
    'photo-privacy-viewer': PhotoPrivacyViewer,
    'document-converter': DocumentConverter,
    'batch-renamer': BatchRenamer,
  };
  return componentMap[toolId] || null;
};

export const ToolDetail: React.FC<ToolDetailProps> = ({ selectedTool }) => {
  const ToolComponent = getToolComponent(selectedTool.id);

  if (!ToolComponent) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Tool component not found</p>
      </div>
    );
  }

  return <ToolComponent />;
};

export default ToolDetail;
