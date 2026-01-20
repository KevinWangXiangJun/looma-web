import React from 'react';
import { GalleryImage } from '@/types/gallery';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';

interface PreviewPageProps {
  image: GalleryImage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * PreviewPage - Full screen image preview dialog
 */
export const PreviewPage: React.FC<PreviewPageProps> = ({
  image,
  open,
  onOpenChange,
}) => {
  if (!open || !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="relative max-w-4xl w-full max-h-screen overflow-auto">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-lg hover:bg-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image */}
        <div className="w-full aspect-auto bg-gray-100 flex items-center justify-center">
          <img
            src={image.url}
            alt={image.name}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>

        {/* Info */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{image.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{image.resolution || `${image.width}x${image.height}`}</p>
          </div>

          {image.tags && image.tags.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">标签</h3>
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              关闭
            </Button>
            <Button>保存更改</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
