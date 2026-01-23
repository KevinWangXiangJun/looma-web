import { useState, memo, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MoreVertical, Eye, Download, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { DeleteConfirmDialog } from '@/components/common/DeleteConfirmDialog';
import { GalleryImage } from '@/types/gallery';
import { useGalleryStore } from '@/store/galleryStore';
import { useDownloadManager } from '@/hooks/useDownloadManager';
import { useDeleteManager } from '@/hooks/useDeleteManager';

export interface GalleryListItemProps {
  image: GalleryImage;
}

export const GalleryListItem: React.FC<GalleryListItemProps> = memo(({
  image,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // 只订阅当前图片的选中状态
  // 优化：仅订阅选中状态，操作方法直接通过 getState 调用，避免不必要的订阅和对象创建
  const selected = useGalleryStore((state) => !!state.selectedImages[image.id]);
  
  const { handleDownload } = useDownloadManager();
  const { handleDelete } = useDeleteManager();

  const handleImageClick = (image: any) => {
    // 性能优化：直接从 store "getState()" 获取状态和方法，避免订阅导致全量重渲染
    // 这样每个列表项减少了对 store actions 的订阅，在大量数据时显著提升性能
    const store = useGalleryStore.getState();

    if (store.isBatchMode) {
      store.toggleImageSelection(image.id);
    } else {
      store.setPreviewImage(image);
      store.setShowPreview(true);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      // 从 store 获取最新的 images 列表用于删除操作
      const allImages = useGalleryStore.getState().images;
      await handleDelete(image.id, allImages);
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownloadImage = useCallback(() => {
    handleDownload({ url: image.url, fileName: image.name || 'image.png' });
  }, [image.url, image.name, handleDownload]);

  return (
    <div>
      <Card
        className="p-4 relative overflow-hidden cursor-pointer transition-all hover:shadow-md"
        onClick={() => handleImageClick(image)}
      >
        {/* 选中状态遮罩 - 使用绝对定位覆盖层，避免修改父容器 class 触发重排 */}
        {selected && (
          <div className="absolute inset-0 z-8 border-2 border-primary-500 bg-primary-50/20 pointer-events-none rounded-lg" />
        )}
        
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
            <img
              src={image.thumbnail || image.url}
              alt={image.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate mb-1 text-sm">{image.chineseName || image.name}</h4>
                {image.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">{image.description}</p>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(image);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />查看详情
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadImage();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />下载
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group text-destructive hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2 group-hover:text-white" />删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{image.uploadedAt}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 删除确认对话框 */}
      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
});

export default GalleryListItem;
