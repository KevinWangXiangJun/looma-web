/**
 * 图片工具函数
 * 用于获取本地图片的实际宽度和高度
 */

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * 异步获取图片的实际宽度和高度
 * @param src 图片路径
 * @returns 返回图片宽高对象
 */
export const getImageDimensions = (src: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    
    img.onerror = () => {
      // 加载失败时返回默认宽高比
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    // 处理跨域问题
    img.crossOrigin = 'anonymous';
    img.src = src;
  });
};

/**
 * 批量获取多个图片的宽高
 * @param sources 图片路径数组
 * @returns 返回宽高数组
 */
export const getImagesDimensions = async (
  sources: string[]
): Promise<ImageDimensions[]> => {
  return Promise.all(sources.map(src => getImageDimensions(src)));
};
