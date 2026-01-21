import React, { startTransition, useState, useMemo, useEffect } from 'react';
import { LayoutGrid, List as ListIcon, Search, RefreshCw, CheckSquare, Image, Clock, Heart, Trash2, Download, LucideIcon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useGalleryStore } from '@/store/galleryStore';
import { Button, FormInput } from '@/components/ui';
import { debounce } from '@/utils/common';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/Select';
import { GALLERY_COLLECTIONS } from '@/constants/gallery';

const iconMap: Record<string, LucideIcon> = {
  Image, Clock, Heart, Trash2, Download
};

interface GalleryToolbarProps {}

export const GalleryToolbar: React.FC<GalleryToolbarProps> = React.memo(() => {
  const { 
    viewMode, 
    setViewMode, 
    loadImages, 
    isLoading, 
    filters, 
    setFilters,
    toggleBatchMode
  } = useGalleryStore(
    useShallow((state) => ({
      viewMode: state.viewMode,
      setViewMode: state.setViewMode,
      loadImages: state.loadImages,
      isLoading: state.isLoading,
      filters: state.filters,
      setFilters: state.setFilters,
      toggleBatchMode: state.toggleBatchMode,
    }))
  );

  const handleRefresh = () => {
    loadImages(true);
  };

  const handleCollectionChange = (value: string) => {
    const currentCategory = filters.category || 'all';
    if (currentCategory === value) return;
    
    setFilters({ ...filters, category: value as any });
    loadImages(true);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    startTransition(() => {
      setViewMode(mode);
    });
  };

  const handleBatchMode = () => {
    toggleBatchMode();
  };

  // 本地状态用于输入框的即时响应
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  // 当外部 filters.search 变化时（例如被清空），同步更新本地状态
  useEffect(() => {
    if (filters.search !== localSearch) {
      setLocalSearch(filters.search || '');
    }
  }, [filters.search]);

  // 性能优化：防抖函数依赖数组为空
  // 这样防抖函数只创建一次，不会因为 store action 变化而被重置
  // 函数内通过 getState() 获取最新的 store 值
  const debouncedSearch = useMemo(
    () =>
      debounce((keyword: string) => {
        const store = useGalleryStore.getState();
        // 只有当搜索关键词真正改变时才触发搜索
        if (store.filters.search !== keyword) {
           store.setFilters({ ...store.filters, search: keyword });
           store.loadImages(true);
        }
      }, 500),
    [] // 依赖数组为空，防抖函数只创建一次
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    setLocalSearch(keyword);
    debouncedSearch(keyword);
  };

  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between flex-shrink-0 z-10">
      {/* Search & Collections Filter */}
      <div className="flex items-center gap-3 w-full max-w-xl px-4 hidden sm:flex">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <FormInput 
            type="text" 
            placeholder="搜索图片..." 
            value={localSearch}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 hover:bg-white hover:border-primary-600 focus:border-primary-600 rounded-lg text-sm transition-all"
          />
        </div>
        
        <div className="w-[160px]">
          <Select value={filters.category || 'all'} onValueChange={handleCollectionChange}>
            <SelectTrigger className="w-full rounded-lg bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 px-3 py-1 flex-shrink-0 focus:ring-0 focus:border-gray-200 focus:ring-offset-0">
              <span className="text-sm truncate">
                {GALLERY_COLLECTIONS.find(c => c.id === (filters.category || 'all'))?.label || '选择相册'}
              </span>
            </SelectTrigger>
            <SelectContent className="rounded-lg max-h-60">
              {GALLERY_COLLECTIONS.map((item) => {
                const Icon = iconMap[item.icon];
                const isSelected = (filters.category || 'all') === item.id;
                return (
                  <SelectItem 
                    key={item.id} 
                    value={item.id}
                    className={`flex items-center justify-between py-2 pr-3 ${isSelected ? 'bg-primary-500 focus:bg-primary-600 data-[state=checked]:text-white' : 'text-gray-900'}`}
                    showCheckmark={false}
                  >
                    <div className={`flex items-center gap-2`}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span className="text-sm truncate">{item.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 ml-auto sm:ml-0">
        {/* 批量操作按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleBatchMode}
          title="批量操作"
          className="w-[112px] h-10 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <CheckSquare size={20} />
          <span className="pl-2">批量操作</span>
        </Button>

        {/* 视图切换 */}
        <div className="h-10 flex items-center justify-center">
          <button
            onClick={() => handleViewModeChange('grid')}
            className={`h-10 px-3 py-2 rounded-l-md border ${
              viewMode === 'grid' 
                ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => handleViewModeChange('list')}
            className={`h-10 px-3 py-2 rounded-r-md border ${
              viewMode === 'list' 
                ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <ListIcon size={20} />
          </button>
        </div>

        {/* 刷新按钮 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          title="刷新"
          className="h-10 px-3 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
        </Button>
      </div>
    </div>
  );
});

export default GalleryToolbar;
