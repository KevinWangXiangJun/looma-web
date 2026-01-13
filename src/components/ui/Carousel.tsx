import { useState, useEffect, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export const CarouselBase = ({
  items = [],
  autoplay = true,
  interval = 5000,
  className = '',
  showNavigation = true,
}: {
  items?: any[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
  showNavigation?: boolean;
} = {}) => {
  const [current, setCurrent] = useState(0);

  // 确保 items 是一个有效的数组
  const validItems = Array.isArray(items) ? items.filter((item) => item) : [];

  useEffect(() => {
    if (!autoplay || validItems.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % validItems.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, validItems.length]);

  if (validItems.length === 0) {
    return (
      <div className={cn('bg-gray-200 flex items-center justify-center', className)}>No items</div>
    );
  }

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + validItems.length) % validItems.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % validItems.length);
  };

  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg bg-gray-900', className)}>
      {/* 轮播项 */}
      <div className="relative w-full h-full">
        {validItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-500 flex items-center justify-center',
              current === index ? 'opacity-100' : 'opacity-0'
            )}
          >
            {typeof item === 'string' ? (
              <img src={item} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            ) : typeof item === 'object' && item !== null ? (
              <div className="text-center text-white px-8">
                <h3 className="text-3xl font-bold mb-2">{item.title || `Slide ${index + 1}`}</h3>
                <p className="text-lg text-gray-300">{item.description || ''}</p>
              </div>
            ) : (
              item
            )}
          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      {showNavigation && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/30 hover:bg-white/50 p-2 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/30 hover:bg-white/50 p-2 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {validItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              'h-2 rounded-full transition-all',
              current === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const Carousel = memo(CarouselBase);
