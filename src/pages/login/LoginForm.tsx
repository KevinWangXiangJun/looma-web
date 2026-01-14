import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { useAuthStore } from '@/store';
import { authService } from '@/services';
import { UsernameLogin } from './UsernameLogin';
import { PhoneLogin } from './PhoneLogin';

interface LoginFormProps {
  onRegisterClick: () => void;
  onForgotClick: () => void;
}

export const LoginForm = ({ onRegisterClick, onForgotClick }: LoginFormProps) => {
  const login = useAuthStore((state) => state.login);
  const saveLoginCredential = useAuthStore((state) => state.saveLoginCredential);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const from = location.state?.from?.pathname || '/app/dashboard';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('+86');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [tabValue, setTabValue] = useState('phone');

  useEffect(() => {
    if (countDown <= 0) return;

    const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countDown]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError(t('login.login.phoneRequired'));
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError(t('login.login.phoneInvalid'));
      return;
    }

    setError('');
    setCodeLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCountDown(60);
    } finally {
      setCodeLoading(false);
    }
  };

  const handleUsernameLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (username === 'admin' && password === 'password') {
        // 调用 AuthService 登录，返回 mockUsers 第二条数据
        const response = await authService.login({
          username,
          password,
        });
        
        // 保存登录凭证
        saveLoginCredential('username', username);
        login(response.user);
        navigate(from, { replace: true });
      } else {
        setError(t('login.login.error'));
      }
    } catch (err: unknown) {
      const error = err as any;
      setError(error?.message || t('login.login.failed'));
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !verificationCode) {
      setError(t('login.login.phoneAndCodeRequired'));
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (verificationCode) {
        // 调用 AuthService 登录，返回 mockUsers 第一条数据（李明）
        const response = await authService.login({
          phone,
          country,
        });
        
        // 保存登录凭证
        saveLoginCredential('phone', phone, country);
        login(response.user);
        navigate(from, { replace: true });
      } else {
        setError(t('login.login.codeError'));
      }
    } catch (err: unknown) {
      const error = err as any;
      setError(error?.message || t('login.login.failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border border-gray-200 shadow-xs bg-white flex flex-col rounded">
      <CardHeader className="flex-shrink-0 border-b border-gray-300 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-gray-900">{t('login.login.title')}</CardTitle>
          <CardDescription className="text-gray-600 text-sm m-0">
            {t('login.login.noAccount')}{' '}
            <button
              onClick={onRegisterClick}
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center cursor-pointer transition-colors"
            >
              {t('login.login.freeRegister')}
              <ChevronRight className="h-5 w-5 text-primary-600" />
            </button>
          </CardDescription>
        </div>
      </CardHeader>

      <Tabs
        value={tabValue}
        onValueChange={(value) => {
          setTabValue(value);
          setError('');
        }}
        className="flex flex-col flex-1"
      >
        <div className="flex-shrink-0 pt-2 pb-2 border-b border-gray-200">
          <TabsList className="w-full justify-start" variant="button">
            <TabsTrigger value="phone" variant="button">
              {t('login.login.phoneTab')}
            </TabsTrigger>
            <TabsTrigger value="username" variant="button">
              {t('login.login.usernameTab')}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 pt-2">
          <TabsContent value="phone" className="space-y-4 mt-0" key="phone">
            <PhoneLogin
              country={country}
              setCountry={setCountry}
              phone={phone}
              setPhone={setPhone}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              error={error}
              loading={loading}
              codeLoading={codeLoading}
              countDown={countDown}
              onSendCode={handleSendCode}
              onSubmit={handlePhoneLogin}
              clearTrigger={tabValue === 'phone' ? 1 : 0}
            />
          </TabsContent>

          <TabsContent value="username" className="space-y-4 mt-0" key="username">
            <UsernameLogin
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={error}
              loading={loading}
              onSubmit={handleUsernameLogin}
              onForgotClick={onForgotClick}
              clearTrigger={tabValue === 'username' ? 1 : 0}
            />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default LoginForm;
