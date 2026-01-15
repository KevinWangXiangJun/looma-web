/**
 * 统一输入组件样式指南
 * 
 * 本文件为 Looma 项目中的所有输入组件提供标准化样式规范，
 * 确保应用程序中的视觉一致性。
 * 
 * 标准色彩方案：
 * - 主色：紫色 (primary-600)
 * - 错误：红色 (red-500)
 * - 禁用：灰色 (gray-200 / gray-100)
 */

/**
 * 基础输入类
 * 将这些类作为所有输入样式的基础
 */
export const INPUT_STYLES = {
  /**
   * 默认状态 - 正常、未交互的输入
   * 将这些类应用于所有输入作为基线
   */
  base: [
    'flex h-10 w-full min-w-0 rounded border px-3 py-1 text-base outline-none',
    'bg-white border-gray-300',
    'placeholder:text-gray-400',
    'transition-colors transition-shadow duration-200',
  ].join(' '),

  /**
   * 悬停状态 - 用户悬停在输入上（未聚焦）
   * 微妙的视觉反馈，表示可交互性
   */
  hover: [
    'hover:border-gray-400',
    'hover:bg-gray-50',
  ].join(' '),

  /**
   * 聚焦状态 - 输入被聚焦（活跃）
   * 通过主色清晰显示焦点
   * 推荐的主色：primary-600
   */
  focus: [
    'focus:border-primary-500',
    'focus:ring-2 focus:ring-primary-100',
    'focus-visible:border-primary-500',
    'focus-visible:ring-2 focus-visible:ring-primary-100',
    'focus:outline-none',
  ].join(' '),

  /**
   * 禁用状态 - 输入被禁用/只读
   * 表示输入无法交互
   */
  disabled: [
    'disabled:opacity-60',
    'disabled:bg-gray-100',
    'disabled:border-gray-200',
    'disabled:cursor-not-allowed',
  ].join(' '),

  /**
   * 错误状态 - 验证错误
   * 红色方案表示错误
   * 当存在错误时，在基础类的基础上应用
   */
  error: [
    'border-red-500',
    'hover:border-red-600',
    'hover:bg-red-50',
    'focus:border-red-500',
    'focus:ring-2 focus:ring-red-100',
    'focus-visible:border-red-500',
    'focus-visible:ring-2 focus-visible:ring-red-100',
  ].join(' '),

  /**
   * 成功状态 - 验证成功（可选）
   * 绿色方案表示成功
   */
  success: [
    'border-green-500',
    'focus:border-green-500',
    'focus:ring-2 focus:ring-green-100',
    'focus-visible:border-green-500',
    'focus-visible:ring-2 focus-visible:ring-green-100',
  ].join(' '),

  /**
   * 深色模式调整（可选）
   */
  dark: [
    'dark:bg-slate-900',
    'dark:border-slate-700',
    'dark:text-white',
    'dark:placeholder:text-slate-400',
    'dark:hover:border-slate-600',
    'dark:focus:border-primary-400',
  ].join(' '),
};

/**
 * 组合样式预设
 * 为常见场景准备的即用型组合
 */
export const INPUT_PRESETS = {
  /**
   * 标准输入 - 默认 + 悬停 + 聚焦 + 禁用
   * 用于大多数输入字段
   */
  standard: [
    INPUT_STYLES.base,
    INPUT_STYLES.hover,
    INPUT_STYLES.focus,
    INPUT_STYLES.disabled,
  ].join(' '),

  /**
   * 错误输入 - 带错误样式
   * 显示验证错误时使用
   */
  errorState: [
    INPUT_STYLES.base,
    INPUT_STYLES.error,
    INPUT_STYLES.disabled,
  ].join(' '),

  /**
   * 成功输入 - 带成功样式
   * 显示验证成功时使用
   */
  successState: [
    INPUT_STYLES.base,
    INPUT_STYLES.success,
    INPUT_STYLES.disabled,
  ].join(' '),

  /**
   * 紧凑输入 - 内联使用的较小内边距
   */
  compact: [
    'flex h-8 w-full min-w-0 rounded border px-2 py-0.5 text-sm outline-none',
    'bg-white border-gray-300',
    'placeholder:text-gray-400',
    INPUT_STYLES.hover,
    INPUT_STYLES.focus,
    INPUT_STYLES.disabled,
  ].join(' '),

  /**
   * 大输入 - 突出字段的较大内边距
   */
  large: [
    'flex h-12 w-full min-w-0 rounded border px-4 py-2 text-base outline-none',
    'bg-white border-gray-300',
    'placeholder:text-gray-400',
    INPUT_STYLES.hover,
    INPUT_STYLES.focus,
    INPUT_STYLES.disabled,
  ].join(' '),
};

/**
 * 实现指南
 * 
 * 1. 基础输入（无错误）：
 *    className={cn(INPUT_PRESETS.standard, customClasses)}
 * 
 * 2. 带错误的输入：
 *    className={cn(error ? INPUT_PRESETS.errorState : INPUT_PRESETS.standard)}
 * 
 * 3. 带成功的输入：
 *    className={cn(isValid ? INPUT_PRESETS.successState : INPUT_PRESETS.standard)}
 * 
 * 4. 自定义颜色覆盖（非标准）：
 *    如果需要不同的主色（例如蓝色而非紫色）：
 *    替换焦点类为：focus:border-blue-500 focus:ring-blue-100
 * 
 * 5. 与 Tailwind 类组合：
 *    className={cn(
 *      INPUT_PRESETS.standard,
 *      'max-w-xs',  // 自定义大小约束
 *      'text-lg',   // 自定义文本大小
 *      'rounded-lg' // 自定义边框半径
 *    )}
 * 
 * 关键原则：
 * - 始终使用 INPUT_PRESETS.standard 作为基础
 * - 条件性使用错误/成功状态
 * - 不要硬编码单个悬停/聚焦类
 * - 保持主色一致（primary-600）
 * - 为焦点状态维护 ring-[color]/100
 * - 使用 cn() 工具组合类
 */

/**
 * 颜色调色板参考
 * 
 * 主色（焦点）：primary-500, primary-600, primary-100（环）
 * 错误：red-500, red-600, red-100（环）
 * 成功：green-500, green-600, green-100（环）
 * 中性（边框）：gray-300, gray-400, gray-200
 * 禁用：gray-100, gray-200, opacity-60
 * 
 * 标准环宽：2px (ring-2)
 * 边框宽：1px（默认）
 * 过渡：duration-200
 */
