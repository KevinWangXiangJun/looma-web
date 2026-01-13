# 📁 项目结构指南

本文档详细说明 Looma Web 项目的目录组织和文件结构。

## 🗂️ 总体结构

```
looma-web/
├── src/                     # 源代码
│   ├── components/          # React 组件
│   ├── hooks/               # 自定义 Hooks
│   ├── pages/               # 页面组件
│   ├── styles/              # CSS 样式
│   ├── utils/               # 工具函数
│   ├── types/               # TypeScript 类型定义
│   ├── constants/           # 常量定义
│   ├── config/              # 配置文件
│   └── App.tsx              # 应用入口
│
├── public/                  # 静态资源
│   ├── icons/               # 图标
│   ├── images/              # 图片
│   └── favicon.ico          # 网站图标
│
├── docs/                    # 项目文档
│   ├── CSS_FRAMEWORK.md     # CSS 框架文档
│   ├── GETTING_STARTED.md   # 快速开始指南
│   ├── PROJECT_STRUCTURE.md # 项目结构（本文件）
│   ├── DEVELOPMENT.md       # 开发指南
│   └── DEPLOYMENT.md        # 部署指南
│
├── .github/                 # GitHub 相关
│   ├── workflows/           # CI/CD 工作流
│   └── ISSUE_TEMPLATE/      # Issue 模板
│
├── tests/                   # 测试文件
│   ├── unit/                # 单元测试
│   ├── integration/         # 集成测试
│   └── e2e/                 # 端到端测试
│
├── .env.example             # 环境变量示例
├── .gitignore               # Git 忽略文件
├── .prettierrc              # Prettier 配置
├── .eslintrc                # ESLint 配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 构建配置
├── package.json             # 项目配置
├── package-lock.json        # 依赖锁定文件
└── README.md                # 项目说明
```

## 📂 核心目录详解

### `src/` - 源代码目录

应用的主要源代码存放位置。

#### `src/components/` - React 组件库

存放可复用的 React 组件。

```
components/
├── Button/                  # 按钮组件
│   ├── Button.tsx          # 组件实现
│   ├── Button.test.tsx     # 组件测试
│   ├── Button.types.ts     # 类型定义
│   └── index.ts            # 导出
│
├── Card/                    # 卡片组件
│   ├── Card.tsx
│   ├── Card.types.ts
│   └── index.ts
│
├── Modal/                   # 对话框组件
├── Input/                   # 输入框组件
├── Select/                  # 下拉框组件
│
└── index.ts                 # 统一导出
```

**最佳实践**:
- 每个组件一个文件夹
- 包含组件、类型定义和测试
- 提供统一的导出接口

**示例用法**:
```tsx
import { Button, Card, Modal } from '@/components';

function App() {
  return (
    <Card>
      <Button onClick={() => {}}>Click me</Button>
    </Card>
  );
}
```

#### `src/hooks/` - 自定义 Hooks

存放项目特定的 React Hooks。

```
hooks/
├── useAppConfig.ts          # 应用配置 Hook
├── useTheme.ts              # 主题切换 Hook
├── useLocalStorage.ts       # 本地存储 Hook
├── useFetch.ts              # 数据获取 Hook
├── useModal.ts              # 模态框状态 Hook
├── useDebounce.ts           # 防抖 Hook
├── useThrottle.ts           # 节流 Hook
└── index.ts                 # 统一导出
```

**示例**:
```tsx
// hooks/useTheme.ts
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  return { theme, setTheme };
}

// 使用
function App() {
  const { theme, setTheme } = useTheme();
  return <div className={theme}>...</div>;
}
```

#### `src/pages/` - 页面组件

存放路由对应的页面组件。

```
pages/
├── Home/                    # 首页
│   ├── Home.tsx
│   ├── Home.test.tsx
│   └── index.ts
│
├── About/                   # 关于页面
├── Contact/                 # 联系页面
├── Dashboard/               # 仪表板
├── NotFound/                # 404 页面
│
└── index.ts                 # 统一导出
```

**路由配置示例**:
```tsx
import { Home, About, NotFound } from '@/pages';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '*', component: NotFound },
];
```

#### `src/styles/` - CSS 样式

存放应用的所有样式文件。

```
styles/
├── index.css                # 主样式文件 (6288 行)
│                            # 包含:
│                            # - CSS 变量 (@layer properties)
│                            # - 主题变量 (@layer theme)
│                            # - 全局样式 (@layer base)
│                            # - 1500+ 工具类 (@layer utilities)
│
├── variables.css            # CSS 变量定义
├── themes/                  # 主题文件
│   ├── light.css            # 亮色主题
│   └── dark.css             # 深色主题
│
└── components/              # 组件特定样式 (可选)
    ├── Button.css
    └── Card.css
```

**CSS 文件组织**:
```css
/* index.css */
@layer properties {
  /* CSS 自定义属性 */
  @property --spacing { ... }
}

@layer theme {
  /* 主题变量 */
  :root { ... }
  .dark { ... }
}

@layer base {
  /* 全局基础样式 */
  html, body { ... }
}

@layer utilities {
  /* 1500+ 工具类 */
  .flex { ... }
  .grid { ... }
  ...
}
```

#### `src/utils/` - 工具函数

存放可复用的工具和辅助函数。

```
utils/
├── helpers.ts               # 通用辅助函数
│   ├── formatDate()
│   ├── formatCurrency()
│   └── ...
│
├── validators.ts            # 验证函数
│   ├── isEmail()
│   ├── isPhoneNumber()
│   └── ...
│
├── constants.ts             # 常量定义
│   ├── API_URL
│   ├── MAX_FILE_SIZE
│   └── ...
│
├── api.ts                   # API 调用
├── storage.ts               # 本地存储管理
├── logger.ts                # 日志工具
│
└── index.ts                 # 统一导出
```

**示例**:
```tsx
// utils/helpers.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN').format(date);
}

export function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

// 使用
import { formatDate, cn } from '@/utils';

const date = formatDate(new Date());
const className = cn('p-4', 'bg-primary', undefined, 'rounded-lg');
```

#### `src/types/` - TypeScript 类型定义

存放共享的 TypeScript 类型定义。

```
types/
├── index.ts                 # 统一导出
├── common.ts                # 通用类型
│   ├── APIResponse
│   ├── APIError
│   └── Pagination
│
├── entities.ts              # 实体类型
│   ├── User
│   ├── Product
│   └── Order
│
├── forms.ts                 # 表单类型
│   ├── LoginFormData
│   ├── RegisterFormData
│   └── ...
│
└── api.ts                   # API 类型
    ├── QueryParams
    ├── RequestPayload
    └── ...
```

**示例**:
```tsx
// types/entities.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

// types/index.ts
export * from './entities';
export * from './common';
export * from './forms';
export * from './api';

// 使用
import type { User, Product } from '@/types';

const user: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

#### `src/config/` - 配置文件

存放应用配置。

```
config/
├── index.ts                 # 主配置
├── api.ts                   # API 配置
├── routes.ts                # 路由配置
└── constants.ts             # 常量配置
```

**示例**:
```tsx
// config/api.ts
export const API_CONFIG = {
  baseURL: process.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// config/routes.ts
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOT_FOUND: '*',
} as const;
```

#### `src/App.tsx` - 应用入口

主应用组件。

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from '@/hooks';
import { Home, About, NotFound } from '@/pages';

function App() {
  const { theme } = useTheme();

  return (
    <html className={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </html>
  );
}

export default App;
```

### `public/` - 静态资源

不需要构建处理的静态文件。

```
public/
├── icons/                   # SVG 图标
│   ├── home.svg
│   ├── search.svg
│   └── ...
│
├── images/                  # 图片资源
│   ├── hero-banner.jpg
│   ├── logo.png
│   └── ...
│
└── favicon.ico              # 网站图标
```

**使用方式**:
```tsx
// 直接引用
<img src="/images/logo.png" alt="Logo" />
<link rel="icon" href="/favicon.ico" />

// 在 CSS 中
.logo {
  background-image: url('/icons/logo.svg');
}
```

### `docs/` - 项目文档

存放所有项目文档。

```
docs/
├── README.md                # 文档首页
├── CSS_FRAMEWORK.md         # CSS 框架详细文档
├── GETTING_STARTED.md       # 快速开始指南
├── PROJECT_STRUCTURE.md     # 项目结构说明（本文件）
├── DEVELOPMENT.md           # 开发工作流和最佳实践
├── DEPLOYMENT.md            # 生产部署指南
├── API.md                   # API 文档
├── CONTRIBUTING.md          # 贡献指南
└── CHANGELOG.md             # 更新日志
```

### `tests/` - 测试文件

```
tests/
├── unit/                    # 单元测试
│   ├── components/
│   │   ├── Button.test.tsx
│   │   └── Card.test.tsx
│   ├── hooks/
│   │   └── useTheme.test.ts
│   └── utils/
│       └── helpers.test.ts
│
├── integration/             # 集成测试
│   ├── api.test.ts
│   └── auth.test.ts
│
└── e2e/                     # 端到端测试
    ├── homepage.test.ts
    └── navigation.test.ts
```

## 📖 文件命名约定

### 文件和文件夹

```
✅ 正确的命名方式：

components/
├── Button/                  # 组件文件夹 (PascalCase)
│   ├── Button.tsx          # 主组件 (PascalCase)
│   ├── Button.types.ts     # 类型定义 (PascalCase.types)
│   ├── Button.test.tsx     # 测试文件 (PascalCase.test)
│   └── index.ts            # 导出文件 (index)
│
hooks/
├── useTheme.ts             # Hook (useCamelCase)
├── useLocalStorage.ts
└── index.ts

pages/
├── Home/                   # 页面文件夹 (PascalCase)
│   ├── Home.tsx
│   └── index.ts
│
utils/
├── helpers.ts              # 工具函数 (camelCase)
├── validators.ts
└── index.ts

types/
├── entities.ts             # 类型定义 (camelCase)
├── common.ts
└── index.ts
```

### TypeScript 类型

```tsx
// ✅ 类型定义（PascalCase）
interface UserProps {
  name: string;
  email: string;
}

type UserStatus = 'active' | 'inactive' | 'pending';

enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

// ✅ 常量（UPPER_SNAKE_CASE）
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const API_TIMEOUT = 30000; // 30s

// ✅ 变量和函数（camelCase）
const isLoading = false;
function getUserById(id: string) { }
```

## 🔄 导入路径约定

使用路径别名简化导入：

```tsx
// ✅ 好：使用别名
import { Button } from '@/components';
import { useTheme } from '@/hooks';
import { formatDate } from '@/utils';
import type { User } from '@/types';
import { API_CONFIG } from '@/config';

// ❌ 避免：相对路径
import { Button } from '../../../components/Button';
import { useTheme } from '../../hooks/useTheme';
```

**别名配置** (在 `vite.config.ts` 和 `tsconfig.json` 中):

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 📊 文件大小参考

推荐的文件大小限制：

| 文件类型 | 建议大小 | 超过大小的处理 |
|---------|---------|---------------|
| 组件文件 | < 300 行 | 拆分成子组件 |
| Hook 文件 | < 200 行 | 提取逻辑到工具函数 |
| 工具文件 | < 400 行 | 按功能分离成多个文件 |
| 样式文件 | < 5000 行 | 已优化到 6288 行（使用 @layer） |

## 🚀 添加新文件的检查清单

创建新文件时，请确保：

- [ ] 使用正确的命名约定
- [ ] 文件放在适当的目录中
- [ ] 包含适当的 TypeScript 类型定义
- [ ] 编写相关的注释和文档
- [ ] 如需要，创建单元测试
- [ ] 在 `index.ts` 中导出（如适用）
- [ ] 更新项目文档

## 📚 相关文档

- [快速开始](./GETTING_STARTED.md) - 项目初始化
- [CSS 框架](./CSS_FRAMEWORK.md) - 样式系统详解
- [开发指南](./DEVELOPMENT.md) - 开发工作流
- [部署指南](./DEPLOYMENT.md) - 生产部署

---

**Last Updated**: 2026-01-13
