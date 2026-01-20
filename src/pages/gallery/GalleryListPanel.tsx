import { Image, Clock, Heart, Trash2, Download, UploadCloud, LucideIcon } from 'lucide-react';
import { useGalleryStore } from '@/store/galleryStore';

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

interface GallerySidebarProps {
  className?: string;
  onSelect?: (id: string) => void;
  selectedId?: string;
}

export const GalleryListPanel = ({
  className = '',
  onSelect,
  selectedId = 'all',
}: GallerySidebarProps) => {
  const images = useGalleryStore((state) => state.images);
  const downloads = useGalleryStore((state) => state.downloads);
  const total = useGalleryStore((state) => state.total);

  // 计算各类别的数量
  const favoritesCount = images.filter(img => img.isFavorited).length;
  const trashCount = images.filter(img => img.isDeleted).length;
  const downloadCount = downloads.length;
  
  // 最近上传：统计所有加载的图片中最近上传的数量
  // 这里简化为：已加载的全部图片数（可根据需要通过 uploadedAt 字段进一步精细化）
  const recentCount = images.length;

  const collections: SidebarItem[] = [
    { id: 'all', label: '全部照片', icon: Image, count: total },
    { id: 'recent', label: '最近上传', icon: Clock, count: recentCount },
    { id: 'favorites', label: '我的收藏', icon: Heart, count: favoritesCount },
    { id: 'downloads', label: '我的下载', icon: Download, count: downloadCount },
    { id: 'trash', label: '回收站', icon: Trash2, count: trashCount },
  ];

  const renderSection = (title: string, items: SidebarItem[]) => (
    <div className="mb-6">
      <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect?.(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg mb-1 ${
                isSelected ? 'bg-primary-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center">
                <Icon
                  size={18}
                  className={`mr-3`}
                />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`text-xs ${isSelected ? 'text-hite' : 'text-gray-400'}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className={`w-full flex flex-col h-full bg-white py-4 overflow-y-auto ${className}`}
    >
      <div className="px-4 mb-6">
        <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
          <UploadCloud size={20} />
          <span className="text-sm">上传图片</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4">
        {renderSection('智能相册', collections)}
      </nav>

      <div className="px-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>存储空间</span>
          <span>75%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: '75%' }} />
        </div>
        <div className="mt-2 text-xs text-gray-400">已使用 15GB / 20GB</div>
      </div>
    </div>
  );
};

export default GalleryListPanel;
