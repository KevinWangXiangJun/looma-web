/**
 * 输入框样式指南
 * 
 * 推荐的统一 input 样式：
 * 
 * 1. 基础状态 (Default):
 *    - border: border-gray-300
 *    - background: bg-white
 *    
 * 2. Hover 状态:
 *    - border: border-gray-400 (亮一个阶级)
 *    - background: bg-gray-50 (轻微背景变化)
 *    - transition: transition-colors duration-200
 *    
 * 3. Focus 状态:
 *    - border: border-primary-500 (品牌主色)
 *    - ring: ring-2 ring-primary-100 (浅紫色环)
 *    - outline: outline-none
 *    - transition: transition-all duration-200
 *    
 * 4. Focus-visible (键盘导航):
 *    - 与 focus 状态相同
 *    
 * 5. Disabled 状态:
 *    - border: border-gray-200
 *    - background: bg-gray-100
 *    - cursor: cursor-not-allowed
 *    - opacity: opacity-60
 *    
 * 6. Error 状态:
 *    - border: border-red-500
 *    - ring: ring-2 ring-red-100
 *    - focus:ring-red-100
 */

/**
 * 完整的 Input 类名模板:
 * 
 * className="
 *   w-full
 *   px-3 py-2
 *   text-base
 *   border border-gray-300
 *   bg-white
 *   text-gray-900
 *   placeholder-gray-500
 *   rounded-md
 *   
 *   hover:border-gray-400 hover:bg-gray-50
 *   transition-colors duration-200
 *   
 *   focus:outline-none
 *   focus:border-purple-500
 *   focus:ring-2
 *   focus:ring-purple-100
 *   transition-all duration-200
 *   
 *   disabled:cursor-not-allowed
 *   disabled:opacity-60
 *   disabled:bg-gray-100
 *   disabled:border-gray-200
 * "
 */

/**
 * 错误状态 Input 类名模板:
 * 
 * className="
 *   w-full
 *   px-3 py-2
 *   text-base
 *   border border-red-500
 *   bg-white
 *   text-gray-900
 *   placeholder-gray-500
 *   rounded-md
 *   ring-2 ring-red-100
 *   
 *   hover:border-red-600 hover:bg-red-50
 *   transition-colors duration-200
 *   
 *   focus:outline-none
 *   focus:border-red-600
 *   focus:ring-2
 *   focus:ring-red-100
 *   transition-all duration-200
 *   
 *   disabled:cursor-not-allowed
 *   disabled:opacity-60
 *   disabled:bg-gray-100
 *   disabled:border-gray-200
 * "
 */

export const inputStyleGuide = {
  default: `
    border border-gray-300 bg-white
    hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200
    focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200
    disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-100 disabled:border-gray-200
  `,
  error: `
    border border-red-500 bg-white ring-2 ring-red-100
    hover:border-red-600 hover:bg-red-50 transition-colors duration-200
    focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all duration-200
    disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-100 disabled:border-gray-200
  `,
};
