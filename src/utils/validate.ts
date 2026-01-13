/**
 * 验证工具函数
 */

/**
 * 验证手机号
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * 验证邮箱
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 验证用户名
 */
export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * 验证密码强度
 */
export const validatePasswordStrength = (password: string): boolean => {
  return password.length >= 6 && password.length <= 20;
};

/**
 * 验证密码
 */
export const validatePassword = (password: string): boolean => {
  return validatePasswordStrength(password);
};

/**
 * 验证 URL
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
