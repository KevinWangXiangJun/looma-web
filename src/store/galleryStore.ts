import { create } from 'zustand';
import { GalleryImage, GalleryFilters } from '@/types/gallery';
import { getGalleryImagesPaginated } from '@/services/localImageService';
import { IMAGES_PER_PAGE } from '@/constants/gallery';

interface GalleryState {
  // 状态
  images: GalleryImage[];
  viewMode: 'grid' | 'list';
  filters: GalleryFilters;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isInitialLoading: boolean;
  columnCount: number;

  // 预览状态
  previewImage: GalleryImage | null;
  showPreview: boolean;

  // 批量模式状态
  selectionMode: boolean; // renamed from isBatchMode
  selectedIds: string[];

  // 动作
  setViewMode: (mode: 'grid' | 'list') => void;
  setFilters: (filters: GalleryFilters) => void;
  setColumnCount: (count: number) => void;
  setImages: (images: GalleryImage[] | ((prev: GalleryImage[]) => GalleryImage[])) => void;
  setPage: (page: number) => void;
  setSelectedIds: (ids: string[] | ((prev: string[]) => string[])) => void;
  setPreviewImage: (image: GalleryImage | null) => void;
  setShowPreview: (show: boolean) => void;
  
  // 批量操作动作
  toggleSelectionMode: () => void;
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  exitSelectionMode: () => void;

  // 异步动作
  loadImages: (isRefresh?: boolean) => Promise<void>;
  resetGallery: () => void;
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  // 初始状态
  images: [],
  viewMode: 'grid',
  filters: {
    types: ['all'],
  },
  page: 1,
  hasMore: true,
  isLoading: false,
  isInitialLoading: true,
  columnCount: 4,

  previewImage: null,
  showPreview: false,

  // 批量模式初始状态
  selectionMode: false,
  selectedIds: [],

  // 动作实现
  setViewMode: (viewMode) => set({ viewMode }),
  setFilters: (filters) => set({ filters, page: 1, hasMore: true, images: [] }),
  setColumnCount: (columnCount) => set({ columnCount }),
  setImages: (images) => set((state) => ({
    images: typeof images === 'function' ? images(state.images) : images,
  })),
  setPage: (page) => set({ page }),
  setSelectedIds: (ids) => set((state) => ({
    selectedIds: typeof ids === 'function' ? ids(state.selectedIds) : ids,
  })),
  setPreviewImage: (previewImage) => set({ previewImage }),
  setShowPreview: (showPreview) => set({ showPreview }),
  
  // 批量操作实现
  toggleSelectionMode: () => set((state) => ({ 
    selectionMode: !state.selectionMode,
    selectedIds: [] 
  })),
  
  toggleSelection: (id) => set((state) => {
    const isSelected = state.selectedIds.includes(id);
    if (isSelected) {
      return { selectedIds: state.selectedIds.filter(itemId => itemId !== id) };
    } else {
      return { selectedIds: [...state.selectedIds, id] };
    }
  }),
  
  selectAll: () => set((state) => ({ 
    selectedIds: state.images.map(img => img.id) 
  })),
  
  clearSelection: () => set({ selectedIds: [] }),
  
  exitSelectionMode: () => set({ selectionMode: false, selectedIds: [] }),

  resetGallery: () => set({ 
    images: [], 
    page: 1, 
    hasMore: true, 
    isInitialLoading: true,
    selectionMode: false,
    selectedIds: [],
    previewImage: null,
    showPreview: false
  }),


  loadImages: async (isRefresh = false) => {
    const state = get();
    // 如果正在加载或没有更多数据（且不是强制刷新），则阻止加载
    if (state.isLoading || (!isRefresh && !state.hasMore)) return;

    set({ isLoading: true });

    if (isRefresh) {
      // 刷新时重置状态以显示骨架屏
      set({ 
        page: 1, 
        hasMore: true, 
        images: [],
        selectedIds: [],
        isInitialLoading: true
      });
    }

    try {
      const pageToLoad = isRefresh ? 1 : state.page;
      // 从本地服务获取 mock 数据
      const response = await getGalleryImagesPaginated(pageToLoad, IMAGES_PER_PAGE || 20);
      
      set((currentState) => {
        // 为新图片添加 page 标记
        const timestampedImages = response.data.map(img => ({
          ...img,
          __page: pageToLoad
        }));

        const newImages = isRefresh 
          ? timestampedImages 
          : [...currentState.images, ...timestampedImages];
        
        return {
          images: newImages,
          hasMore: response.hasMore,
          page: pageToLoad + 1,
          isLoading: false,
          isInitialLoading: false,
        };
      });
    } catch (error) {
      console.error('加载图片失败:', error);
      set({ isLoading: false, isInitialLoading: false });
    }
  },
}));

