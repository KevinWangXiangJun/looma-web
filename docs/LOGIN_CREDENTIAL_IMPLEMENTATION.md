## 登录凭证保存功能实现

### 功能概述
系统现已支持自动保存用户登录/注册/重置密码时的凭证信息（手机号或用户名），方便后续页面使用。

### 修改的文件

#### 1. **类型定义** (`src/types/common.ts`)
- 扩展 `AuthState` 接口，添加 `lastLoginCredential` 字段
- 存储类型：
  ```typescript
  lastLoginCredential?: {
    type: 'phone' | 'username';      // 登录凭证类型
    value: string;                    // 凭证值
    country?: string;                 // 国家代码（仅手机号）
  }
  ```

#### 2. **认证存储** (`src/store/authStore.ts`)
- 添加 `saveLoginCredential()` 方法 - 保存登录凭证
- 添加 `clearLoginCredential()` 方法 - 清除登录凭证
- 在 `logout()` 时自动清除凭证

#### 3. **登录页面** (`src/pages/login/LoginForm.tsx`)
- 在手机号登录成功时调用 `saveLoginCredential('phone', phone, country)`
- 在用户名登录成功时调用 `saveLoginCredential('username', username)`

#### 4. **注册页面** (`src/pages/login/RegisterForm.tsx`)
- 在注册成功时调用 `saveLoginCredential('phone', phone, country)`

#### 5. **忘记密码页面** (`src/pages/login/ForgotPasswordForm.tsx`)
- 在重置密码成功时调用 `saveLoginCredential('phone', phone, country)`

#### 6. **自定义 Hook** (`src/hooks/useLoginCredential.ts`) - 新建文件
- 提供便捷的 Hook 用于获取保存的登录凭证
- 返回：
  - `type` - 凭证类型（phone/username）
  - `value` - 凭证值
  - `country` - 国家代码
  - `hasCredential` - 是否有凭证
  - `clear()` - 清除凭证的方法

#### 7. **Hook 导出** (`src/hooks/index.ts`)
- 导出 `useLoginCredential` Hook

### 使用方式

#### 方式 1：在其他页面获取登录凭证
```typescript
import { useLoginCredential } from '@/hooks';

export const MyPage = () => {
  const { type, value, country, hasCredential } = useLoginCredential();

  if (hasCredential) {
    if (type === 'phone') {
      console.log(`手机号: ${country}${value}`);
    } else {
      console.log(`用户名: ${value}`);
    }
  }
};
```

#### 方式 2：预填表单
```typescript
const { value } = useLoginCredential();

return <input defaultValue={value} />;
```

#### 方式 3：直接从 authStore 获取
```typescript
import { useAuthStore } from '@/store';

const lastLoginCredential = useAuthStore(state => state.lastLoginCredential);
```

### 数据流程

```
用户登录/注册 
    ↓
验证成功 
    ↓
saveLoginCredential() 
    ↓
保存到 authStore 
    ↓
其他页面可通过 useLoginCredential() 获取
    ↓
用户登出时自动清除
```

### 应用场景

1. **验证码发送页面** - 预填手机号
2. **修改账户信息** - 预填当前登录账户
3. **二次验证** - 快速访问上次登录账户
4. **多账户管理** - 记录登录历史
5. **自动补全** - 登录表单智能补全

### 技术要点

- 凭证保存在 zustand store 中（内存存储），应用刷新后会清除
- 如需持久化存储，可修改 `saveLoginCredential()` 使用 localStorage
- 登出时自动清除凭证以保证隐私
- 类型安全：完整的 TypeScript 类型定义

### 验证状态
✅ 所有文件无 TypeScript 错误
✅ 完整的类型定义
✅ 向后兼容（不影响现有功能）
