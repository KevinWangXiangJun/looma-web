import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Check, MoreVertical, Eye, Download, Trash2, AlertCircle } from 'lucide-react';
import { useState, memo } from 'react';
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
  onClick?: (img: GalleryImage) => void;
  onViewDetails?: (img: GalleryImage) => void;
  selected?: boolean;
  onImageLoad?: () => void;
}

export const GalleryListItem: React.FC<GalleryListItemProps> = memo(({
  image,
  onClick,
  onViewDetails,
  selected = false,
  onImageLoad,
}) => {
  const [imageError, setImageError] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const selectionMode = useGalleryStore((state) => state.selectionMode);
  const { handleDownload } = useDownloadManager();
  const { handleDelete } = useDeleteManager();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleRetry = async () => {
    setRetrying(true);
    setImageError(false);
    // 使用 setTimeout 确保在重新加载之前重置错误状态
    setTimeout(() => {
      setRetrying(false);
    }, 100);
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

  const handleDownloadImage = () => {
    handleDownload({ url: image.url, fileName: image.name || 'image.png' });
  };

  return (
    <div>
      <Card
        className={`p-4 relative overflow-hidden cursor-pointer transition-all hover:shadow-md ${selected ? 'ring-2 border-1 border-primary ring-primary' : ''}`}
        onClick={() => onClick && image && onClick(image)}
      >
        {selected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRetry();
                  }}
                  disabled={retrying}
                  className="w-8 h-8"
                >
                  {retrying ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            ) : (
              <img
                src={image.thumbnail || image.url}
                alt={image.name}
                loading="lazy"
                className="w-full h-full object-cover"
                onLoad={() => {
                  onImageLoad && onImageLoad();
                }}
                onError={handleImageError}
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate mb-1 text-sm">{image.name}</h4>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={(e) => e.stopPropagation()}
                    disabled={selectionMode && selected}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onViewDetails) onViewDetails(image);
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
