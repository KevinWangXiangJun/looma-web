/**
 * 用户类型定义
 */
export interface User {
  id: string;
  phone?: string;
  username?: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 认证状态接口
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * API 响应通用接口
 */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * 分页接口
 */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
}

/**
 * 请求配置接口
 */
export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * 登录请求参数
 */
export interface LoginRequest {
  phone?: string;
  username?: string;
  password?: string;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  token: string;
  user: User;
}
