import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { useAuthStore } from '@/store';
import CountrySelect from './CountrySelect';

interface RegisterFormProps {
  onLoginClick: () => void;
}

export const RegisterForm = ({ onLoginClick }: RegisterFormProps) => {
  const { t } = useTranslation();
  const saveLoginCredential = useAuthStore((state) => state.saveLoginCredential);
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('+86');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (countDown <= 0) return;

    const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countDown]);

  const validatePhoneForCode = () => {
    if (!phone) {
      return { phone: t('login.register.phoneRequired') };
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { phone: t('login.register.phoneInvalid') };
    }
    return {};
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneErrors = validatePhoneForCode();
    if (Object.keys(phoneErrors).length > 0) {
      setErrors(phoneErrors as Record<string, string>);
      return;
    }
    setErrors({});
    setCodeLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCountDown(60);
    } finally {
      setCodeLoading(false);
    }
  };

  const validateStep1 = () => {
    if (!phone) {
      return { phone: t('login.register.phoneRequired') };
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { phone: t('login.register.phoneInvalid') };
    }
    if (!verificationCode) {
      return { verificationCode: t('login.register.codeRequired') };
    }
    if (!/^\d{4,6}$/.test(verificationCode)) {
      return { verificationCode: t('login.register.codeInvalid') };
    }
    return {};
  };

  const validateStep2 = (): Record<string, string> => {
    if (!password) {
      return { password: t('login.register.passwordRequired') };
    }
    if (password.length < 6) {
      return { password: t('login.register.passwordMinLength') };
    }
    if (!confirmPassword) {
      return { confirmPassword: t('login.register.confirmPasswordRequired') };
    }
    if (password !== confirmPassword) {
      return { confirmPassword: t('login.register.passwordMismatch') };
    }
    return {};
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep1();
    if (Object.keys(validationErrors).length === 0) {
      setStep(2);
      setErrors({});
    } else {
      setErrors(validationErrors as Record<string, string>);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        console.log('Registering with', { phone, password });
        // 保存注册凭证
        saveLoginCredential('phone', phone, country);
        onLoginClick();
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors as Record<string, string>);
    }
  };

  /**
   * 处理注册页面手机号输入变化
   */
  const handleRegisterPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(newValue);
    // 有输入时校验格式并清除错误
    if (newValue) {
      if (!/^1[3-9]\d{9}$/.test(newValue)) {
        setErrors((prev) => ({ ...prev, phone: t('login.register.phoneInvalid') }));
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
   * 处理注册页面验证码输入变化
   */
  const handleRegisterVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  /**
   * 处理注册页面密码输入变化
   */
  const handleRegisterPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    // 有输入时校验并清除错误
    if (newValue) {
      if (newValue.length < 6) {
        setErrors((prev) => ({ ...prev, password: t('login.register.passwordMinLength') }));
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

  /**
   * 处理注册页面确认密码输入变化
   */
  const handleRegisterConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    // 有输入时校验与密码是否匹配
    if (newValue) {
      if (password && newValue !== password) {
        setErrors((prev) => ({ ...prev, confirmPassword: t('login.register.passwordMismatch') }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    } else {
      // 清空时清除错误
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  };

  return (
    <Card className="border border-gray-200 shadow-xs bg-white flex flex-col min-h-[390px] rounded">
      <CardHeader className="flex-shrink-0 border-b border-gray-300 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-gray-900">{t('login.register.title')}</CardTitle>
          <CardDescription className="text-gray-600 text-sm m-0">
            <button
              onClick={onLoginClick}
              className="text-primary hover:text-primary font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              {t('login.register.goLogin')}
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </CardDescription>
        </div>
      </CardHeader>

      <div className="flex-1 flex flex-col">
        {/* 步骤指示器 */}
        <div className="flex items-center justify-between mb-6 text-sm font-medium">
          <div className={`flex items-center ${step === 1 ? 'text-white' : 'text-gray-500'}`}>
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              1
            </span>
            <span className={step === 1 ? 'text-gray-900 font-bold' : ''}>
              {t('login.register.step1')}
            </span>
          </div>
          <div className="w-20 h-[1px] bg-gray-300 ml-4 mr-4 flex-1"></div>
          <div className={`flex items-center ${step === 2 ? 'text-white' : 'text-gray-500'}`}>
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              2
            </span>
            <span className={step === 2 ? 'text-gray-900 font-bold' : ''}>
              {t('login.register.step2')}
            </span>
          </div>
        </div>

        {/* 第一步表单 */}
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.register.phone')}
                </label>
                <div className="flex gap-2">
                  <CountrySelect country={country} onCountryChange={setCountry} />
                  <FormInput
                    type="tel"
                    placeholder={t('login.register.phoneRequired')}
                    value={phone}
                    onChange={handleRegisterPhoneChange}
                    error={errors.phone}
                    className="flex-1 h-10 bg-gray-50 border border-gray-300 rounded"
                    containerClassName="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.register.verificationCode')}
                </label>
                <div className="flex gap-2">
                  <FormInput
                    type="text"
                    placeholder={t('login.register.codeRequired')}
                    value={verificationCode}
                    onChange={handleRegisterVerificationCodeChange}
                    error={errors.verificationCode}
                    className="flex-1 h-10 bg-gray-50 border border-gray-300 rounded"
                    containerClassName="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleSendCode}
                    disabled={codeLoading || countDown > 0}
                    variant="outline"
                    className="whitespace-nowrap px-4 h-10 hover:bg-primary/90 hover:text-white hover:border-primary disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-300"
                  >
                    {codeLoading
                      ? t('login.register.sending')
                      : countDown > 0
                        ? `${countDown}s`
                        : t('login.register.sendCode')}
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

            <Button type="submit" className="w-full bg-primary h-10 text-white mt-6">
              {t('login.register.nextStep')}
            </Button>
          </form>
        )}

        {/* 第二步表单 */}
        {step === 2 && (
          <form onSubmit={handleRegister}>
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <FormInput
                label={t('login.register.password')}
                type="password"
                placeholder={t('login.register.passwordRequired')}
                value={password}
                onChange={handleRegisterPasswordChange}
                error={errors.password}
                className="h-10 bg-gray-50 border border-gray-300 rounded"
              />

              <FormInput
                label={t('login.register.confirmPassword')}
                type="password"
                placeholder={t('login.register.passwordRequired')}
                value={confirmPassword}
                onChange={handleRegisterConfirmPasswordChange}
                error={errors.confirmPassword}
                className="h-10 bg-gray-50 border border-gray-300 rounded"
              />
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

            <Button
              type="submit"
              className="w-full bg-primary h-10 text-white mt-6"
              disabled={loading}
            >
              {loading ? t('login.register.registering') : t('login.register.register')}
            </Button>
          </form>
        )}
      </div>
    </Card>
  );
};

export default RegisterForm;
