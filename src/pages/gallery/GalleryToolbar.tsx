import React, { startTransition } from 'react';
import { LayoutGrid, List as ListIcon, Search, RefreshCw } from 'lucide-react';
import { useGalleryStore } from '@/store/galleryStore';
import { Button, FormInput } from '@/components/ui';

export const GalleryToolbar: React.FC = () => {
  const viewMode = useGalleryStore((state) => state.viewMode);
  const setViewMode = useGalleryStore((state) => state.setViewMode);
  const loadImages = useGalleryStore((state) => state.loadImages);
  const isLoading = useGalleryStore((state) => state.isLoading);

  const handleRefresh = () => {
    loadImages(true);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    startTransition(() => {
      setViewMode(mode);
    });
  };

  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between flex-shrink-0 z-10">
      {/* Search - Placeholder functionality for now as filters are in store */}
      <div className="relative w-full max-w-md hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <FormInput 
          type="text" 
          placeholder="搜索图片..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 bover:bg-white hover:border-primary-600 focus:border-primary-600 rounded-lg text-sm transition-all"
        />
      </div>

      <div className="flex items-center gap-2 px-4 ml-auto sm:ml-0">
        <div className="flex">
          <button
            className={`px-3 py-2 rounded-l-md border ${viewMode === 'grid' ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
            onClick={() => handleViewModeChange('grid')}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            className={`px-3 py-2 rounded-r-md border ${viewMode === 'list' ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
            onClick={() => handleViewModeChange('list')}
          >
            <ListIcon size={18} />
          </button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          title="刷新"
          className="px-3 py-2 rounded-md border text-gray-500 hover:text-gray-900"
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
        </Button>
      </div>
    </div>
  );
};

export default GalleryToolbar;
