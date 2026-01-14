import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
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
}: UsernameLoginProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): Record<string, string> => {
    if (!username) {
      return { username: t('login.login.usernameRequired') };
    }
    if (!password) {
      return { password: t('login.login.passwordRequired') };
    }
    return {};
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(e);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FormInput
          label={t('login.login.username')}
          type="text"
          placeholder={t('login.login.usernameRequired')}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
            setErrors({});
          }}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setErrors({});
              }}
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
          <input type="checkbox" className="rounded mr-2 border border-gray-300" />
          <span className="text-gray-700">记住我</span>
        </label>
        <button
          type="button"
          onClick={onForgotClick}
          className="text-sm text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          {t('login.login.forgotPassword')}
        </button>
      </div>

      <Button type="submit" className="w-full bg-primary h-10 mt-4" disabled={loading}>
        {loading ? t('login.login.loggingIn') : t('login.login.submit')}
      </Button>
    </form>
  );
};

export default UsernameLogin;
