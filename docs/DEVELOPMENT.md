# 🛠️ 开发指南

本指南提供开发工作流、最佳实践和常见问题解决方案。

## 📋 目录

- [开发工作流](#开发工作流)
- [代码规范](#代码规范)
- [性能优化](#性能优化)
- [调试技巧](#调试技巧)
- [测试指南](#测试指南)
- [常见陷阱](#常见陷阱)

---

## 开发工作流

### 1️⃣ 功能开发流程

```
功能规划 → 创建分支 → 本地开发 → 提交测试 → Code Review → 合并主分支
```

### 创建特性分支

```bash
# 格式: feature/功能名称
git checkout -b feature/add-user-auth

# 或 bug 修复
git checkout -b bugfix/fix-login-error

# 或 文档更新
git checkout -b docs/update-readme
```

### 本地开发和测试

```bash
# 1. 确保代码最新
git pull origin main

# 2. 启动开发服务器
npm run dev

# 3. 运行测试
npm run test

# 4. 代码检查
npm run lint

# 5. 类型检查
npm run type-check

# 6. 格式化代码
npm run format
```

### 提交代码

遵循 Conventional Commits 规范：

```bash
# 格式: <type>(<scope>): <subject>

# 示例
git commit -m "feat(auth): add user login functionality"
git commit -m "fix(button): correct hover state styling"
git commit -m "docs(readme): update installation steps"
git commit -m "refactor(hooks): simplify useTheme hook"
```

**常见的类型 (type)**:
- `feat` - 新功能
- `fix` - 修复 bug
- `docs` - 文档更新
- `style` - 代码格式调整（不影响功能）
- `refactor` - 代码重构
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建、依赖等非功能性更改

### Push 和创建 Pull Request

```bash
# 推送分支
git push origin feature/add-user-auth

# 在 GitHub 上创建 Pull Request
# 1. 填写 PR 标题和描述
# 2. 引用相关 Issue
# 3. 等待 Code Review
# 4. 根据反馈进行修改
# 5. 合并到 main 分支
```

---

## 代码规范

### TypeScript 最佳实践

#### ✅ 正确的做法

```tsx
// 1. 总是定义类型
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ children, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// 2. 使用 const 而不是 let
const count = 0;

// 3. 使用 const 函数表达式
const handleClick = () => { };

// 4. 导出所有需要的类型
export type { ButtonProps };
export { Button };
```

#### ❌ 避免的做法

```tsx
// 1. 隐式 any 类型
function handleClick(event) { }  // ❌

// 2. 使用 any 类型
const data: any = fetchData();  // ❌

// 3. 使用 Object 或 Function
const config: Object = { };  // ❌

// 4. 过度使用 optional chaining
const value = data?.user?.profile?.avatar?.url;  // 考虑重构
```

### React 最佳实践

#### 组件结构

```tsx
// ✅ 好的组件结构
import React from 'react';
import { cn } from '@/utils';

// 1. 类型定义
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// 2. 组件实现
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border border-border bg-card p-4', className)}
    >
      {children}
    </div>
  ),
);

Card.displayName = 'Card';

// 3. 导出
export { Card };
export type { CardProps };

// 4. 使用 memo 避免不必要的重新渲染
export const MemoizedCard = React.memo(Card);
```

#### Hooks 使用规则

```tsx
// ✅ 正确用法
function UserProfile({ userId }: { userId: string }) {
  // 1. 在顶层调用 Hooks
  const [user, setUser] = React.useState<User | null>(null);
  const { theme } = useTheme();

  // 2. 正确使用 useEffect
  React.useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // 正确的依赖数组

  // 3. 正确的条件渲染
  if (!user) return <div>Loading...</div>;

  return <div className={theme}>{user.name}</div>;
}

// ❌ 错误用法
function BadComponent() {
  // ❌ 不能在条件中使用 Hooks
  if (someCondition) {
    const [state, setState] = React.useState(0);  // ❌
  }

  // ❌ 不能在循环中使用 Hooks
  for (let i = 0; i < 5; i++) {
    const [state, setState] = React.useState(i);  // ❌
  }
}
```

### CSS / Tailwind 最佳实践

#### ✅ 好的做法

```tsx
// 1. 使用工具类组合
const buttonClasses = 'px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors';

// 2. 使用条件类名工具
import { cn } from '@/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

function Button({ variant = 'primary', size = 'md' }: ButtonProps) {
  return (
    <button
      className={cn(
        'font-medium transition-colors',
        {
          'px-4 py-2': size === 'md',
          'px-3 py-1': size === 'sm',
          'px-6 py-3': size === 'lg',
        },
        {
          'bg-primary hover:bg-primary-700': variant === 'primary',
          'bg-secondary hover:bg-secondary-700': variant === 'secondary',
        },
      )}
    >
      Click
    </button>
  );
}

// 3. 提取重复的类名到常量
const BUTTON_VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-700',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-700',
} as const;

// 4. 响应式设计遵循移动优先
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* 内容 */}
</div>
```

#### ❌ 避免的做法

```tsx
// ❌ 不要在代码中硬编码颜色
<div style={{ color: '#6366f1' }}>Text</div>

// ❌ 不要使用不存在的工具类
<div className="flex gap-7 p-13">Text</div>

// ❌ 不要跳过基础类就使用响应式
<div className="md:grid-cols-2">
  {/* 不清楚默认是什么 */}
</div>

// ❌ 不要混合使用 style 和 className
<div style={{ padding: '1rem' }} className="m-4">
  Text
</div>
```

---

## 性能优化

### React 性能优化

```tsx
// 1. 使用 React.memo 避免不必要的重新渲染
const UserCard = React.memo(({ user }: { user: User }) => (
  <div className="rounded-lg border p-4">{user.name}</div>
));

// 2. 使用 useCallback 缓存回调函数
function SearchUsers() {
  const [query, setQuery] = React.useState('');
  
  const handleSearch = React.useCallback((term: string) => {
    // 搜索逻辑
  }, []);

  return <input onChange={e => handleSearch(e.target.value)} />;
}

// 3. 使用 useMemo 缓存计算结果
function UserList({ users }: { users: User[] }) {
  const sortedUsers = React.useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  return (
    <ul>
      {sortedUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 4. 代码分割 - 使用 React.lazy 和 Suspense
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
```

### CSS 性能

```css
/* ✅ 优化后的 CSS 组织 */

@layer properties {
  /* CSS 自定义属性 */
}

@layer theme {
  /* 主题变量 */
}

@layer base {
  /* 全局基础样式 */
}

@layer utilities {
  /* 工具类 - 已统一媒体查询 */
  @media (hover: hover) {
    /* 所有 hover 样式集中在此 */
  }
}

/* ✅ 避免深层嵌套 */
.container {
  padding: 1rem;
}

.container .header {
  font-size: 1.5rem;
}

/* ❌ 避免过度嵌套 */
.container {
  .header {
    .title {
      .text {
        font-size: 1.5rem;  /* 选择器过深 */
      }
    }
  }
}
```

---

## 调试技巧

### 使用浏览器开发者工具

```javascript
// 1. 调试 React 组件
// 安装 React Developer Tools 扩展
// F12 → Components 标签

// 2. 调试样式
// F12 → Elements 标签 → Styles 面板
// 查看应用的 CSS 类和计算样式

// 3. 调试网络请求
// F12 → Network 标签
// 查看 API 调用、响应状态

// 4. 控制台调试
console.log('调试信息');
console.table(data);  // 表格形式显示
console.time('标签');
console.timeEnd('标签');  // 性能测量
console.group('组名');
console.groupEnd();  // 分组日志
```

### 常用调试命令

```tsx
// 在浏览器控制台执行
// 1. 查看 React 组件树
$r  // 选中的 React 组件

// 2. 监听元素变化
monitorEvents($0)

// 3. 获取元素的计算样式
getComputedStyle($0)

// 4. 快速查询 DOM
$('selector')  // querySelector
$$('selector')  // querySelectorAll
```

### VS Code 调试配置

在 `.vscode/launch.json` 中添加：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///*": "${webRoot}/*"
      }
    }
  ]
}
```

---

## 测试指南

### 单元测试示例

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies correct variant classes', () => {
    const { container } = render(<Button variant="primary">Click</Button>);
    expect(container.querySelector('button')).toHaveClass('bg-primary');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行特定文件的测试
npm run test Button.test.tsx

# 监听模式（文件变化时自动运行）
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

---

## 常见陷阱

### 🚨 陷阱 1: 忘记依赖数组

```tsx
// ❌ 错误：无限循环
React.useEffect(() => {
  fetchData();  // 每次渲染都执行
});

// ✅ 正确：组件挂载时执行一次
React.useEffect(() => {
  fetchData();
}, []);  // 空依赖数组

// ✅ 正确：依赖项变化时执行
React.useEffect(() => {
  fetchUserData(userId);
}, [userId]);  // userId 变化时重新执行
```

### 🚨 陷阱 2: 在条件中改变 state

```tsx
// ❌ 错误
function Component() {
  const [state, setState] = React.useState(0);
  
  if (someCondition) {
    setState(1);  // 可能导致无限渲染
  }
}

// ✅ 正确
function Component() {
  const [state, setState] = React.useState(0);
  
  React.useEffect(() => {
    if (someCondition) {
      setState(1);
    }
  }, [someCondition]);
}
```

### 🚨 陷阱 3: 忘记 key 属性

```tsx
// ❌ 错误：使用 index 作为 key
{list.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// ✅ 正确：使用唯一标识符
{list.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

### 🚨 陷阱 4: 样式类名拼写错误

```tsx
// ❌ 错误：不存在的工具类
<div className="grid-col-3 gap-10 p-15">

// ✅ 正确：使用实际存在的工具类
<div className="grid grid-cols-3 gap-4 p-4">
```

### 🚨 陷阱 5: 响应式断点顺序

```tsx
// ❌ 错误：桌面优先（不符合移动优先原则）
<div className="grid-cols-4 sm:grid-cols-2 md:grid-cols-3">

// ✅ 正确：移动优先
<div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
```

---

## 有用的快捷键

### VS Code

| 快捷键 | 作用 |
|--------|------|
| `Ctrl+J` | 打开/关闭终端 |
| `Ctrl+Shift+P` | 打开命令面板 |
| `Ctrl+/` | 切换注释 |
| `Alt+Shift+F` | 格式化文档 |
| `Ctrl+Shift+X` | 打开扩展面板 |
| `F2` | 重命名 |
| `Ctrl+D` | 选择相同的单词 |

### Chrome DevTools

| 快捷键 | 作用 |
|--------|------|
| `F12` | 打开开发者工具 |
| `Ctrl+Shift+C` | 选择元素 |
| `Ctrl+Shift+J` | 打开控制台 |
| `Ctrl+Shift+I` | 打开 Elements |
| `Ctrl+Shift+M` | 切换响应式设计模式 |

---

**Last Updated**: 2026-01-13
