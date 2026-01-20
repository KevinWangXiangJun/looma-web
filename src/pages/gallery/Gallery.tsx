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
import { GALLERY_IMAGE_MIN_WIDTH, GALLERY_GAP } from '@/constants/gallery';

export function Gallery(): JSX.Element {
  usePageTitle('navigation.gallery');

  // 从 Store 获取状态和操作
  const images = useGalleryStore((state) => state.images);
  const isInitialLoading = useGalleryStore((state) => state.isInitialLoading);
  const viewMode = useGalleryStore((state) => state.viewMode);
  const loadImages = useGalleryStore((state) => state.loadImages);
  const resetGallery = useGalleryStore((state) => state.resetGallery);
  const isLoading = useGalleryStore((state) => state.isLoading);
  const hasMore = useGalleryStore((state) => state.hasMore);

  // ============ 本地状态和 refs ============
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // 布局状态：从 Gallery 计算，传递给 GalleryGridView
  // 初始为 null，只有完全计算好后才有真实值
  const [gridColumns, setGridColumns] = useState<number | null>(null);
  const [gridItemWidth, setGridItemWidth] = useState<number | null>(null);
  
  // 标记是否已完成初始化
  const hasInitializedRef = useRef(false);
  
  // 追踪上一次计算的宽度，用于防止不必要的重复计算
  const prevCalculatedWidthRef = useRef<number | null>(null);

  // 批量操作状态
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(new Set());

  // 计算布局函数（从 GalleryGridView 移到这里）
  // 不使用 useCallback，因为它内部没有任何依赖且每次重新创建反而会触发 useEffect
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

  // 优化渲染列表计算，避免频繁变化导致闪烁，窗口化渲染：仅保留最近 N 页的图片
  const renderedVisibleImages = useMemo(() => {
    // 禁用窗口化渲染，直接返回所有图片
    // 窗口化会导致列表频繁变动，结合虚拟滚动容易引起滚动条抖动
    return images;
  }, [images]);

  // 初始化加载
  useEffect(() => {
    resetGallery(); 
    loadImages(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 统一的滚动加载逻辑
  useEffect(() => {
    let timer: any = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
           // 增加一个小延时，防止因为布局（切换视图）瞬间高度塌陷导致的误触
           timer = setTimeout(() => {
             loadImages();
           }, 100);
        }
      },
      { threshold: 0.01, rootMargin: '50px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
       observer.disconnect();
       if (timer) clearTimeout(timer);
    };
  }, [isLoading, hasMore, loadImages, viewMode]);

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

  // 批量操作处理函数
  const handleBatchModeChange = () => {
    setIsBatchMode(!isBatchMode);
    if (isBatchMode) {
      setSelectedImageIds(new Set());
    }
  };

  const handleExitBatchMode = () => {
    setIsBatchMode(false);
    setSelectedImageIds(new Set());
  };

  const handleSelectAll = () => {
    if (selectedImageIds.size === images.length) {
      // 已全选，取消全选
      setSelectedImageIds(new Set());
    } else {
      // 选中所有显示的图片
      setSelectedImageIds(new Set(images.map((img) => img.id)));
    }
  };

  const handleCollect = () => {
    console.log('Collect:', Array.from(selectedImageIds));
    // TODO: 实现收藏逻辑
  };

  const handleDownload = () => {
    console.log('Download:', Array.from(selectedImageIds));
    // TODO: 实现下载逻辑
  };

  const handleDelete = () => {
    console.log('Delete:', Array.from(selectedImageIds));
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
            selectedCount={selectedImageIds.size}
            totalCount={images.length}
            isAllSelected={selectedImageIds.size === images.length}
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
