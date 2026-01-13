/**
 * Dashboard相关的Zustand Store
 * 管理仪表板的过滤、排序、列表数据等状态
 */
import { create } from 'zustand';
import { PAGINATION_CONFIG } from '@/constants/app';

interface DashboardState {
  filters: { category: string; sortBy: string; search: string };
  activeTab: string;
  artworks: { [key: string]: any[] };
  pagination: { currentPage: number; pageSize: number; total: number; hasMore: boolean };
  loading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  cacheExpiry: number;
}

interface DashboardActions {
  setFilters: (filters: any) => void;
  setActiveTab: (tab: string) => void;
  setArtworks: (tabType: string, artworks: any[], append?: boolean) => void;
  setPagination: (pagination: any) => void;
  setSortBy: (sortBy: string) => void;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateArtworkStatus: (artworkId: string, updates: any) => void;
  updateLastFetchTime: () => void;
  isCacheExpired: () => boolean;
  getCurrentTabData: () => any[];
  reset: () => void;
}

export const useDashboardStore = create<DashboardState & DashboardActions>((set, get) => ({
  // ========== 过滤和排序状态 ==========
  filters: {
    category: 'all',
    sortBy: 'latest',
    search: '',
  },

  // ========== 标签页状态 ==========
  activeTab: 'all', // all | favorites | collections

  // ========== 列表数据状态 ==========
  artworks: {
    all: [],
    favorites: [],
    collections: [],
  },

  // ========== 分页状态 ==========
  pagination: {
    currentPage: 1,
    pageSize: PAGINATION_CONFIG.DEFAULT_PAGE_SIZE || 20,
    total: 0,
    hasMore: true,
  },

  // ========== 加载/错误状态 ==========
  loading: false,
  error: null,

  // ========== 缓存状态 ==========
  lastFetchTime: null,
  cacheExpiry: 5 * 60 * 1000, // 5分钟缓存过期时间

  // ========== Action: 更新过滤条件 ==========
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, currentPage: 1 }, // 重置分页
    })),

  // ========== Action: 更新排序方式 ==========
  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
      pagination: { ...state.pagination, currentPage: 1 },
    })),

  // ========== Action: 更新分类 ==========
  setCategory: (category) =>
    set((state) => ({
      filters: { ...state.filters, category },
      pagination: { ...state.pagination, currentPage: 1 },
    })),

  // ========== Action: 更新搜索关键词 ==========
  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
      pagination: { ...state.pagination, currentPage: 1 },
    })),

  // ========== Action: 切换标签页 ==========
  setActiveTab: (tab) =>
    set({
      activeTab: tab,
      pagination: { ...get().pagination, currentPage: 1 },
    }),

  // ========== Action: 设置作品列表 ==========
  setArtworks: (tabType, artworks, append = false) =>
    set((state) => ({
      artworks: {
        ...state.artworks,
        [tabType]: append ? [...state.artworks[tabType], ...artworks] : artworks,
      },
    })),

  // ========== Action: 设置分页信息 ==========
  setPagination: (paginationData) =>
    set((state) => ({
      pagination: { ...state.pagination, ...paginationData },
    })),

  // ========== Action: 下一页 ==========
  nextPage: () =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        currentPage: state.pagination.currentPage + 1,
      },
    })),

  // ========== Action: 设置加载状态 ==========
  setLoading: (loading) => set({ loading }),

  // ========== Action: 设置错误 ==========
  setError: (error) => set({ error }),

  // ========== Action: 清除错误 ==========
  clearError: () => set({ error: null }),

  // ========== Action: 更新单个作品状态 (点赞/收藏) ==========
  updateArtworkStatus: (artworkId, updates) =>
    set((state) => ({
      artworks: {
        ...state.artworks,
        all: state.artworks.all.map((item) =>
          item.id === artworkId ? { ...item, ...updates } : item
        ),
        favorites: state.artworks.favorites.map((item) =>
          item.id === artworkId ? { ...item, ...updates } : item
        ),
      },
    })),

  // ========== Action: 更新缓存时间 ==========
  updateLastFetchTime: () => set({ lastFetchTime: Date.now() }),

  // ========== Selector: 检查缓存是否过期 ==========
  isCacheExpired: () => {
    const state = get();
    if (!state.lastFetchTime) return true;
    return Date.now() - state.lastFetchTime > state.cacheExpiry;
  },

  // ========== Selector: 获取当前标签页的数据 ==========
  getCurrentTabData: () => {
    const state = get();
    return state.artworks[state.activeTab];
  },

  // ========== Action: 重置所有状态 ==========
  reset: () =>
    set({
      filters: { category: 'all', sortBy: 'latest', search: '' },
      activeTab: 'all',
      artworks: { all: [], favorites: [], collections: [] },
      pagination: {
        currentPage: 1,
        pageSize: PAGINATION_CONFIG.DEFAULT_PAGE_SIZE || 20,
        total: 0,
        hasMore: true,
      },
      loading: false,
      error: null,
      lastFetchTime: null,
    }),
}));

export default useDashboardStore;
