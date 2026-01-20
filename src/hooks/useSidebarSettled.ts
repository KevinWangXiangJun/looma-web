import { useState, useEffect, RefObject } from 'react';

/**
 * Hook that returns a boolean flag indicating whether the container size has settled.
 * Initial value is true (initial state is considered settled).
 * Becomes false when resize starts, then true again when resizing stops.
 * Useful for tracking when sidebar/layout animations complete.
 */
export const useSidebarSettled = (
  containerRef: RefObject<HTMLElement>,
  delay: number = 200
): boolean => {
  const [settled, setSettled] = useState(true); // 初始值为 true

  useEffect(() => {
    if (!containerRef.current) return;

    let timeout: NodeJS.Timeout;
    
    const resizeObserver = new ResizeObserver(() => {
      // 容器开始改变大小时，立即变成 false
      setSettled(false);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // 稳定后变回 true
        setSettled(true);
      }, delay);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [containerRef, delay]);

  return settled;
};
