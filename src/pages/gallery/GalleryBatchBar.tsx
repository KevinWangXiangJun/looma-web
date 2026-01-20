import React from 'react';
import { X, Square, CheckSquare, Heart, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';

interface GalleryBatchBarProps {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  onExit: () => void;
  onSelectAll: () => void;
  onCollect: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

export const GalleryBatchBar: React.FC<GalleryBatchBarProps> = ({
  selectedCount,
  totalCount,
  isAllSelected,
  onExit,
  onSelectAll,
  onCollect,
  onDownload,
  onDelete,
}) => {
  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between flex-shrink-0 z-10 px-4">
      {/* 左侧：已选择信息 */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          已选择 <span className="font-semibold text-gray-900">{selectedCount}</span> / {totalCount} 张图片
        </span>
      </div>

      {/* 右侧：操作按钮 */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onSelectAll}
          title={isAllSelected ? '取消全选' : '全选'}
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
        >
          {isAllSelected ? <CheckSquare size={20} /> : <Square size={20} />}
          <span>{isAllSelected ? '取消全选' : '全选'}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onCollect}
          title="收藏"
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
        >
          <Heart size={20} />
          <span>收藏</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          title="下载"
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
        >
          <Download size={20} />
          <span>下载</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          title="删除"
          className="px-3 py-2 rounded-md border border-red-300 text-red-600 hover:bg-red-200 hover:text-red-700 flex items-center gap-2"
        >
          <Trash2 size={20} />
          <span>删除</span>
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <Button
          variant="outline"
          size="sm"
          onClick={onExit}
          title="退出"
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
        >
          <X size={20} />
          <span>退出</span>
        </Button>
      </div>
    </div>
  );
};

export default GalleryBatchBar;
