# 🚀 快速开始指南

本指南将帮助你在 5 分钟内开始开发 Looma Web 项目。

## 📋 前置要求

在开始之前，请确保你已安装以下工具：

- **Node.js** 18.0.0 或更高版本 - [下载](https://nodejs.org/)
- **npm** 9.0.0 或更高版本（或使用 yarn / pnpm）
- **Git** - [下载](https://git-scm.com/)
- **代码编辑器** - 推荐使用 [VS Code](https://code.visualstudio.com/)

### 验证安装

```bash
node --version    # 应显示 v18.0.0+
npm --version     # 应显示 9.0.0+
git --version     # 应显示 git version 2.x.x+
```

## 📦 项目初始化

### 1️⃣ 克隆仓库

```bash
# 使用 HTTPS
git clone https://github.com/your-org/looma-web.git

# 或使用 SSH
git clone git@github.com:your-org/looma-web.git

# 进入项目目录
cd looma-web
```

### 2️⃣ 安装依赖

选择你喜欢的包管理器：

**npm**
```bash
npm install
```

**yarn**
```bash
yarn install
```

**pnpm**
```bash
pnpm install
```

> 💡 **提示**: 推荐使用 pnpm，因为它更快且占用空间更少。

### 3️⃣ 环境配置

创建 `.env.local` 文件用于本地开发：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 并配置必要的变量：

```env
# API 配置
VITE_API_URL=http://localhost:3001

# 其他配置
VITE_APP_NAME=Looma Web
VITE_APP_VERSION=1.0.0
```

### 4️⃣ 启动开发服务器

```bash
npm run dev
```

你应该会看到类似的输出：

```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

打开浏览器访问 `http://localhost:5173` - 项目已启动！🎉

## 🏗️ 项目结构快速导览

```
looma-web/
├── src/
│   ├── components/          # React 组件库
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── hooks/               # 自定义 Hooks
│   │   └── useAppConfig.ts
│   ├── styles/              # CSS 样式
│   │   └── index.css        # 主样式文件 (1500+ 工具类)
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── ...
│   ├── utils/               # 工具函数
│   │   ├── helpers.ts
│   │   └── ...
│   └── App.tsx              # 应用入口
├── public/                  # 静态资源
├── docs/                    # 项目文档
│   ├── CSS_FRAMEWORK.md
│   ├── GETTING_STARTED.md
│   └── ...
├── .env.example             # 环境变量示例
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript 配置
└── vite.config.ts           # Vite 构建配置
```

详细的项目结构说明，请查看 [项目结构文档](./PROJECT_STRUCTURE.md)。

## 🎨 编写你的第一个组件

### 创建一个按钮组件

创建文件 `src/components/MyButton.tsx`：

```tsx
import React from 'react';

interface MyButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive';
  disabled?: boolean;
  onClick?: () => void;
}

export function MyButton({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
}: MyButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-700',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-700',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive-700',
  };

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 在页面中使用组件

编辑 `src/pages/Home.tsx`：

```tsx
import { MyButton } from '../components/MyButton';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">
            欢迎来到 Looma Web
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 卡片 1 */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              快速开始
            </h2>
            <p className="text-muted-foreground mb-4">
              使用 Looma Web 框架快速构建现代化 Web 应用。
            </p>
            <MyButton variant="primary">
              了解更多
            </MyButton>
          </div>

          {/* 卡片 2 */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              功能特性
            </h2>
            <p className="text-muted-foreground mb-4">
              完整的响应式设计、无障碍支持和现代化样式系统。
            </p>
            <MyButton variant="secondary">
              探索功能
            </MyButton>
          </div>
        </div>
      </main>
    </div>
  );
}
```

## 🎨 使用 CSS 框架

### 基础样式

```tsx
// 使用工具类快速构建 UI
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h1 className="text-2xl font-bold text-gray-900">标题</h1>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    点击
  </button>
</div>
```

### 响应式布局

```tsx
// 移动优先的响应式设计
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
  <div className="bg-card rounded-lg p-4 border border-border">卡片 1</div>
  <div className="bg-card rounded-lg p-4 border border-border">卡片 2</div>
  <div className="bg-card rounded-lg p-4 border border-border">卡片 3</div>
</div>
```

### 主题切换

```tsx
// 支持亮色和深色模式
<html className="dark">
  <body className="bg-background text-foreground">
    {/* 内容 */}
  </body>
</html>
```

更多 CSS 框架用法，请查看 [CSS 框架文档](./CSS_FRAMEWORK.md)。

## ⚙️ 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run type-check` | 运行 TypeScript 检查 |
| `npm run lint` | 代码检查 |
| `npm run format` | 格式化代码 |
| `npm run test` | 运行测试 |

## 🐛 常见问题

### Q1: 启动时出现端口被占用错误

**问题**: `Error: listen EADDRINUSE: address already in use :::5173`

**解决**:
```bash
# 方案 1: 使用不同的端口
npm run dev -- --port 3000

# 方案 2: 关闭占用端口的进程（Windows）
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Q2: 样式未正确加载

**问题**: CSS 工具类不生效

**解决**:
1. 确保 `index.css` 已导入：
```tsx
import './styles/index.css';
```

2. 清除缓存并重启开发服务器：
```bash
npm run dev
```

3. 检查浏览器开发者工具中是否有样式加载错误

### Q3: TypeScript 错误

**问题**: `Cannot find module or its corresponding type declarations`

**解决**:
```bash
# 重新生成类型定义
npm run type-check

# 清除 node_modules 并重新安装
rm -rf node_modules package-lock.json
npm install
```

### Q4: 响应式样式不工作

**问题**: 媒体查询前缀（sm:, md:, lg:）不生效

**解决**:
确保遵循移动优先原则：
```tsx
// ✅ 正确
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ 错误
<div className="lg:grid-cols-3">
```

## 📚 下一步

1. **学习 CSS 框架**: 阅读 [CSS 框架文档](./CSS_FRAMEWORK.md)
2. **理解项目结构**: 查看 [项目结构说明](./PROJECT_STRUCTURE.md)
3. **开发最佳实践**: 参考 [开发指南](./DEVELOPMENT.md)
4. **部署应用**: 学习 [部署指南](./DEPLOYMENT.md)

## 💡 提示和技巧

### VS Code 推荐扩展

安装这些扩展以获得更好的开发体验：

- **Tailwind CSS IntelliSense** - CSS 工具类自动补全
- **Prettier** - 代码格式化
- **ESLint** - 代码检查
- **Thunder Client** 或 **REST Client** - API 测试

### 开发快捷方式

```bash
# 快速创建新组件
npm run create:component MyComponent

# 快速创建新页面
npm run create:page MyPage

# 快速创建新 Hook
npm run create:hook useMyHook
```

### 调试技巧

```tsx
// 使用 React DevTools
// 在 Chrome 扩展中搜索 "React Developer Tools"

// 使用浏览器控制台
console.log('调试信息');
console.table(data);
console.time('标签');
console.timeEnd('标签');
```

## 🤝 需要帮助？

如果遇到问题，可以：

1. 查看 [项目文档](../docs/)
2. 搜索 [GitHub Issues](https://github.com/your-org/looma-web/issues)
3. 加入 [Discord 社区](https://discord.gg/looma)
4. 联系开发团队

---

**Happy Coding! 🎉**

**Last Updated**: 2026-01-13
