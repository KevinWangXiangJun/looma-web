import { usePageTitle } from '@/hooks';
import { useToolsStore } from '@/store';
import { getToolById } from '@/utils/tools';
import { ToolDetail } from './ToolDetail';
import { ToolsHomepage } from './ToolsHomepage';
import { useShallow } from 'zustand/react/shallow';
import { useMemo } from 'react';

export function Tools(): JSX.Element {
  usePageTitle('navigation.tools');
  
  // 性能优化：使用选择器减少重渲染
  const selectedToolId = useToolsStore(useShallow(state => state.selectedToolId));
  
  // 这里的查找操作开销很小，useMemo 是锦上添花
  const selectedTool = useMemo(() => 
    selectedToolId ? getToolById(selectedToolId) : undefined,
    [selectedToolId]
  );
  
  return (
    <div className="flex h-full gap-6">
      {/* 右侧内容：主页或工具详情 */}
      <div className="flex-1 p-0 overflow-hidden">
        {selectedTool ? (
          <ToolDetail selectedTool={selectedTool} />
        ) : (
          <ToolsHomepage />
        )}
      </div>
    </div>
  );
}

export default Tools;
