# 🚀 Looma Web

一个现代化的 Web 应用框架，采用最新的前端技术栈和最佳实践。Looma Web 提供了完整的 CSS 框架、响应式设计和无障碍支持。

## 📚 文档

项目文档存放在 `docs/` 目录中：

| 文档 | 描述 |
|------|------|
| [CSS 框架](./docs/CSS_FRAMEWORK.md) | 完整的 CSS 实用工具类框架文档 |
| [快速开始](./docs/GETTING_STARTED.md) | 开发环境配置和初始化 |
| [项目结构](./docs/PROJECT_STRUCTURE.md) | 项目目录组织和文件说明 |
| [开发指南](./docs/DEVELOPMENT.md) | 开发工作流和最佳实践 |
| [部署指南](./docs/DEPLOYMENT.md) | 生产环境构建和部署 |

## ✨ 核心特性

### CSS 框架
- ✅ **1500+ 生产级实用工具类** - 完整的 Tailwind CSS 框架
- ✅ **oklch() 颜色系统** - 感知均匀的现代色彩空间
- ✅ **Light/Dark 主题** - 完整的亮色和深色模式支持
- ✅ **响应式设计** - 5 个断点级别的移动优先响应
- ✅ **设备感知交互** - 使用 `@media (hover: hover)` 防止触摸设备问题
- ✅ **无障碍支持** - WCAG 2.1 AA 级别兼容性

### 代码质量
- 🎯 **优化的代码组织** - 统一的媒体查询块，减少文件大小 2.4%
- 📦 **模块化架构** - 清晰的层级结构和组织方式
- ♿ **无障碍优先** - 完整的键盘导航和屏幕阅读器支持
- 🎨 **统一的设计系统** - 语义化颜色变量和一致的间距系统

### 开发体验
- ⚡ **快速开发** - 使用实用工具类快速构建 UI
- 🔍 **易于维护** - 清晰的命名约定和文档
- 🚀 **生产就绪** - 经过优化和验证的生产级框架
- 📱 **跨浏览器支持** - 支持所有现代浏览器

## 🎯 技术栈

- **前端框架**: React 18+
- **样式系统**: Tailwind CSS 3.3.6+
- **颜色空间**: oklch() with color-mix() 支持
- **包管理**: npm / yarn / pnpm
- **构建工具**: Webpack / Vite
- **CSS 预处理**: PostCSS

## 📦 项目结构

```
looma-web/
├── src/
│   ├── components/        # React 组件
│   ├── hooks/            # 自定义 Hooks
│   ├── styles/           # CSS 样式文件
│   │   └── index.css     # 主 CSS 框架 (6288 行)
│   ├── pages/            # 页面组件
│   ├── utils/            # 工具函数
│   └── App.tsx           # 应用入口
├── docs/                 # 项目文档
│   ├── CSS_FRAMEWORK.md
│   ├── GETTING_STARTED.md
│   ├── PROJECT_STRUCTURE.md
│   ├── DEVELOPMENT.md
│   └── DEPLOYMENT.md
├── public/               # 静态资源
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/your-org/looma-web.git
cd looma-web
```

### 2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 4. 构建生产版本

```bash
npm run build
```

详细的设置步骤，请查看 [快速开始指南](./docs/GETTING_STARTED.md)。

## 🎨 CSS 框架使用

### 基础用法

```html
<!-- 使用工具类快速构建 UI -->
<button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary transition-colors">
  点击我
</button>
```

### 响应式设计

```html
<!-- 移动优先的响应式设计 -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div>卡片 1</div>
  <div>卡片 2</div>
  <div>卡片 3</div>
</div>
```

### 主题切换

```html
<!-- 亮色模式 (默认) -->
<div class="bg-white text-black">Light Mode</div>

<!-- 深色模式 -->
<html class="dark">
  <div class="bg-slate-950 text-white">Dark Mode</div>
</html>
```

### 颜色系统

```html
<!-- 使用语义化颜色 -->
<div class="bg-primary text-primary-foreground">Primary</div>
<div class="bg-destructive text-destructive-foreground">Destructive</div>
<div class="bg-accent text-accent-foreground">Accent</div>
<div class="bg-muted text-muted-foreground">Muted</div>

<!-- 透明度变体 -->
<div class="bg-primary/50">50% 透明主色</div>
<div class="bg-destructive/20">20% 透明危险色</div>
```

更多示例，请查看 [CSS 框架文档](./docs/CSS_FRAMEWORK.md)。

## 📊 框架统计

### 工具类数量

| 类别 | 数量 | 示例 |
|------|------|------|
| 布局工具 | 200+ | flex, grid, gap, display |
| 尺寸工具 | 150+ | width, height, min-w/h, max-w/h |
| 排版工具 | 100+ | font-*, text-*, text-decoration |
| 颜色工具 | 300+ | bg-*, text-*, border-* |
| 状态工具 | 130+ | hover:*, focus:*, disabled:* |
| 渐变工具 | 90+ | gradient-to-*, from-*, to-* |
| 其他工具 | 430+ | shadow, rounded, border, opacity |
| **总计** | **1500+** | - |

### 代码优化

| 指标 | 优化前 | 优化后 | 改进 |
|------|-------|-------|------|
| CSS 文件行数 | 6444 | 6288 | -2.4% |
| 媒体查询块数 | 40+ | 2 | -95% |
| 代码可读性 | 中等 | 高 | ✅ |
| 维护复杂度 | 高 | 低 | ✅ |

## 🌍 浏览器支持

| 浏览器 | 最低版本 | 支持情况 |
|--------|--------|--------|
| Chrome | 90+ | ✅ 完整支持 |
| Firefox | 88+ | ✅ 完整支持 |
| Safari | 14+ | ✅ 完整支持 |
| Edge | 90+ | ✅ 完整支持 |
| iOS Safari | 14+ | ✅ 支持（无悬停） |
| Android Chrome | 90+ | ✅ 支持（无悬停） |

### 功能支持

| 功能 | 支持状态 | 备注 |
|------|--------|------|
| oklch() 颜色 | ✅ 现代浏览器 | 自动回退到 RGB |
| color-mix() | ✅ 新版本 | @supports 检测 |
| @media (hover: hover) | ✅ 广泛支持 | 防止触摸误触 |
| CSS 自定义属性 | ✅ 所有现代浏览器 | 需 IE11 polyfill |

## 📝 最佳实践

### 1. 使用语义化颜色

```html
<!-- ✅ 好 -->
<button class="bg-primary text-primary-foreground">Primary</button>
<div class="border border-destructive text-destructive">Error</div>

<!-- ❌ 避免 -->
<button class="bg-blue-600 text-white">Click</button>
```

### 2. 遵循移动优先

```html
<!-- ✅ 好 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 先定义移动样式，再添加响应式 -->
</div>

<!-- ❌ 避免 -->
<div class="lg:grid-cols-3">
  <!-- 不清楚默认行为 -->
</div>
```

### 3. 使用 Focus States

```html
<!-- ✅ 好：支持键盘导航 -->
<button class="focus-visible:ring-2 focus-visible:ring-primary">
  可访问按钮
</button>

<!-- ❌ 避免：只在 hover 时反应 -->
<button class="hover:bg-primary">
  仅悬停反应
</button>
```

### 4. 维护间距一致性

```html
<!-- ✅ 好：使用 4 的倍数 -->
<div class="p-4 m-6 gap-8">
  <!-- 1rem (×4), 1.5rem (×6), 2rem (×8) -->
</div>

<!-- ❌ 避免：不规则间距 -->
<div class="p-3 m-7 gap-9">
  <!-- 破坏间距系统 -->
</div>
```

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 运行 TypeScript 检查
npm run type-check

# 运行代码检查
npm run lint

# 格式化代码
npm run format

# 运行测试
npm run test
```

## 📚 更多文档

- [快速开始](./docs/GETTING_STARTED.md) - 开发环境设置
- [项目结构](./docs/PROJECT_STRUCTURE.md) - 目录组织说明
- [开发指南](./docs/DEVELOPMENT.md) - 开发工作流
- [部署指南](./docs/DEPLOYMENT.md) - 生产部署
- [CSS 框架](./docs/CSS_FRAMEWORK.md) - 详细的样式系统文档

## 🎓 学习资源

### CSS 框架
- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [oklch() 颜色空间](https://oklch.com/)
- [CSS Variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)

### 前端最佳实践
- [WCAG 2.1 无障碍指南](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web 无障碍倡议](https://www.w3.org/WAI/)
- [移动优先响应式设计](https://developer.mozilla.org/zh-CN/docs/Glossary/Mobile_first)

### React & TypeScript
- [React 官方文档](https://react.dev/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [React 最佳实践](https://react.dev/reference)

## 🤝 贡献指南

我们欢迎所有形式的贡献！请按照以下步骤：

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 贡献规范

- 遵循现有的代码风格
- 添加适当的注释和文档
- 确保所有测试通过
- 更新相关文档

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。

## 👥 作者

**Looma Development Team**

## 🙏 致谢

感谢以下开源项目和社区的支持：

- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [React](https://react.dev/) - 用于构建用户界面的 JavaScript 库
- [TypeScript](https://www.typescriptlang.org/) - 类型化的 JavaScript
- [Radix UI](https://www.radix-ui.com/) - 无障碍 UI 组件库

## 📞 联系方式

- 📧 Email: dev@looma.com
- 🐙 GitHub: [Looma Web](https://github.com/your-org/looma-web)
- 💬 Discord: [加入我们的社区](https://discord.gg/looma)

## 🔄 更新日志

### v1.0.0 (2026-01-13)

**🎉 初始发布**

**✨ 新增**
- 完整的 oklch() 颜色系统
- 1500+ 生产级实用工具类
- 5 个响应式断点
- Light/Dark 主题支持
- 完整的 WCAG 无障碍支持

**🚀 优化**
- 整合所有 hover 样式到单个媒体查询块
- 优化 focus/focus-visible 状态组织
- 减少 CSS 文件大小 2.4%

**📚 文档**
- 完整的 CSS 框架文档
- 快速开始指南
- 项目结构说明
- 开发和部署指南

---

**Made with ❤️ by Looma Development Team**

**Last Updated**: 2026-01-13 | **License**: MIT
