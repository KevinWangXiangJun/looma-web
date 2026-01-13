import { describe, it, expect } from 'vitest';
import { validatePhone, validateEmail, validatePassword } from '@/utils/validate';

/**
 * 验证工具函数测试
 */
describe('Validate Utils', () => {
  describe('validatePhone', () => {
    it('应该验证有效的手机号', () => {
      expect(validatePhone('13800138000')).toBe(true);
      expect(validatePhone('15800138000')).toBe(true);
    });

    it('应该拒绝无效的手机号', () => {
      expect(validatePhone('1380013800')).toBe(false);
      expect(validatePhone('12800138000')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('应该验证有效的邮箱', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
    });

    it('应该拒绝无效的邮箱', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('应该验证有效的密码', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('abc123')).toBe(true);
    });

    it('应该拒绝过短的密码', () => {
      expect(validatePassword('abc')).toBe(false);
      expect(validatePassword('12345')).toBe(false);
    });

    it('应该拒绝过长的密码', () => {
      expect(validatePassword('a'.repeat(21))).toBe(false);
    });
  });
});
