import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, MoreVertical, Eye, Download, Trash2 } from 'lucide-react';
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
}

export const GalleryListItem: React.FC<GalleryListItemProps> = memo(({
  image,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isBatchMode = useGalleryStore((state) => state.isBatchMode);
  // 只订阅当前图片的选中状态
  const selected = useGalleryStore((state) => state.selectedImages.includes(image.id));
  const toggleImageSelection = useGalleryStore((state) => state.toggleImageSelection);
  const setPreviewImage = useGalleryStore((state) => state.setPreviewImage);
  const setShowPreview = useGalleryStore((state) => state.setShowPreview);
  const { handleDownload } = useDownloadManager();
  const { handleDelete } = useDeleteManager();

  const handleImageClick = (image: any) => {
    if (isBatchMode) {
      toggleImageSelection(image.id);
    } else {
      setPreviewImage(image);
      setShowPreview(true);
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

  const handleDownloadImage = () => {
    handleDownload({ url: image.url, fileName: image.name || 'image.png' });
  };

  return (
    <div>
      <Card
        className={`p-4 relative overflow-hidden cursor-pointer transition-all hover:shadow-md ${selected ? 'border border-primary-500 bg-primary-50' : ''}`}
        onClick={() => handleImageClick(image)}
      >
        {/* {selected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
          </div>
        )} */}
        
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
                  <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBatchMode && selected}
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
