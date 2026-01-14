import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { validateRequired } from '@/utils/validate';
import { Eye, EyeOff } from 'lucide-react';

interface UsernameLoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  error: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onForgotClick: () => void;
  clearTrigger?: number;
}

export const UsernameLogin = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  loading,
  onSubmit,
  onForgotClick,
  clearTrigger,
}: UsernameLoginProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 当clearTrigger改变时，清除errors
  React.useEffect(() => {
    setErrors({});
  }, [clearTrigger]);

  /**
   * 校验用户名：检查必填
   */
  const validateUsernameField = (val: string): string | null => {
    if (!validateRequired(val)) {
      return t('login.login.usernameRequired');
    }
    return null;
  };

  /**
   * 校验密码：检查必填
   */
  const validatePasswordField = (val: string): string | null => {
    if (!validateRequired(val)) {
      return t('login.login.passwordRequired');
    }
    return null;
  };

  /**
   * 表单完整校验（提交时调用）
   * 一个一个校验：先校验用户名（必填），再校验密码（必填）
   */
  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    // 第一步：校验用户名必填
    if (!validateRequired(username)) {
      newErrors.username = t('login.login.usernameRequired');
      return newErrors; // 必填未通过，直接返回
    }
    
    // 第二步：校验密码必填
    if (!validateRequired(password)) {
      newErrors.password = t('login.login.passwordRequired');
      return newErrors; // 必填未通过，直接返回
    }
    
    return newErrors; // 所有校验通过，返回空对象
  };

  /**
   * 处理表单提交
   */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(e);
    } else {
      setErrors(validationErrors);
    }
  };

  /**
   * 处理用户名输入变化
   */
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUsername(newValue);
    // 有输入时校验并清除错误
    if (newValue) {
      const usernameErr = validateUsernameField(newValue);
      if (usernameErr) {
        setErrors((prev) => ({ ...prev, username: usernameErr }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.username;
          return newErrors;
        });
      }
    } else {
      // 清空时清除错误
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.username;
        return newErrors;
      });
    }
  };

  /**
   * 处理密码输入变化
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    // 有输入时校验并清除错误
    if (newValue) {
      const passwordErr = validatePasswordField(newValue);
      if (passwordErr) {
        setErrors((prev) => ({ ...prev, password: passwordErr }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.password;
          return newErrors;
        });
      }
    } else {
      // 清空时清除错误
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="space-y-6">
        <FormInput
          label={t('login.login.username')}
          type="text"
          placeholder={t('login.login.usernameRequired')}
          value={username}
          onChange={handleUsernameChange}
          disabled={loading}
          error={errors.username}
          className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('login.login.password')}
          </label>
          <div className="relative">
            <FormInput
              type={showPassword ? 'text' : 'password'}
              placeholder={t('login.login.passwordRequired')}
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
              error={errors.password}
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded pr-10"
              containerClassName="relative"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 校验错误消息 */}
      {Object.keys(errors).length > 0 && (
        <div className="space-y-2 mt-2">
          {Object.entries(errors).map(([field, message]) => (
            <p key={field} className="text-xs text-red-500">
              {message}
            </p>
          ))}
        </div>
      )}

      {/* API 错误消息 */}
      {error && (
        <div className="space-y-2 mt-2">
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-sm mt-4">
        <label className="flex items-center">
          <input type="checkbox" className="rounded mr-2 border border-gray-300 accent-primary-600" />
          <span className="text-gray-700">记住我</span>
        </label>
        <button
          type="button"
          onClick={onForgotClick}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          {t('login.login.forgotPassword')}
        </button>
      </div>

      <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white h-10 mt-6 transition-colors" disabled={loading}>
        {loading ? t('login.login.loggingIn') : t('login.login.submit')}
      </Button>
    </form>
  );
};

export default UsernameLogin;
