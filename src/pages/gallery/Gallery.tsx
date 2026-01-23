import { useEffect, useRef, useMemo, useState, startTransition } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { GalleryToolbar } from './GalleryToolbar';
import { GalleryBatchBar } from './GalleryBatchBar';
import { GalleryGridView } from './GalleryGridView';
import { GalleryListView } from './GalleryListView';
import { useGalleryStore } from '@/store/galleryStore';
import { usePageTitle } from '@/hooks';
import { Card } from '@/components/ui/Card';
import { FolderOpen, Loader2 } from 'lucide-react';
import { getGridColumns } from '@/utils/gallery';
import { GALLERY_IMAGE_MIN_WIDTH, GALLERY_GAP, INFINITE_SCROLL_ROOT_MARGIN, INFINITE_SCROLL_THRESHOLD } from '@/constants/gallery';

export function Gallery(): JSX.Element {
  usePageTitle('navigation.gallery');

  // ============ Zustand Store 状态与动作合并优化 ============
  const {
    images,
    isInitialLoading,
    viewMode,
    isLoading,
    hasMore,
    isBatchMode,
    loadImages,
    resetGallery,
  } = useGalleryStore(
    useShallow((state) => ({
      images: state.images,
      isInitialLoading: state.isInitialLoading,
      viewMode: state.viewMode,
      isLoading: state.isLoading,
      hasMore: state.hasMore,
      isBatchMode: state.isBatchMode,
      loadImages: state.loadImages,
      resetGallery: state.resetGallery,
    }))
  );

  // ============ 本地 State ============
  
  // 性能优化：缓存两个视图的渲染状态，避免切换时重新计算
  const [cachedGridView, setCachedGridView] = useState<React.ReactNode | null>(null);
  const [cachedListView, setCachedListView] = useState<React.ReactNode | null>(null);

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

  // 性能优化：当视图数据更新时，缓存对应视图的渲染结果
  // 这样在切换视图时，不需要重新计算和渲染，直接使用缓存
  useEffect(() => {
    if (images.length === 0) {
      setCachedGridView(null);
      setCachedListView(null);
      return;
    }

    // 使用 startTransition 包装视图渲染，标记为低优先级更新
    // 这样用户交互（如点击）不会被长时间的视图更新阻塞
    startTransition(() => {
      if (viewMode === 'grid') {
        // GridView 现在自己处理布局计算，不需要传递 columns 和 width
        setCachedGridView(
          <div className="gallery-grid-wrapper">
            <GalleryGridView 
              renderedVisibleImages={renderedVisibleImages}
            />
          </div>
        );
      } else {
        setCachedListView(
          <GalleryListView renderedVisibleImages={renderedVisibleImages} />
        );
      }
    });
  }, [renderedVisibleImages, viewMode, images.length]);
  
  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20 min-h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">我的图库</h1>
        <p className="text-muted-foreground text-sm mt-1">管理您上传和生成的所有图片</p>
      </div>

      <div className="flex-shrink-0 mb-4 sticky top-0 bg-gradient-to-br from-background via-background to-muted/20 z-10">
        <GalleryToolbar />
        {isBatchMode && (
          <GalleryBatchBar />
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
              // 性能优化：使用缓存的视图，而不是每次都重新计算
              viewMode === 'grid' ? cachedGridView : cachedListView
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
