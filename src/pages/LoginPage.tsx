import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Carousel } from '@/components/ui';
import { validatePhone, validatePassword, validateUsername } from '@/utils/validate';
import { ROUTES } from '@/constants';
import { Eye, EyeOff } from 'lucide-react';

/**
 * 登录页面 - 现代深色主题
 * 支持用户名和手机号两种登录方式
 */
function LoginPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 登录方式切换
  const [loginType, setLoginType] = useState<'phone' | 'username'>('username');
  
  // 表单数据
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 表单验证错误
  const [formErrors, setFormErrors] = useState({
    phone: '',
    username: '',
    password: '',
  });

  /**
   * 验证表单
   */
  const validateForm = (): boolean => {
    const errors: any = {};

    if (loginType === 'phone') {
      if (!phone) {
        errors.phone = t('login.phoneRequired') || '请输入手机号';
      } else if (!validatePhone(phone)) {
        errors.phone = t('login.phoneInvalid') || '手机号格式不正确';
      }
    } else {
      if (!username) {
        errors.username = t('login.usernameRequired') || '请输入用户名';
      } else if (!validateUsername(username)) {
        errors.username = t('login.usernameInvalid') || '用户名格式不正确';
      }
    }

    if (!password) {
      errors.password = t('login.passwordRequired') || '请输入密码';
    } else if (!validatePassword(password)) {
      errors.password = t('login.passwordInvalid') || '密码长度6-20位';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * 处理Tab切换
   */
  const handleTabChange = (type: 'phone' | 'username') => {
    setLoginType(type);
    setFormErrors({ phone: '', username: '', password: '' });
    setError('');
  };

  /**
   * 处理登录
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 这里应该调用真实的登录 API
      // const loginData = loginType === 'phone' ? { phone, password } : { username, password };
      // await login(loginData);
      
      // 演示：固定用户名密码
      if (username === 'admin' && password === 'password') {
        // 登录成功，跳转到首页
        navigate(ROUTES.HOME);
      } else {
        setError(t('login.error') || '登录失败：演示账号 admin / password');
      }
    } catch (err: any) {
      setError(err.message || t('login.error') || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  // 轮播图数据
  const carouselItems = [
    { id: 1, title: 'Feature 1', description: 'Modern Design' },
    { id: 2, title: 'Feature 2', description: 'Fast Performance' },
    { id: 3, title: 'Feature 3', description: 'Great Experience' },
  ];

  return (
    <div className="min-h-screen w-full flex bg-gray-900">
      {/* 左侧轮播区 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="w-full h-full p-8 flex flex-col items-center justify-center">
          <div className="w-full h-2/3">
            <Carousel
              items={carouselItems}
              autoplay
              interval={5000}
              className="h-full rounded-2xl shadow-2xl"
              showNavigation={false}
            />
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">Looma</h1>
            <p className="text-gray-400 text-lg">{t('login.tagline') || 'Modern Web Application'}</p>
          </div>
        </div>
      </div>

      {/* 右侧登录表单区域 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-900">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {t('login.welcome') || 'Welcome to'} <span className="text-primary-600">Looma</span>
            </h2>
            <p className="text-gray-400">{t('login.description') || 'Sign in to your account'}</p>
          </div>

          <Card className="border border-primary-500/50 shadow-lg bg-gray-950">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{t('login.title') || '登录'}</CardTitle>
              <CardDescription className="text-gray-400">
                {t('login.formDescription') || '输入您的凭证继续'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 错误提示 */}
                {error && (
                  <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                {/* Tab 切换按钮 */}
                <div className="flex gap-4 border-b border-gray-700">
                  <button
                    type="button"
                    onClick={() => handleTabChange('username')}
                    className={`pb-3 px-2 font-medium transition-colors ${
                      loginType === 'username'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {t('login.usernameTab') || 'Username'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabChange('phone')}
                    className={`pb-3 px-2 font-medium transition-colors ${
                      loginType === 'phone'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {t('login.phoneTab') || 'Phone'}
                  </button>
                </div>

                {/* 用户名输入 */}
                {loginType === 'username' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('login.username') || 'Username'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t('login.placeholderUsername') || 'Enter username'}
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setFormErrors({ ...formErrors, username: '' });
                        }}
                        disabled={loading}
                        required
                        className="w-full px-4 py-2.5 bg-gray-850 border border-primary-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50"
                      />
                      {formErrors.username && (
                        <p className="mt-1 text-xs text-red-400">{formErrors.username}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 手机号输入 */}
                {loginType === 'phone' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('login.phone') || 'Phone'}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder={t('login.placeholderPhone') || 'Enter phone number'}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setFormErrors({ ...formErrors, phone: '' });
                        }}
                        disabled={loading}
                        required
                        className="w-full px-4 py-2.5 bg-gray-850 border border-primary-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50"
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-xs text-red-400">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 密码输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('login.password') || 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('login.placeholderPassword') || 'Enter password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFormErrors({ ...formErrors, password: '' });
                      }}
                      disabled={loading}
                      required
                      className="w-full px-4 py-2.5 pr-10 bg-gray-850 border border-primary-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 disabled:opacity-50"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {formErrors.password && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.password}</p>
                    )}
                  </div>
                </div>

                {/* 记住我 和 忘记密码 */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      className="rounded mr-2 border border-primary-500/30 bg-gray-850 accent-primary-600"
                      disabled={loading}
                    />
                    <span>{t('login.rememberMe') || 'Remember me'}</span>
                  </label>
                  <a href="#" className="text-primary-600 hover:text-primary-400">
                    {t('login.forgotPassword') || 'Forgot password?'}
                  </a>
                </div>

                {/* 登录按钮 */}
                <Button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (t('login.loggingIn') || '登录中...') : (t('login.submit') || '登 录')}
                </Button>
              </form>

              {/* 注册链接 */}
              <div className="mt-6 text-center text-sm text-gray-400">
                <p>
                  {t('login.noAccount') || "Don't have an account?"}{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-400 font-medium">
                    {t('login.signup') || 'Sign up'}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 演示凭证提示 */}
          <div className="mt-6 p-4 bg-gray-950 border border-primary-500/30 rounded-lg">
            <p className="text-xs text-gray-400">
              <strong className="text-gray-300">{t('login.testAccount') || 'Demo Account:'}  </strong>
              admin / password
            </p>
          </div>

          {/* 页脚 */}
          <div className="mt-12 text-center text-xs text-gray-600">
            <p>© 2026 Looma Web. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
export { LoginPage };
