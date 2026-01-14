import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
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
}: PhoneLoginProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): Record<string, string> => {
    if (!phone) {
      return { phone: t('login.login.phoneRequired') };
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { phone: t('login.login.phoneInvalid') };
    }
    if (!verificationCode) {
      return { verificationCode: t('login.login.codeRequired') };
    }
    if (!/^\d{4,6}$/.test(verificationCode)) {
      return { verificationCode: t('login.register.codeInvalid') };
    }
    return {};
  };

  const validatePhoneForCode = (): Record<string, string> => {
    if (!phone) {
      return { phone: t('login.login.phoneRequired') };
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { phone: t('login.login.phoneInvalid') };
    }
    return {};
  };

  const handleSendCodeClick = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneErrors = validatePhoneForCode();
    if (Object.keys(phoneErrors).length > 0) {
      setErrors(phoneErrors as Record<string, string>);
      return;
    }
    setErrors({});
    onSendCode(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(e);
    } else {
      setErrors(validationErrors as Record<string, string>);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(e.target.value.replace(/\D/g, '').slice(0, 11));
                setErrors({});
              }}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setErrors({});
              }}
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
              className="whitespace-nowrap px-4 h-10 hover:bg-primary-600 hover:text-white hover:border-primary disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-300"
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

      <Button type="submit" className="w-full bg-primary h-10 mt-4" disabled={loading}>
        {loading ? t('login.login.loggingIn') : t('login.login.submit')}
      </Button>
    </form>
  );
};

export default PhoneLogin;
