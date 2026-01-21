import React, { memo } from 'react';
import { X, Square, CheckSquare, Heart, Download, Trash2 } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui';
import { useGalleryStore } from '@/store/galleryStore';

// 使用 React.memo 避免不必要的重渲染
export const GalleryBatchBar = memo(() => {
  // 性能优化：分离不同用途的订阅以实现更精细的控制
  // 1. 选择状态（频繁变化）- 独立订阅
  const selectedImages = useGalleryStore(state => state.selectedImages);
  
  // 2. 总数统计（低频变化）- 独立订阅，避免订阅整个 images 数组
  const totalCount = useGalleryStore(state => state.images.length);
  
  // 3. 操作方法（稳定）- 通过 useShallow 合并
  const { toggleBatchMode, clearImageSelection, selectAllImages } = useGalleryStore(
    useShallow((state) => ({
      toggleBatchMode: state.toggleBatchMode,
      clearImageSelection: state.clearImageSelection,
      selectAllImages: state.selectAllImages
    }))
  );

  const selectedCount = selectedImages.length;
  const isAllSelected = selectedCount > 0 && selectedCount === totalCount;

  // 动作处理函数
  const handleExit = () => {
    clearImageSelection();
    toggleBatchMode();
  };

  const handleSelectAll = () => {
    // 性能优化：简化逻辑，直接调用 selectAllImages
    // Store 中已实现了全选/取消全选的切换逻辑
    selectAllImages();
  };

  const handleCollect = () => {
    console.log('Collect:', selectedImages);
    // TODO: 实现收藏逻辑
  };

  const handleDownload = () => {
    console.log('Download:', selectedImages);
    // TODO: 实现下载逻辑
  };

  const handleDelete = () => {
    console.log('Delete:', selectedImages);
    // TODO: 实现删除逻辑
  };

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
          onClick={handleSelectAll}
          title={isAllSelected ? '取消全选' : '全选'}
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
        >
          {isAllSelected ? <CheckSquare size={20} /> : <Square size={20} />}
          <span>{isAllSelected ? '取消全选' : '全选'}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCollect}
          title="收藏"
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
        >
          <Heart size={20} />
          <span>收藏</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          title="下载"
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
        >
          <Download size={20} />
          <span>下载</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
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
          onClick={handleExit}
          title="退出"
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
        >
          <X size={20} />
          <span>退出</span>
        </Button>
      </div>
    </div>
  );
});

export default GalleryBatchBar;
