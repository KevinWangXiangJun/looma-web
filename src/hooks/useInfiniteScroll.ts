import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * 统一的无限滚动 Hook
 * 通过 IntersectionObserver 监听容器底部哨兵元素，触发加载更多
 * 同时支持 GalleryGridView 和 GalleryListView 两种视图
 */
export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = '100px',
  threshold = 0.1,
}: UseInfiniteScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // 创建 IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 哨兵元素进入视口时触发加载
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, onLoadMore, rootMargin, threshold]);

  return { containerRef, sentinelRef };
};
