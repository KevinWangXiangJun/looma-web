import { usePageTitle } from '@/hooks';
import { useToolsStore } from '@/store';
import { getToolById } from '@/utils/tools';
import { ToolDetail } from './ToolDetail';
import { ToolsHomepage } from './ToolsHomepage';

export function Tools(): JSX.Element {
  usePageTitle('navigation.tools');
  const { selectedToolId } = useToolsStore();
  const selectedTool = selectedToolId ? getToolById(selectedToolId) : undefined;

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
