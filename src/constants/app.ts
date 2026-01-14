/**
 * API 配置常量
 */
// @ts-ignore - import.meta.env is provided by Vite
export const API_CONFIG = {
  // @ts-ignore
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
};

/**
 * 登录配置常量
 */
export const LOGIN_CONFIG = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 20,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  PHONE_REGEX: /^1[3-9]\d{9}$/,
};

/**
 * 存储键名常量
 * 这些是存储键的前缀模板，实际使用时会通过 getStorageKey() 函数生成用户特定的键名
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth:token',
  AUTH_USER: 'auth:user',
  AUTH_THEME: 'auth:theme',
  AUTH_LANGUAGE: 'auth:language',
  AUTH_SIDEBAR_COLLAPSED: 'auth:sidebar:collapsed',
};

/**
 * 路由路径常量
 */
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/home',
  DASHBOARD: '/home',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '/404',
};

/**
 * 主题常量
 */
export const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

/**
 * 语言常量
 */
export const LANGUAGE_CONFIG = {
  ZH_CN: 'zh-CN',
  EN: 'en',
};

/**
 * 分页常量
 */
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

/**
 * 消息类型
 */
export const MESSAGE_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * HTTP 状态码
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
