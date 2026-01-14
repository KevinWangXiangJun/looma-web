import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { validateRequired, validatePhone, validateVerificationCode } from '@/utils/validate';
import CountrySelect from './CountrySelect';

interface PhoneLoginProps {
  phone: string;
  setPhone: (value: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  error: string;
  loading: boolean;
  codeLoading: boolean;
  countDown: number;
  onSendCode: (e: React.FormEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
  country: string;
  setCountry: (value: string) => void;
  clearTrigger?: number;
}

export const PhoneLogin = ({
  phone,
  setPhone,
  verificationCode,
  setVerificationCode,
  error,
  loading,
  codeLoading,
  countDown,
  onSendCode,
  onSubmit,
  country,
  setCountry,
  clearTrigger,
}: PhoneLoginProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 当clearTrigger改变时，清除errors
  React.useEffect(() => {
    setErrors({});
  }, [clearTrigger]);

  /**
   * 校验手机号：先检查必填，再检查格式
   */
  const validatePhoneField = (val: string): string | null => {
    if (!validateRequired(val)) {
      return t('login.login.phoneRequired');
    }
    if (!validatePhone(val)) {
      return t('login.login.phoneInvalid');
    }
    return null;
  };

  /**
   * 表单完整校验（提交时调用）
   * 一个一个校验：先校验手机号（必填 → 格式），再校验验证码（必填 → 格式）
   */
  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    // 第一步：校验手机号必填
    if (!validateRequired(phone)) {
      newErrors.phone = t('login.login.phoneRequired');
      return newErrors; // 必填未通过，直接返回
    }
    
    // 第二步：校验手机号格式
    if (!validatePhone(phone)) {
      newErrors.phone = t('login.login.phoneInvalid');
      return newErrors; // 格式未通过，直接返回
    }
    
    // 第三步：校验验证码必填
    if (!validateRequired(verificationCode)) {
      newErrors.verificationCode = t('login.login.codeRequired');
      return newErrors; // 必填未通过，直接返回
    }
    
    // 第四步：校验验证码格式
    if (!validateVerificationCode(verificationCode)) {
      newErrors.verificationCode = t('login.register.codeInvalid');
      return newErrors; // 格式未通过，直接返回
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
   * 处理发送验证码按钮点击
   */
  const handleSendCodeClick = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneErr = validatePhoneField(phone);
    if (phoneErr) {
      setErrors({ phone: phoneErr });
      return;
    }
    setErrors({});
    onSendCode(e);
  };

  /**
   * 处理手机号输入变化
   */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(newValue);
    // 有输入时校验格式并清除错误
    if (newValue) {
      const phoneErr = validatePhoneField(newValue);
      if (phoneErr) {
        setErrors((prev) => ({ ...prev, phone: phoneErr }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.phone;
          return newErrors;
        });
      }
    } else {
      // 清空时清除错误
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  /**
   * 处理验证码输入变化
   */
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(newValue);
    // 有输入时校验格式并清除错误
    if (newValue) {
      if (!/^\d{4,6}$/.test(newValue)) {
        setErrors((prev) => ({ ...prev, verificationCode: t('login.register.codeInvalid') }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.verificationCode;
          return newErrors;
        });
      }
    } else {
      // 清空时清除错误
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.verificationCode;
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('login.login.phone')}
          </label>
          <div className="flex gap-2">
            <CountrySelect country={country} onCountryChange={setCountry} />
            <FormInput
              type="tel"
              placeholder={t('login.login.phoneRequired')}
              value={phone}
              onChange={handlePhoneChange}
              disabled={loading || codeLoading}
              error={errors.phone}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded"
              containerClassName="flex-1"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('login.login.verificationCode')}
          </label>
          <div className="flex gap-2">
            <FormInput
              type="text"
              placeholder={t('login.login.codeRequired')}
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              disabled={loading}
              error={errors.verificationCode}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded"
              containerClassName="flex-1"
            />
            <Button
              type="button"
              onClick={handleSendCodeClick}
              disabled={codeLoading || countDown > 0 || loading}
              variant="outline"
              className="whitespace-nowrap px-4 h-10 border-primary-300 text-primary-600 bg-primary-50 hover:bg-primary-100 hover:border-primary-400 hover:text-primary-700 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-300 transition-colors"
            >
              {codeLoading
                ? t('login.login.sending')
                : countDown > 0
                  ? `${countDown}s`
                  : t('login.login.sendCode')}
            </Button>
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

      <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white h-10 mt-6 transition-colors" disabled={loading}>
        {loading ? t('login.login.loggingIn') : t('login.login.submit')}
      </Button>
    </form>
  );
};

export default PhoneLogin;
