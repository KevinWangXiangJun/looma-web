import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { validatePhone, validatePassword, validateUsername } from '@/utils/validate';
import { ROUTES } from '@/constants';

/**
 * 登录页面
 * 支持手机号和用户名两种登录方式
 */
function LoginPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleLogin, loading, error } = useAuth();

  // 登录方式 tab 状态
  const [loginType, setLoginType] = useState<'phone' | 'username'>('phone');

  // 表单状态
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 表单错误状态
  const [formErrors, setFormErrors] = useState({
    phone: '',
    username: '',
    password: '',
  });

  /**
   * 验证表单
   */
  const validateForm = (): boolean => {
    const errors = { phone: '', username: '', password: '' };
    let isValid = true;

    if (loginType === 'phone') {
      if (!phone) {
        errors.phone = t('login.placeholderPhone');
        isValid = false;
      } else if (!validatePhone(phone)) {
        errors.phone = t('login.invalidPhone');
        isValid = false;
      }
    } else {
      if (!username) {
        errors.username = t('login.placeholderUsername');
        isValid = false;
      } else if (!validateUsername(username)) {
        errors.username = '用户名需要 3-20 个字符（只能包含字母、数字、下划线）';
        isValid = false;
      }
    }

    if (!password) {
      errors.password = t('login.placeholderPassword');
      isValid = false;
    } else if (!validatePassword(password)) {
      errors.password = t('login.invalidPassword');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  /**
   * 处理登录
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const loginData =
        loginType === 'phone'
          ? { phone, password }
          : { username, password };

      await handleLogin(loginData);
      // 登录成功后跳转到首页
      navigate(ROUTES.HOME);
    } catch {
      // 错误信息已由 useAuth Hook 处理
    }
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    setPhone('');
    setUsername('');
    setPassword('');
    setFormErrors({ phone: '', username: '', password: '' });
  };

  /**
   * 切换登录方式
   */
  const handleTabChange = (type: 'phone' | 'username') => {
    setLoginType(type);
    resetForm();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
      {/* 左侧图片轮播区域 */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-primary-500 to-blue-600">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold mb-6">{t('home.hero.title')}</h1>
          <p className="text-xl opacity-90">{t('home.hero.description')}</p>
          {/* 轮播区域可在此扩展 */}
          <div className="mt-12 w-full h-64 bg-white/10 rounded-2xl flex items-center justify-center">
            <span className="text-white/50">{t('common.loading')}</span>
          </div>
        </div>
      </div>

      {/* 右侧登录表单区域 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {t('login.title')}
            </CardTitle>
            <p className="text-center text-gray-600 text-sm mt-2">
              {t('login.description')}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tab 切换按钮 */}
              <div className="flex gap-4 border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => handleTabChange('phone')}
                  className={`pb-3 px-2 font-medium transition-colors ${
                    loginType === 'phone'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('login.phoneTab')}
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('username')}
                  className={`pb-3 px-2 font-medium transition-colors ${
                    loginType === 'username'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('login.usernameTab')}
                </button>
              </div>

              {/* 电话号码输入 */}
              {loginType === 'phone' && (
                <Input
                  type="tel"
                  label={t('login.phone')}
                  placeholder={t('login.placeholderPhone')}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setFormErrors({ ...formErrors, phone: '' });
                  }}
                  error={formErrors.phone}
                  required
                />
              )}

              {/* 用户名输入 */}
              {loginType === 'username' && (
                <Input
                  type="text"
                  label={t('login.username')}
                  placeholder={t('login.placeholderUsername')}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setFormErrors({ ...formErrors, username: '' });
                  }}
                  error={formErrors.username}
                  required
                />
              )}

              {/* 密码输入 */}
              <Input
                type="password"
                label={t('login.password')}
                placeholder={t('login.placeholderPassword')}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormErrors({ ...formErrors, password: '' });
                }}
                error={formErrors.password}
                required
              />

              {/* 全局错误显示 */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* 登录按钮 */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : t('login.loginButton')}
              </Button>

              {/* 帮助链接 */}
              <div className="flex justify-between items-center text-sm">
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  {t('login.forgetPassword')}
                </a>
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  {t('login.registerLink')}
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
export { LoginPage };
