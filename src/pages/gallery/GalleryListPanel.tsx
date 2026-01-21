import { useMemo, memo } from 'react';
import { Image, Clock, Heart, Trash2, Download, UploadCloud, LucideIcon } from 'lucide-react';
import { useGalleryStore } from '@/store/galleryStore';
import { GALLERY_COLLECTIONS } from '@/constants/gallery';

const iconMap: Record<string, LucideIcon> = {
  Image, Clock, Heart, Trash2, Download
};

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

interface GallerySidebarProps {
  className?: string;
}

export const GalleryListPanel = memo(({
  className = '',
}: GallerySidebarProps & { [key: string]: any }) => {
  const total = useGalleryStore((state) => state.total);
  
  // 新增：从 Store 获取过滤状态和操作
  const filters = useGalleryStore((state) => state.filters);
  const setFilters = useGalleryStore((state) => state.setFilters);
  const loadImages = useGalleryStore((state) => state.loadImages);

  // 当前选中的分类
  const selectedId = filters.category || 'all';

  // 处理点击事件
  const handleSelect = (id: string) => {
    if (selectedId === id) return;
    
    // 更新 Store 中的过滤条件
    setFilters({ ...filters, category: id as any });
    // 强制刷新列表
    loadImages(true);
  };

  const collections: SidebarItem[] = useMemo(() => GALLERY_COLLECTIONS.map(item => ({
    id: item.id,
    label: item.label,
    icon: iconMap[item.icon],
    count: selectedId === item.id ? total : undefined
  })), [selectedId, total]);

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
              onClick={() => handleSelect(item.id)}
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
      className={`w-full flex flex-col h-full py-4 overflow-y-auto ${className}`}
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
});

export default GalleryListPanel;
