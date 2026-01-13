import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatFileSize,
  formatPhone,
  formatCurrency,
} from '@/utils/format';

/**
 * 格式化工具函数测试
 */
describe('Format Utils', () => {
  describe('formatDate', () => {
    it('应该正确格式化日期', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'YYYY-MM-DD');
      expect(result).toContain('2024');
      expect(result).toContain('01');
      expect(result).toContain('15');
    });
  });

  describe('formatFileSize', () => {
    it('应该正确格式化文件大小', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(0)).toBe('0 B');
    });
  });

  describe('formatPhone', () => {
    it('应该正确格式化电话号码', () => {
      const result = formatPhone('13800138000');
      expect(result).toBe('138 0013 8000');
    });
  });

  describe('formatCurrency', () => {
    it('应该正确格式化货币', () => {
      const result = formatCurrency(100);
      expect(result).toContain('100');
    });
  });
});
