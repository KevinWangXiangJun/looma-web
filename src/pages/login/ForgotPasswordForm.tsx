import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import CountrySelect from './CountrySelect';

interface ForgotPasswordFormProps {
  onLoginClick: () => void;
}

export const ForgotPasswordForm = ({ onLoginClick }: ForgotPasswordFormProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('+86');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
      return { phone: t('login.forgotPassword.phoneRequired') };
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { phone: t('login.forgotPassword.phoneInvalid') };
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
      return { phone: t('login.forgotPassword.phoneRequired') };
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { phone: t('login.forgotPassword.phoneInvalid') };
    }
    if (!verificationCode) {
      return { verificationCode: t('login.forgotPassword.codeRequired') };
    }
    if (!/^\d{4,6}$/.test(verificationCode)) {
      return { verificationCode: t('login.forgotPassword.codeInvalid') };
    }
    return {};
  };

  const validateStep2 = (): Record<string, string> => {
    if (!newPassword) {
      return { newPassword: t('login.forgotPassword.passwordRequired') };
    }
    if (newPassword.length < 6) {
      return { newPassword: t('login.forgotPassword.passwordMinLength') };
    }
    if (!confirmPassword) {
      return { confirmPassword: t('login.forgotPassword.confirmPasswordRequired') };
    }
    if (newPassword !== confirmPassword) {
      return { confirmPassword: t('login.forgotPassword.passwordMismatch') };
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

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        console.log('Resetting password for', { phone, newPassword });
        onLoginClick();
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Card className="border border-gray-200 shadow-xs bg-white flex flex-col min-h-[400px] rounded">
      <CardHeader className="flex-shrink-0 border-b border-gray-300 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-gray-900">
            {t('login.forgotPassword.title')}
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm m-0">
            <button
              onClick={onLoginClick}
              className="text-primary hover:text-primary font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              {t('login.forgotPassword.goLogin')}
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </CardDescription>
        </div>
      </CardHeader>

      <div className="flex-1 flex flex-col">
        {/* 步骤指示器 */}
        <div className="flex items-center justify-between mb-4 text-sm font-medium">
          <div className={`flex items-center ${step === 1 ? 'text-white' : 'text-gray-500'}`}>
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              1
            </span>
            <span className={step === 1 ? 'text-gray-900 font-bold' : ''}>
              {t('login.forgotPassword.step1')}
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
              {t('login.forgotPassword.step2')}
            </span>
          </div>
        </div>

        {/* 第一步表单 */}
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.forgotPassword.phone')}
                </label>
                <div className="flex gap-2">
                  <CountrySelect country={country} onCountryChange={setCountry} />
                  <FormInput
                    type="tel"
                    placeholder={t('login.forgotPassword.phoneRequired')}
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPhone(e.target.value);
                      setErrors({});
                    }}
                    error={errors.phone}
                    className="flex-1 h-10 bg-gray-50 border border-gray-300 rounded"
                    containerClassName="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.forgotPassword.verificationCode')}
                </label>
                <div className="flex gap-2">
                  <FormInput
                    type="text"
                    placeholder={t('login.forgotPassword.codeRequired')}
                    value={verificationCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setVerificationCode(e.target.value);
                      setErrors({});
                    }}
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
                      ? t('login.forgotPassword.sending')
                      : countDown > 0
                        ? `${countDown}s`
                        : t('login.forgotPassword.sendCode')}
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

            <Button type="submit" className="w-full bg-primary h-10 text-white mt-4">
              {t('login.forgotPassword.nextStep')}
            </Button>
          </form>
        )}

        {/* 第二步表单 */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <FormInput
                label={t('login.forgotPassword.newPassword')}
                type="password"
                placeholder={t('login.forgotPassword.passwordRequired')}
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPassword(e.target.value);
                  setErrors({});
                }}
                error={errors.newPassword}
                className="h-10 bg-gray-50 border border-gray-300 rounded"
              />

              <FormInput
                label={t('login.forgotPassword.confirmPassword')}
                type="password"
                placeholder={t('login.forgotPassword.passwordRequired')}
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setConfirmPassword(e.target.value);
                  setErrors({});
                }}
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
              className="w-full bg-primary h-10 text-white mt-4"
              disabled={loading}
            >
              {loading
                ? t('login.forgotPassword.resetting')
                : t('login.forgotPassword.resetPassword')}
            </Button>
          </form>
        )}
      </div>
    </Card>
  );
};

export default ForgotPasswordForm;
