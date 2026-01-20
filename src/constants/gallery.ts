// 图片类型过滤选项
export const IMAGE_TYPE_FILTERS = [
  { id: 'all', label: '全部', icon: 'Image' },
  { id: 'jpg', label: 'JPG', count: 0 },
  { id: 'png', label: 'PNG', count: 0 },
  { id: 'svg', label: 'SVG', count: 0 },
  { id: 'gif', label: 'GIF', count: 0 },
  { id: 'webp', label: 'WebP', count: 0 },
];

// 每页加载数量
export const IMAGES_PER_PAGE = 20;

// 网格间距（行间距和列间距）
export const GALLERY_GAP = 12;

// 瀑布流图片最小宽度（用于计算响应式列数）
export const GALLERY_IMAGE_MIN_WIDTH = 250;

// 无限滚动触发距离（距离底部多少像素时触发加载）
export const INFINITE_SCROLL_ROOT_MARGIN = '200px';

// 无限滚动阈值（0.1 表示元素 10% 进入视口时触发）
export const INFINITE_SCROLL_THRESHOLD = 0.1;

// ============ GalleryPage 配置 ============
// 默认分页大小
export const GALLERY_DEFAULT_PAGE_SIZE = 20;

// 默认滚动根边距
export const GALLERY_DEFAULT_ROOT_MARGIN = '200px';

// 默认间距
export const GALLERY_DEFAULT_GAP = 12;

// 是否启用预取
export const GALLERY_DEFAULT_PREFETCH_ENABLED = false;

// 预取深度
export const GALLERY_DEFAULT_PREFETCH_DEPTH = 2;

// 加载更多提示持续时间（毫秒）
export const LOAD_MORE_TOAST_DURATION_MS = 3000;