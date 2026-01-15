/**
 * 照片预览组件
 * 显示原始照片
 */
import React from 'react';
import { Card } from '@/components/ui/Card';

interface PhotoPreviewProps {
  image: string | null;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({ image }) => {
  return (
    <Card className="p-4 sticky">
      <h3 className="font-semibold text-md text-gray-900 mb-4">原始图片</h3>
      {image ? (
        <img
          src={image}
          alt="Original"
          className="w-full max-h-[70vh] rounded-lg object-contain bg-gray-100"
        />
      ) : null}
    </Card>
  );
};

export default PhotoPreview;
