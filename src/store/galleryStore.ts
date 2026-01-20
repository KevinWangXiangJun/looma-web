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
  total: number; // 本地照片总数

  // 预览状态
  previewImage: GalleryImage | null;
  showPreview: boolean;

  // 批量模式状态
  isBatchMode: boolean;
  selectedImages: string[];

  // 下载记录
  downloads: string[];

  // 动作
  setViewMode: (mode: 'grid' | 'list') => void;
  setFilters: (filters: GalleryFilters) => void;
  setColumnCount: (count: number) => void;
  setImages: (images: GalleryImage[] | ((prev: GalleryImage[]) => GalleryImage[])) => void;
  setPage: (page: number) => void;
  setPreviewImage: (image: GalleryImage | null) => void;
  setShowPreview: (show: boolean) => void;
  
  // 批量操作动作
  toggleBatchMode: () => void;
  toggleImageSelection: (id: string) => void;
  selectAllImages: () => void;
  clearImageSelection: () => void;
  setSelectedImages: (ids: string[] | ((prev: string[]) => string[])) => void;

  // 收藏、删除、下载操作
  toggleFavorite: (id: string) => void;
  toggleDelete: (id: string) => void;
  addToDownloads: (ids: string[]) => void;
  batchFavorite: (ids: string[], isFavorited: boolean) => void;
  batchDelete: (ids: string[], isDeleted: boolean) => void;

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
    category: 'all',
  },
  page: 1,
  hasMore: true,
  isLoading: false,
  isInitialLoading: true,
  columnCount: 4,
  total: 0,

  previewImage: null,
  showPreview: false,

  // 批量模式初始状态
  isBatchMode: false,
  selectedImages: [],
  downloads: [],

  // 动作实现
  setViewMode: (viewMode) => set({ viewMode }),
  setFilters: (filters) => set({ filters, page: 1, hasMore: true, images: [] }),
  setColumnCount: (columnCount) => set({ columnCount }),
  setImages: (images) => set((state) => ({
    images: typeof images === 'function' ? images(state.images) : images,
  })),
  setPage: (page) => set({ page }),
  setPreviewImage: (previewImage) => set({ previewImage }),
  setShowPreview: (showPreview) => set({ showPreview }),
  setSelectedImages: (ids) => set((state) => ({
    selectedImages: typeof ids === 'function' ? ids(state.selectedImages) : ids,
  })),
  
  // 批量操作实现
  toggleBatchMode: () => set((state) => ({ 
    isBatchMode: !state.isBatchMode,
    selectedImages: [] 
  })),
  
  toggleImageSelection: (id) => set((state) => {
    const isSelected = state.selectedImages.includes(id);
    if (isSelected) {
      return { selectedImages: state.selectedImages.filter(itemId => itemId !== id) };
    } else {
      return { selectedImages: [...state.selectedImages, id] };
    }
  }),
  
  selectAllImages: () => set((state) => ({ 
    selectedImages: state.images.map(img => img.id) 
  })),
  
  clearImageSelection: () => set({ selectedImages: [] }),

  // 切换单张图片收藏状态
  toggleFavorite: (id) => set((state) => ({
    images: state.images.map(img => 
      img.id === id ? { ...img, isFavorited: !img.isFavorited } : img
    ),
  })),

  // 切换单张图片删除状态
  toggleDelete: (id) => set((state) => ({
    images: state.images.map(img => 
      img.id === id ? { ...img, isDeleted: !img.isDeleted } : img
    ),
  })),

  // 添加到下载记录
  addToDownloads: (ids) => set((state) => ({
    downloads: Array.from(new Set([...state.downloads, ...ids])),
  })),

  // 批量设置收藏状态
  batchFavorite: (ids, isFavorited) => set((state) => ({
    images: state.images.map(img => 
      ids.includes(img.id) ? { ...img, isFavorited } : img
    ),
  })),

  // 批量设置删除状态
  batchDelete: (ids, isDeleted) => set((state) => ({
    images: state.images.map(img => 
      ids.includes(img.id) ? { ...img, isDeleted } : img
    ),
  })),
  
  resetGallery: () => set({ 
    images: [], 
    page: 1, 
    hasMore: true, 
    isInitialLoading: true,
    isBatchMode: false,
    selectedImages: [],
    previewImage: null,
    showPreview: false,
    downloads: [],
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
        selectedImages: [],
        isInitialLoading: true
      });
    }

    try {
      const pageToLoad = isRefresh ? 1 : state.page;
      
      // 准备过滤参数
      // 如果 filters 中有 category，服务层会处理。
      // 对于 'downloads' 分类，我们需要将下载列表 ID 传递给服务层，或者服务层能获取到。
      // 由于目前是本地 Mock 服务，我们简单起见，将 filters 完整传给 Service
      // 但 standard getGalleryImagesPaginated 只接受 page 和 limit。
      // 我们需要扩展 getGalleryImagesPaginated 或传递额外参数。
      // 为了保持简单，我们假设 filters 已经在 Store 中，Service 可以获取（不太好）或者传递。
      // 我们的 getGalleryImagesPaginated 目前是：
      // (page: number, limit: number)
      
      // 我们需要修改调用，传入 filters 和 downloads
      const response = await getGalleryImagesPaginated(
        pageToLoad, 
        IMAGES_PER_PAGE || 20, 
        state.filters, 
        state.downloads // 传入下载列表ID，供 'downloads' 分类使用
      );
      
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
          total: response.total,
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

