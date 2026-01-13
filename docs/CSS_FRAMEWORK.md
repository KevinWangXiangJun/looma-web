# Looma Web CSS 框架文档

## 📋 目录
- [概述](#概述)
- [色彩系统](#色彩系统)
- [间距系统](#间距系统)
- [实用工具类](#实用工具类)
- [状态管理](#状态管理)
- [响应式设计](#响应式设计)
- [代码组织](#代码组织)
- [最佳实践](#最佳实践)
- [浏览器兼容性](#浏览器兼容性)

---

## 概述

本项目使用基于 **Tailwind CSS** 的现代化 CSS 框架，包含 **1500+ 生产级实用工具类**。框架采用 oklch() 颜色空间以实现更一致的视觉效果，所有工具类按功能分层组织，支持完整的响应式设计和状态管理。

### 关键特性

✅ **oklch() 颜色系统** - 感知统一的颜色空间  
✅ **1500+ 实用工具类** - 完整覆盖布局、排版、颜色、状态  
✅ **完整的响应式支持** - 5 个断点级别  
✅ **设备感知交互** - @media (hover: hover) 防止触摸设备问题  
✅ **无障碍支持** - @media (forced-colors: active) 和高对比度模式  
✅ **优化的代码组织** - 统一的媒体查询块减少文件大小

---

## 色彩系统

### oklch() 颜色空间

采用 oklch() 代替 RGB，提供更好的感知均匀性：
- **L (Lightness)**: 0-1，从黑到白
- **C (Chroma)**: 0-0.4，饱和度
- **H (Hue)**: 0-360，色相

### 主题变量

#### Light Mode (`:root`)
```css
:root {
  --primary: #6366f1;              /* 主颜色 */
  --secondary: oklch(0.95 0.0058 264.53);
  --destructive: #ef4444;          /* 危险操作 */
  --accent: #e9ebef;               /* 强调色 */
  --muted: #f3f4f6;                /* 中性色 */
  --foreground: oklch(0.145 0 0);  /* 文字色 */
  --background: #fafafa;           /* 背景色 */
  /* ... 更多变量 */
}
```

#### Dark Mode (`.dark`)
```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  /* ... 更多变量 */
}
```

### 色彩等级

所有主要颜色都有 10 级渐进：
```
primary-50, primary-100, ..., primary-900
gray-50, gray-100, ..., gray-900
blue-50, blue-100, ..., blue-900
red-50, red-100, ..., red-900
green-50, green-100, ..., green-900
purple-50, purple-100, ..., purple-900
```

### 颜色混合支持

对于浏览器支持 `color-mix()`，自动使用 oklab 混合模式实现透明度变体：

```css
@supports (color: color-mix(in lab, red, red)) {
  .bg-primary\/50:hover {
    background-color: color-mix(in oklab, var(--primary) 50%, transparent);
  }
}
```

---

## 间距系统

### 基础单位

所有间距基于 `--spacing: 0.25rem`（4px）的倍数：

```css
/* 计算公式 */
calc(var(--spacing) * n)  /* n = 1 到 100 */
```

### 间距工具类

#### 外间距 (Margin)
- **统一边距**: `.m-1` 到 `.m-100` - 四个方向同时应用
- **单边边距**: `.mt-*` (top), `.mr-*` (right), `.mb-*` (bottom), `.ml-*` (left)
- **轴向边距**: `.mx-*` (horizontal), `.my-*` (vertical)
- **块级边距**: `.block-m-*`, `.block-mt-*`, `.block-mb-*`
- **自动边距**: `.m-auto`, `.mx-auto` (居中)
- **负外间距**: `.-m-1` 到 `.-m-50` (用于重叠)

#### 内间距 (Padding)
- **统一内间距**: `.p-1` 到 `.p-100`
- **单边内间距**: `.pt-*`, `.pr-*`, `.pb-*`, `.pl-*`
- **轴向内间距**: `.px-*`, `.py-*`

#### 示例
```html
<!-- 外间距 -->
<div class="m-4">四周各 1rem 的外间距</div>
<div class="mt-8 mb-4">上 2rem，下 1rem</div>
<div class="mx-auto">水平居中</div>

<!-- 内间距 -->
<div class="p-6">四周各 1.5rem 的内间距</div>
<div class="px-8 py-4">水平 2rem，垂直 1rem</div>
```

---

## 实用工具类

### 布局工具类 (200+ 个)

#### Flexbox
```html
<!-- 方向 -->
<div class="flex flex-col">列布局</div>
<div class="flex flex-row-reverse">反向行</div>

<!-- 对齐 -->
<div class="flex items-center justify-between">中心对齐，两端分布</div>
<div class="flex gap-4">Flex 项之间 1rem 间距</div>
```

#### Grid
```html
<!-- 列定义 -->
<div class="grid grid-cols-3">3 列网格</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">响应式列数</div>

<!-- 跨度 -->
<div class="col-span-2">占据 2 列</div>
<div class="col-start-2">从第 2 列开始</div>
```

#### Display
```html
<div class="block">块级元素</div>
<div class="flex">Flex 容器</div>
<div class="grid">Grid 容器</div>
<div class="hidden">隐藏</div>
<div class="inline">内联元素</div>
<div class="inline-block">内联块</div>
```

### 尺寸工具类 (150+ 个)

#### 宽度
```html
<!-- 相对宽度 -->
<div class="w-1/2">50%</div>
<div class="w-2/5">40%</div>
<div class="w-full">100%</div>

<!-- 绝对宽度 -->
<div class="w-64">16rem (256px)</div>

<!-- 特殊值 -->
<div class="w-auto">自动</div>
<div class="w-fit">内容宽度</div>
<div class="w-screen">视口宽度</div>
<div class="w-max">最大内容宽度</div>

<!-- 容器查询 -->
<div class="w-cqw-50">容器查询宽度 50%</div>
```

#### 高度
```html
<div class="h-screen">100vh</div>
<div class="h-full">100%</div>
<div class="h-auto">自动高度</div>
<div class="h-64">16rem</div>
```

#### 最小/最大值
```html
<div class="min-w-0 max-w-2xl">最小 0，最大 42rem</div>
<div class="min-h-screen">至少满屏高</div>
```

### 排版工具类 (100+ 个)

#### 字体
```html
<!-- 字体族 -->
<div class="font-mono">等宽字体</div>

<!-- 字体权重 -->
<div class="font-light">300</div>
<div class="font-normal">400</div>
<div class="font-medium">500</div>
<div class="font-bold">700</div>
<div class="font-black">900</div>

<!-- 字体大小 (xs 到 4xl，带行高) -->
<div class="text-xs">12px, line-height: 1.5</div>
<div class="text-base">16px, line-height: 1.5</div>
<div class="text-2xl">24px, line-height: 1.25</div>
```

#### 文本对齐
```html
<div class="text-left">左对齐</div>
<div class="text-center">居中</div>
<div class="text-right">右对齐</div>
<div class="text-justify">两端对齐</div>
```

#### 文本装饰
```html
<div class="underline">下划线</div>
<div class="line-through">删除线</div>
<div class="decoration-dotted">点状下划线</div>
<div class="decoration-dashed">虚线下划线</div>
<div class="underline-offset-4">下划线偏移</div>
```

#### 文本转换
```html
<div class="uppercase">大写</div>
<div class="lowercase">小写</div>
<div class="capitalize">首字母大写</div>
```

### 颜色工具类 (300+ 个)

#### 背景色
```html
<!-- 主色系 -->
<div class="bg-primary">主颜色</div>
<div class="bg-primary-50">浅色变体</div>
<div class="bg-primary-900">深色变体</div>

<!-- 透明度变体 -->
<div class="bg-primary/50">50% 透明</div>
<div class="bg-destructive/20">危险色 20% 透明</div>

<!-- 特殊色 -->
<div class="bg-accent">强调色</div>
<div class="bg-muted">静音色</div>
<div class="bg-transparent">透明</div>
```

#### 文字色
```html
<div class="text-primary">主文字色</div>
<div class="text-primary-600">特定级别</div>
<div class="text-white">白色</div>
<div class="text-destructive">危险色文字</div>
```

#### 边框色
```html
<div class="border border-primary">主色边框</div>
<div class="border-2 border-destructive">加粗危险色边框</div>
<div class="border-dashed border-gray-300">虚线灰色边框</div>
```

### 渐变工具类 (90+ 个)

#### 渐变方向
```html
<div class="bg-gradient-to-t">从下到上</div>
<div class="bg-gradient-to-r">从左到右</div>
<div class="bg-gradient-to-br">从左上到右下</div>
```

#### 渐变色
```html
<!-- Primary 渐变 -->
<div class="bg-gradient-to-r from-primary-500 to-primary-900">
  从主色-500 到主色-900
</div>

<!-- Gray 渐变 -->
<div class="bg-gradient-to-b from-gray-100 to-gray-600">
  从灰色-100 到灰色-600
</div>

<!-- 其他色系: blue, red, green, purple -->
```

### 圆角工具类 (20+ 个)

```html
<div class="rounded">标准圆角</div>
<div class="rounded-lg">大圆角</div>
<div class="rounded-full">完全圆形</div>
<div class="rounded-t-lg">上边圆角</div>
<div class="rounded-br-none">右下角无圆角</div>
```

### 阴影工具类 (10+ 个)

```html
<div class="shadow-sm">小阴影</div>
<div class="shadow-md">中阴影</div>
<div class="shadow-lg">大阴影</div>
```

### 边框工具类 (15+ 个)

```html
<div class="border">1px 实线边框</div>
<div class="border-2">2px 边框</div>
<div class="border-t border-b">上下边框</div>
<div class="border-dashed">虚线边框</div>
<div class="border-dotted">点状边框</div>
```

---

## 状态管理

### Hover 状态 (120+ 个)

所有 hover 样式统一在单个 `@media (hover: hover)` 块中，防止触摸设备误触：

```css
@media (hover: hover) {
  .hover\:bg-primary:hover {
    background-color: var(--primary);
  }
  .hover\:text-primary-600:hover {
    color: var(--color-primary-600);
  }
  .hover\:underline:hover {
    text-decoration-line: underline;
  }
  .hover\:shadow-lg:hover {
    /* 阴影效果 */
  }
  
  /* 群组 hover */
  .group-hover\:scale-110:is(:where(.group):hover *) {
    scale: 1.1;
  }
  
  /* 禁用状态的 hover */
  .disabled\:hover\:bg-transparent:disabled:hover {
    background-color: transparent;
  }
}
```

#### 使用示例
```html
<!-- 按钮悬停效果 -->
<button class="bg-primary text-white hover:bg-primary-700 hover:shadow-lg">
  点击我
</button>

<!-- 群组悬停 -->
<div class="group p-4 hover:bg-accent">
  <h3 class="group-hover:text-primary">标题</h3>
  <img class="group-hover:scale-110 transition-transform" src="..." />
</div>
```

### Focus 状态 (13 个)

包括 `.focus\:` 和 `.focus-visible\:` 样式，支持键盘导航和屏幕阅读器：

```css
/* Focus 状态 */
.focus\:z-10:focus {
  z-index: 10;
}
.focus\:ring-2:focus {
  --tw-ring-shadow: /* ring 效果 */
}

/* Focus-visible 状态 (键盘导航) */
.focus-visible\:ring-[3px]:focus-visible {
  --tw-ring-shadow: /* 更粗的 ring */
}
```

#### 使用示例
```html
<!-- 表单输入 -->
<input 
  type="text" 
  class="border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
/>

<!-- 可聚焦按钮 -->
<button class="focus-visible:outline-2 focus-visible:outline-primary">
  键盘可访问
</button>
```

### Disabled 状态 (3 个)

```css
.disabled\:pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\:opacity-50:disabled {
  opacity: 0.5;
}
```

#### 使用示例
```html
<button disabled class="opacity-100 disabled:opacity-50 disabled:cursor-not-allowed">
  禁用按钮
</button>
```

### Data 属性状态 (51 个)

支持 Radix UI 数据属性的条件样式：

```html
<!-- Data state 示例 -->
<div data-state="active" class="data-[state=active]:bg-primary">
  激活状态
</div>

<!-- Data side 示例 -->
<div data-side="top" class="data-[side=top]:rounded-b-lg">
  上边位置
</div>

<!-- Data orientation 示例 -->
<div data-orientation="vertical" class="data-[orientation=vertical]:flex-col">
  垂直方向
</div>
```

---

## 响应式设计

### 断点系统

5 个标准断点，可通过前缀在任意工具类上使用：

| 断点 | 最小宽度 | CSS 等价 |
|------|--------|---------|
| `sm` | 40rem (640px) | `@media (min-width: 40rem)` |
| `md` | 48rem (768px) | `@media (min-width: 48rem)` |
| `lg` | 64rem (1024px) | `@media (min-width: 64rem)` |
| `xl` | 80rem (1280px) | `@media (min-width: 80rem)` |
| `2xl` | 90rem (1440px) | `@media (min-width: 90rem)` |

### 响应式使用示例

```html
<!-- 布局 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <div>卡片 1</div>
  <div>卡片 2</div>
  <div>卡片 3</div>
</div>

<!-- 文字大小 -->
<h1 class="text-base sm:text-lg md:text-2xl lg:text-3xl">
  响应式标题
</h1>

<!-- 间距 -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  响应式内间距
</div>

<!-- 隐显 -->
<nav class="hidden md:flex">
  仅在中等屏幕以上显示
</nav>
```

### 移动优先策略

所有响应式工具类遵循移动优先原则 - 默认样式应用于移动设备，断点前缀用于更大屏幕：

```html
<!-- 不推荐：桌面优先 -->
<div class="lg:grid-cols-3">
  <!-- 在 lg 屏幕时 3 列，否则是什么? -->
</div>

<!-- 推荐：移动优先 -->
<div class="grid-cols-1 lg:grid-cols-3">
  <!-- 移动: 1 列，lg 屏幕: 3 列 -->
</div>
```

---

## 代码组织

### CSS 文件结构

```
index.css
├── @layer properties        /* CSS 自定义属性定义 */
├── @layer theme             /* 主题变量 (:root, .dark) */
├── @layer base              /* 全局基础样式 */
└── @layer utilities         /* 1500+ 实用工具类
    ├── 容器查询
    ├── 指针事件
    ├── 屏幕阅读器
    ├── 定位
    ├── 显示属性
    ├── 尺寸 (width, height, min/max-w/h)
    ├── 位置偏移 (top, left, right, bottom)
    ├── 颜色 (bg, text, border + opacity 变体)
    ├── 间距 (margin, padding)
    ├── 布局 (flex, grid, gap)
    ├── 排版 (font, text, decoration)
    ├── 圆角 (border-radius)
    ├── 边框 (border-width, style, color)
    ├── 阴影 (box-shadow)
    ├── 透明度 (opacity)
    ├── 变换 (transform, scale, rotate)
    ├── 动画 (@keyframes, animation)
    ├── 光标 (cursor)
    ├── 用户交互 (user-select, resize)
    ├── 滚动 (scroll-margin, scroll-padding)
    ├── 列表 (list-style)
    ├── 自对齐 (self, justify-self)
    ├── 文本溢出 (text-overflow, truncate)
    ├── Hover 状态 (单个 @media (hover: hover) 块)
    ├── Focus 状态
    ├── Focus-visible 状态
    ├── Data 属性状态
    ├── 响应式工具类
    └── 渐变工具类
```

### 媒体查询优化

#### 之前（低效）
```css
@media (hover: hover) { .hover\:bg-primary:hover { ... } }
@media (hover: hover) { .hover\:text-primary:hover { ... } }
@media (hover: hover) { .hover\:underline:hover { ... } }
/* 20+ 个单独的媒体查询块 */
```

#### 之后（优化）
```css
/* 单个统一块 - 更好的性能和可维护性 */
@media (hover: hover) {
  .hover\:bg-primary:hover { ... }
  .hover\:text-primary:hover { ... }
  .hover\:underline:hover { ... }
  /* 所有 hover 样式集中在此 */
}
```

**优势：**
- ✅ 减少媒体查询块数量
- ✅ 改善浏览器解析性能
- ✅ 提高代码可维护性
- ✅ 减小文件大小

---

## 最佳实践

### 1. 命名约定

遵循 Tailwind CSS 的命名模式：

```html
<!-- [修饰符]:[属性]-[值] -->
<div class="flex md:grid-cols-3 hover:bg-primary focus-visible:ring-2">
  <!-- flex: 基础工具类 -->
  <!-- md: 断点修饰符 -->
  <!-- hover: 伪类修饰符 -->
  <!-- focus-visible: 伪类修饰符 -->
</div>
```

### 2. 颜色使用

始终优先使用语义化颜色变量：

```html
<!-- ✅ 好 -->
<button class="bg-primary text-primary-foreground hover:bg-primary-700">
  按钮
</button>

<!-- ✅ 好 -->
<div class="border border-destructive text-destructive">
  错误消息
</div>

<!-- ❌ 避免 -->
<button class="bg-blue-600">不清楚用途</button>
```

### 3. 响应式设计模式

遵循移动优先，从小屏开始定义样式：

```html
<!-- ✅ 好：移动优先 -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  内容
</div>

<!-- ❌ 避免：桌面优先 -->
<div class="lg:p-12">内容</div>
```

### 4. 状态优先级

利用伪类修饰符处理交互状态：

```html
<!-- 完整的交互流程 -->
<input 
  type="text"
  class="
    border border-gray-300
    focus:border-primary focus:ring-2 focus:ring-primary/50
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:border-primary-600
  "
/>
```

### 5. 间距一致性

使用多倍的基础间距单位维持视觉节奏：

```html
<!-- ✅ 好：使用 4x 的倍数 -->
<div class="p-4 m-6 gap-8">
  <!-- 1rem (4x), 1.5rem (6x), 2rem (8x) -->
</div>

<!-- ❌ 避免：不一致的间距 -->
<div class="p-3 m-7 gap-9">
  <!-- 不遵循间距系统 -->
</div>
```

### 6. 可访问性考虑

- 始终使用 `focus-visible` 处理键盘导航
- 利用 `@media (hover: hover)` 防止触摸设备问题
- 为禁用状态提供明确的视觉反馈
- 使用 `sr-only` 隐藏屏幕阅读器专用文本

```html
<button>
  <span class="sr-only">编辑用户信息</span>
  <svg><!-- 图标 --></svg>
</button>
```

### 7. 性能优化

- 避免过度嵌套选择器
- 优先使用工具类而非自定义 CSS
- 利用 PurgeCSS/树摇动去除未使用的工具类
- 保持 CSS 文件在合理大小（当前 ~200KB）

---

## 浏览器兼容性

### 支持的浏览器

| 浏览器 | 最低版本 | 备注 |
|------|--------|------|
| Chrome | 90+ | 完整支持 |
| Firefox | 88+ | 完整支持 |
| Safari | 14+ | 完整支持 |
| Edge | 90+ | 完整支持 |
| iOS Safari | 14+ | 支持，无悬停效果 |
| Android Chrome | 90+ | 支持，无悬停效果 |

### 功能降级

#### oklch() 颜色
使用 `@supports (color: oklch(...))` 进行特性检测，自动回退到 RGB：

```css
.bg-primary {
  background-color: rgb(99, 102, 241);  /* 回退 */
}

@supports (color: oklch(0 0 0)) {
  .bg-primary {
    background-color: var(--primary);   /* oklch */
  }
}
```

#### color-mix() 支持
```css
.bg-primary\/50 {
  background-color: var(--primary);     /* 回退：完全不透明 */
}

@supports (color: color-mix(in oklab, red, red)) {
  .bg-primary\/50 {
    background-color: color-mix(in oklab, var(--primary) 50%, transparent);
  }
}
```

---

## 常见用例

### 表单组件

```html
<div class="space-y-4">
  <label class="block text-sm font-medium text-foreground">
    电子邮件
  </label>
  <input 
    type="email"
    class="
      w-full px-4 py-2 rounded-lg
      border border-input bg-input-background
      focus:border-primary focus:ring-2 focus:ring-primary/50
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-colors
    "
    placeholder="your@email.com"
  />
</div>
```

### 卡片组件

```html
<div class="group bg-card rounded-lg border border-border p-6 shadow-sm">
  <h3 class="font-semibold text-foreground group-hover:text-primary">
    卡片标题
  </h3>
  <p class="mt-2 text-sm text-muted-foreground">
    卡片描述文本
  </p>
  <button class="
    mt-4 px-4 py-2 rounded-lg
    bg-primary text-primary-foreground
    hover:bg-primary-700
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
    transition-colors
  ">
    操作
  </button>
</div>
```

### 响应式导航栏

```html
<nav class="
  flex flex-col md:flex-row md:items-center md:justify-between
  gap-4 md:gap-6
  p-4 md:p-6
  bg-background border-b border-border
">
  <div class="font-bold text-xl">Logo</div>
  <ul class="flex flex-col md:flex-row gap-2 md:gap-8">
    <li>
      <a 
        href="#" 
        class="text-foreground hover:text-primary focus-visible:outline-2"
      >
        首页
      </a>
    </li>
    <li>
      <a 
        href="#" 
        class="text-foreground hover:text-primary focus-visible:outline-2"
      >
        关于
      </a>
    </li>
  </ul>
</nav>
```

### 响应式网格布局

```html
<div class="
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  gap-4 sm:gap-6 lg:gap-8
  p-4 sm:p-6 lg:p-12
">
  <div class="rounded-lg bg-card border border-border p-6 shadow-sm">
    卡片 1
  </div>
  <div class="rounded-lg bg-card border border-border p-6 shadow-sm">
    卡片 2
  </div>
  <!-- 更多卡片 -->
</div>
```

---

## 优化统计

### 代码优化成果

| 指标 | 优化前 | 优化后 | 改进 |
|------|-------|-------|------|
| 总行数 | 6444 | 6288 | -2.4% |
| 媒体查询块 | 40+ | 2 | -95% |
| 代码组织 | 分散 | 统一 | ✅ |
| 文件可读性 | 中等 | 高 | ✅ |
| 维护性 | 困难 | 简单 | ✅ |

### 性能改进

- ✅ 减少浏览器解析成本
- ✅ 改善媒体查询匹配效率
- ✅ 简化 CSS 层级结构
- ✅ 提升代码可维护性

---

**Last Updated**: 2026-01-13
