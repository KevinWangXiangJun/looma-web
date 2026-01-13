/**
 * MenuToggleIcon 组件
 * 自定义SVG菜单图标 - 三条横线
 *
 * @param {string} color - 图标颜色（CSS颜色值或currentColor）
 * @param {number} size - 图标大小（像素值，如 20）
 */
export const MenuToggleIcon = ({ color = 'currentColor', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
    >
      {/* 三条横线 */}
      <line x1="3" y1="4" x2="21" y2="4" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
};

/**
 * MenuToggleWithArrowIcon 组件
 * 自定义SVG：三条横线（短）+ 向左箭头在右侧
 * 三条横线位置与 MenuToggleIcon 一致
 *
 * @param {string} color - 图标颜色（CSS颜色值或currentColor）
 * @param {number} size - 图标大小（像素值，如 20）
 */
export const MenuToggleWithArrowIcon = ({ color = 'currentColor', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
    >
      {/* 三条缩短的横线 */}
      <line x1="3" y1="4" x2="12" y2="4" />
      <line x1="3" y1="12" x2="12" y2="12" />
      <line x1="3" y1="20" x2="12" y2="20" />
      {/* 向左箭头在右侧 */}
      <polyline points="22 6 16 12 22 18" />
    </svg>
  );
};

export default MenuToggleIcon;
