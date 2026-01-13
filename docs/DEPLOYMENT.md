# 🚀 部署指南

本指南介绍如何将 Looma Web 应用部署到生产环境。

## 📋 目录

- [部署前检查](#部署前检查)
- [构建应用](#构建应用)
- [部署平台](#部署平台)
- [环境配置](#环境配置)
- [性能优化](#性能优化)
- [监控和日志](#监控和日志)
- [故障排除](#故障排除)

---

## 部署前检查

### ✅ 部署检查清单

在部署到生产环境前，请确认以下事项：

```bash
# 1. 代码检查
npm run lint        # 检查代码风格
npm run type-check  # TypeScript 类型检查

# 2. 测试
npm run test        # 运行单元测试
npm run test:e2e    # 运行 E2E 测试（如有）

# 3. 构建
npm run build       # 生产构建

# 4. 本地预览
npm run preview     # 预览生产构建结果

# 5. 依赖审计
npm audit           # 检查依赖安全性
npm audit fix       # 修复易受攻击的依赖
```

### 代码版本控制

```bash
# 确保代码已提交
git status          # 检查未提交的更改
git add .
git commit -m "v1.0.0: production release"
git tag v1.0.0      # 标记版本

# 推送到远程
git push origin main
git push origin v1.0.0
```

---

## 构建应用

### 生产构建

```bash
# 标准构建
npm run build

# 输出结构
dist/
├── index.html       # 主 HTML 文件
├── assets/          # 资源文件
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── ...
└── favicon.ico
```

### 构建优化

#### 1. 分析包大小

```bash
# 安装分析工具
npm install --save-dev rollup-plugin-visualizer

# 生成包分析报告
npm run build -- --report
```

#### 2. 代码分割配置

在 `vite.config.ts` 中：

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将第三方库分离
          'vendor': ['react', 'react-dom'],
          'utils': ['lodash', 'date-fns'],
        },
      },
    },
    // 预加载关键文件
    modulePreload: {
      polyfill: true,
    },
  },
});
```

#### 3. 环境变量

创建 `.env.production`：

```env
# API 配置
VITE_API_URL=https://api.example.com

# 应用信息
VITE_APP_NAME=Looma Web
VITE_APP_VERSION=1.0.0

# 功能开关
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=true
```

---

## 部署平台

### Vercel 部署

**最简单的方式 - 推荐用于个人项目**

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 连接到 Vercel
vercel login

# 3. 部署
vercel

# 4. 生产部署
vercel --prod
```

**或通过 GitHub 集成**：

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 选择你的 GitHub 仓库
4. 配置构建设置（Vercel 会自动检测）
5. 点击 "Deploy"

### Netlify 部署

**适合静态站点和 SPA**

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 连接到 Netlify
netlify login

# 3. 部署
netlify deploy --prod
```

**或通过 Web 界面**：

1. 登录 [Netlify](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub 仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点击 "Deploy site"

### Docker 部署

**适合服务器部署**

创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 运行阶段
FROM node:18-alpine

WORKDIR /app

# 安装 serve 来提供静态文件
RUN npm install -g serve

# 从构建阶段复制构建结果
COPY --from=builder /app/dist ./dist

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["serve", "-s", "dist", "-l", "3000"]
```

构建并运行：

```bash
# 构建 Docker 镜像
docker build -t looma-web:latest .

# 运行容器
docker run -p 3000:3000 looma-web:latest

# 使用 Docker Compose
docker-compose up -d
```

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=https://api.example.com
    restart: unless-stopped
```

### 传统服务器部署

**使用 Nginx**

```bash
# 1. 连接到服务器
ssh user@server.com

# 2. 上传构建文件
scp -r dist/* user@server.com:/var/www/html/looma-web/

# 3. 配置 Nginx
sudo nano /etc/nginx/sites-available/looma-web
```

Nginx 配置：

```nginx
server {
    listen 80;
    server_name looma.example.com;

    # 重定向 HTTP 到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name looma.example.com;

    # SSL 证书
    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;

    # 根目录
    root /var/www/html/looma-web;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 禁用缓存 HTML
    location ~* \.html?$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/looma-web /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 环境配置

### 环境变量管理

```bash
# 开发环境
.env.development

# 生产环境
.env.production

# 本地覆盖（不提交）
.env.local
.env.*.local
```

### 安全配置

```typescript
// 环境变量使用规范
const apiUrl = import.meta.env.VITE_API_URL;  // ✅ 正确
const secret = import.meta.env.SECRET_KEY;    // ❌ 错误

// 永远不要在代码中硬编码敏感信息
const apiKey = 'sk-xxx';  // ❌ 不安全
const apiKey = import.meta.env.VITE_API_KEY;  // ✅ 正确
```

### SSL/TLS 证书

**使用 Let's Encrypt（免费）**

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot certonly --nginx -d looma.example.com

# 自动续期（cron job）
sudo certbot renew --dry-run
```

---

## 性能优化

### CDN 配置

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    // 资源公共路径
    base: 'https://cdn.example.com/looma-web/',
    
    // 生成清单文件用于资源映射
    manifest: true,
    
    // 最小化配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 生产环境移除 console
      },
    },
  },
});
```

### 缓存策略

```nginx
# 长期缓存（资源包含哈希值）
location ~* \.(js|css)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# 短期缓存（HTML）
location ~* \.html$ {
  expires 1h;
  add_header Cache-Control "public, must-revalidate";
}

# 不缓存（API）
location /api/ {
  proxy_pass http://backend;
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### 性能指标监控

```typescript
// 性能监控
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    // 发送到分析服务
    console.log('Page Load Time:', pageLoadTime);
  });
}
```

---

## 监控和日志

### 错误跟踪 - Sentry

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 日志管理

```typescript
// utils/logger.ts
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
}

export const logger = {
  info: (message: string, data?: any) => {
    console.log(message, data);
    // 发送到日志服务
  },
  warn: (message: string, data?: any) => {
    console.warn(message, data);
  },
  error: (message: string, error?: Error) => {
    console.error(message, error);
    // 发送到错误追踪服务
  },
};
```

### 实时监控

使用 Grafana 或 Datadog 进行实时监控：

- 应用性能（Core Web Vitals）
- 用户行为
- 错误率
- API 响应时间

---

## 故障排除

### 常见部署问题

#### 问题 1: 构建失败

```bash
# 错误: Cannot find module
# 解决:
npm install
npm run build

# 检查是否有类型错误
npm run type-check

# 查看详细错误
npm run build -- --debug
```

#### 问题 2: 样式未加载

```bash
# 问题: CSS 文件返回 404
# 解决: 检查 base URL 配置

// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/path/' : '/',
});
```

#### 问题 3: SPA 路由不工作

```bash
# 问题: 访问子路由时返回 404
# 解决: 配置服务器回退到 index.html

# Nginx
location / {
  try_files $uri /index.html;
}

# Express
app.get('*', (req, res) => {
  res.sendFile('index.html');
});
```

#### 问题 4: 性能缓慢

```bash
# 分析问题
npm run build -- --report

# 优化步骤:
1. 启用代码分割
2. 配置 CDN
3. 启用 gzip 压缩
4. 使用 HTTP/2
5. 优化图片资源
```

### 恢复策略

```bash
# 快速回滚到上一版本
git revert HEAD
npm run build
# 重新部署

# 或从 git tag 恢复
git checkout v1.0.0
npm run build
```

---

## 部署检查清单

```markdown
部署前：
- [ ] 所有测试通过
- [ ] 代码审查完成
- [ ] 版本号已更新
- [ ] 更新日志已记录
- [ ] 环境变量已配置

部署中：
- [ ] 备份原始生产环境
- [ ] 运行构建和测试
- [ ] 部署到服务器
- [ ] 验证部署成功

部署后：
- [ ] 检查应用是否正常运行
- [ ] 验证 API 连接
- [ ] 检查监控和日志
- [ ] 通知团队成员
- [ ] 记录部署时间和版本
```

---

**Last Updated**: 2026-01-13
