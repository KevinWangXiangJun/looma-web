import { useEffect, useRef, useMemo, useState } from 'react';
import { GalleryToolbar } from './GalleryToolbar';
import { GalleryBatchBar } from './GalleryBatchBar';
import { GalleryGridView } from './GalleryGridView';
import { GalleryListView } from './GalleryListView';
import { useGalleryStore } from '@/store/galleryStore';
import { usePageTitle } from '@/hooks';
import { Card } from '@/components/ui/Card';
import { FolderOpen, Loader2 } from 'lucide-react';
import { getGridColumns } from '@/utils/galleryUtils';
import { GALLERY_IMAGE_MIN_WIDTH, GALLERY_GAP, INFINITE_SCROLL_ROOT_MARGIN, INFINITE_SCROLL_THRESHOLD } from '@/constants/gallery';

export function Gallery(): JSX.Element {
  usePageTitle('navigation.gallery');

  // ============ Zustand Store 状态 ============
  const images = useGalleryStore((state) => state.images);
  const isInitialLoading = useGalleryStore((state) => state.isInitialLoading);
  const viewMode = useGalleryStore((state) => state.viewMode);
  const isLoading = useGalleryStore((state) => state.isLoading);
  const hasMore = useGalleryStore((state) => state.hasMore);
  const isBatchMode = useGalleryStore((state) => state.isBatchMode);
  const selectedImages = useGalleryStore((state) => state.selectedImages);

  // ============ Zustand Store 动作 ============
  const loadImages = useGalleryStore((state) => state.loadImages);
  const resetGallery = useGalleryStore((state) => state.resetGallery);
  const toggleBatchMode = useGalleryStore((state) => state.toggleBatchMode);
  const selectAllImages = useGalleryStore((state) => state.selectAllImages);
  const clearImageSelection = useGalleryStore((state) => state.clearImageSelection);

  // ============ 本地 State ============
  // 布局状态：从 Gallery 计算，传递给 GalleryGridView
  // 初始为 null，只有完全计算好后才有真实值
  const [gridColumns, setGridColumns] = useState<number | null>(null);
  const [gridItemWidth, setGridItemWidth] = useState<number | null>(null);

  // ============ Refs ============
  // DOM 引用
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 状态 Refs (用于解决闭包陷阱)
  const loadImagesRef = useRef(loadImages);
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);
  
  // 滚动加载相关 Refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  // 控制是否允许自动加载（用于防止初始加载时的误触）
  const allowAutoLoadRef = useRef(false);

  // 布局相关 Refs
  // 标记是否已完成初始化
  const hasInitializedRef = useRef(false);
  // 追踪上一次计算的宽度，用于防止不必要的重复计算
  const prevCalculatedWidthRef = useRef<number | null>(null);
  
  // ============ Effects: 更新 Refs ============
  // 每次依赖变化时更新 ref，确保 IntersectionObserver 中能获取最新值
  useEffect(() => { loadImagesRef.current = loadImages; }, [loadImages]);
  useEffect(() => { isLoadingRef.current = isLoading; }, [isLoading]);
  useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);

  // 重置 allowAutoLoadRef 当进入初始加载时
  useEffect(() => {
    if (isInitialLoading) {
      allowAutoLoadRef.current = false;
    }
  }, [isInitialLoading]);

  // 切换视图模式时重置自动加载锁
  useEffect(() => {
    // 切换视图时，布局会发生剧烈变化（特别是 Grid 模式需要重新计算布局），
    // 此时 LoadMore 元素可能会暂时出现在可视区域内。
    // 我们暂时禁用自动加载，直到布局稳定。
    allowAutoLoadRef.current = false;
    
    const timer = setTimeout(() => {
      allowAutoLoadRef.current = true;
    }, 800); // 给予足够时间让布局稳定

    return () => clearTimeout(timer);
  }, [viewMode]);

  // ============ Effects: 滚动加载 ============
  // 统一的滚动加载逻辑
  useEffect(() => {
    // 如果正在初始加载，或者元素未挂载，则不设置 Observer
    // 当 isInitialLoading 变为 false 时（即初始加载完成、DOM挂载后）执行
    if (isInitialLoading || !loadMoreRef.current) {
      return;
    }

    // 清理旧的 observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // 延迟开启自动加载，防止初始渲染时瞬间触发
    const enableAutoLoadTimer = setTimeout(() => {
      allowAutoLoadRef.current = true;
    }, 500);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoadingRef.current && hasMoreRef.current && allowAutoLoadRef.current) {
           loadImagesRef.current();
        }
      },
      { threshold: INFINITE_SCROLL_THRESHOLD, rootMargin: INFINITE_SCROLL_ROOT_MARGIN }
    );

    observer.observe(loadMoreRef.current);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      clearTimeout(enableAutoLoadTimer);
    };
  }, [isInitialLoading]);
  
  // ============ Effects: 布局计算 ============
  // 计算布局函数（从 GalleryGridView 移到这里）
  const calculateLayout = (): { columns: number; itemWidth: number } | null => {
    const container = containerRef.current;
    if (!container) {
      return null;
    }
    
    const measuredWidth = (typeof container.clientWidth === 'number' && container.clientWidth > 0)
      ? container.clientWidth
      : (container.getBoundingClientRect().width || container.offsetWidth || 0);
    const width = Math.max(0, measuredWidth);
    
    if (width <= 0) {
      return null;
    }

    let newColumns = Math.max(1, getGridColumns(width));
    
    const minW = typeof GALLERY_IMAGE_MIN_WIDTH === 'number' && GALLERY_IMAGE_MIN_WIDTH > 0 
      ? GALLERY_IMAGE_MIN_WIDTH 
      : 250;
    
    const gap = GALLERY_GAP;
    const totalGap = gap * Math.max(0, newColumns - 1);
    let columnWidth = Math.floor((width - totalGap) / newColumns);
    
    while (newColumns > 1 && columnWidth < minW) {
      newColumns -= 1;
      const updatedGap = gap * Math.max(0, newColumns - 1);
      columnWidth = Math.floor((width - updatedGap) / newColumns);
    }

    return { columns: newColumns, itemWidth: columnWidth };
  };

  // 优化渲染列表计算，避免频繁变化导致闪烁
  // 注意：搜索过滤已在服务端进行，这里只需要处理客户端格式过滤
  const renderedVisibleImages = useMemo(() => {
    return images;
  }, [images]);

  // ============ Effects: 生命周期 ============
  // 初始化加载
  useEffect(() => {
    resetGallery(); 
    loadImages(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 统一的布局初始化和管理
  useEffect(() => {
    if (viewMode !== 'grid' || !containerRef.current) {
      return;
    }

    let resizeTimer: NodeJS.Timeout;
    
    // ResizeObserver 回调函数
    const handleResize = () => {
      // 防抖处理：150ms 内的连续变化合并为一次计算
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const result = calculateLayout();
        if (result) {
          const { columns, itemWidth } = result;
          setGridColumns(columns);
          setGridItemWidth(itemWidth);
        }
      }, 150);
    };
    
    // 使用 ResizeObserver 监听容器大小变化
    const resizeObserver = new ResizeObserver(handleResize);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // 立即执行一次初始计算
    const result = calculateLayout();
    
    if (result) {
      const { columns, itemWidth } = result;
      hasInitializedRef.current = true;
      prevCalculatedWidthRef.current = containerRef.current?.clientWidth || 0;
      setGridColumns(columns);
      setGridItemWidth(itemWidth);
    }

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimer);
    };
  }, [viewMode]);

  // 浏览器窗口大小变化时重新计算布局
  useEffect(() => {
    if (viewMode !== 'grid' || !hasInitializedRef.current) {
      return;
    }

    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const result = calculateLayout();
        if (result) {
          const { columns, itemWidth } = result;
          const currentWidth = containerRef.current?.clientWidth || 0;
          
          if (currentWidth !== prevCalculatedWidthRef.current) {
            prevCalculatedWidthRef.current = currentWidth;
            setGridColumns(columns);
            setGridItemWidth(itemWidth);
          }
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [viewMode]);

  // ============ 事件处理 ============
  // 批量操作处理函数
  const handleBatchModeChange = () => {
    toggleBatchMode();
  };

  const handleExitBatchMode = () => {
    clearImageSelection();
    toggleBatchMode();
  };

  const handleSelectAll = () => {
    if (selectedImages.length === images.length) {
      // 已全选，取消全选
      clearImageSelection();
    } else {
      // 选中所有显示的图片
      selectAllImages();
    }
  };

  const handleCollect = () => {
    console.log('Collect:', selectedImages);
    // TODO: 实现收藏逻辑
  };

  const handleDownload = () => {
    console.log('Download:', selectedImages);
    // TODO: 实现下载逻辑
  };

  const handleDelete = () => {
    console.log('Delete:', selectedImages);
    // TODO: 实现删除逻辑
  };

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20 min-h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">我的图库</h1>
        <p className="text-muted-foreground text-sm mt-1">管理您上传和生成的所有图片</p>
      </div>

      <div className="flex-shrink-0 mb-4 sticky top-0 bg-gradient-to-br from-background via-background to-muted/20 z-10">
        <GalleryToolbar onBatchModeChange={handleBatchModeChange} />
        {isBatchMode && (
          <GalleryBatchBar
            selectedCount={selectedImages.length}
            totalCount={images.length}
            isAllSelected={selectedImages.length === images.length}
            onExit={handleExitBatchMode}
            onSelectAll={handleSelectAll}
            onCollect={handleCollect}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* 内容区域 */}
      <div 
        ref={containerRef}
        className="flex-1 relative" 
      >
        {images.length === 0 ? (
          isInitialLoading ? (
            // 初始加载中，显示加载状态
            <div className="w-full flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <Loader2 className="w-12 h-12 mx-auto text-indigo-600 animate-spin" />
                <p className="text-sm text-muted-foreground">图片加载中...</p>
              </div>
            </div>
          ) : (
            // 加载完成但无图片
            <Card className="w-full py-12 flex items-center justify-center h-64">
              <div className="text-center space-y-3">
                <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground opacity-20" />
                <h3 className="font-medium">暂无图片</h3>
                <p className="text-sm text-muted-foreground">开始上传或生成您的第一张图片吧</p>
              </div>
            </Card>
          )
        ) : (
          <div className="w-full">
            {
              viewMode === 'grid' ? (
                <div className="gallery-grid-wrapper">
                  {gridColumns !== null && gridItemWidth !== null ? (
                    <GalleryGridView 
                      containerRef={containerRef} 
                      renderedVisibleImages={renderedVisibleImages}
                      columns={gridColumns}
                      itemWidth={gridItemWidth}
                    />
                  ) : (
                    <div className="w-full min-h-full" />
                  )}
                </div>
              ) : (
                <GalleryListView renderedVisibleImages={renderedVisibleImages} />
              )
            }
            
            {/* 统一的加载触发器 - 放在可见的容器中 */}
            <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center mt-4 pointer-events-none">
              {!isLoading && !hasMore && images.length > 0 && (
                <span className="text-gray-400 text-sm">没有更多照片了</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
