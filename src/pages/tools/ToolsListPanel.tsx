/**
 * 工具列表面板组件
 * 显示所有可用的工具列表，支持搜索功能
 */
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useTranslation } from 'react-i18next';
import { useToolsStore } from '@/store';
import { TOOLS, getColorVariant } from '@/constants/tools';
import type { Tool } from '@/types/tools';

interface ToolsListPanelProps {
  activeItem?: any;
}

export const ToolsListPanel: React.FC<ToolsListPanelProps> = () => {
  const { t } = useTranslation();
  const { selectedToolId, setSelectedToolId } = useToolsStore();
  const [searchQuery, setSearchQuery] = useState('');

  // 根据搜索关键词过滤工具
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) {
      return TOOLS;
    }
    return TOOLS.filter(tool => {
      // 获取翻译后的工具名称和描述
      const toolName = t(tool.name as string);
      const toolDescription = t(tool.description as string);
      const searchLower = searchQuery.toLowerCase();
      
      return (
        toolName.toLowerCase().includes(searchLower) ||
        toolDescription.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, t]);

  const handleToolSelect = (tool: Tool) => {
    // 如果点击的是当前已选中的工具，则取消选中；否则选中该工具
    if (selectedToolId === tool.id) {
      setSelectedToolId(null);
    } else {
      setSelectedToolId(tool.id);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* 面板标题和描述 */}
      <div className="px-4 pt-4 flex-shrink-0">
        <h2 className="text-md font-semibold text-primary-700 uppercase tracking-wider">
          {t('tools.title')}
        </h2>
        <p className="text-xs text-gray-500 mt-1">{t('tools.description')}</p>
      </div>

      {/* 搜索框 */}
      <div className="relative px-4">
        <Search size={20} className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder={t('tools.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 rounded-lg"
        />
      </div>

      {/* 工具列表 */}
      <div className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => {
            const isSelected = selectedToolId === tool.id;
            const IconComponent = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolSelect(tool)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-primary-500 text-white shadow-md border'
                    : 'bg-white border border-gray-200 hover:border-primary-400 hover:shadow-md text-gray-700 hover:bg-primary-50'
                }`}
              >
                {IconComponent ? (
                  <IconComponent className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-white' : getColorVariant(tool.color).text}`} />
                ) : (
                  <span className="w-5 h-5 flex-shrink-0">🔧</span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{t(tool.name as string)}</div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            {t('tools.noResults')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsListPanel;
