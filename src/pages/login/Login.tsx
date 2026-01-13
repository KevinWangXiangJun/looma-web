import { useState, ReactNode } from 'react';
import { AuthLayout } from './AuthLayout';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

type ViewType = 'login' | 'register' | 'forgot';

const Login = (): ReactNode => {
  const [view, setView] = useState<ViewType>('login');

  return (
    <AuthLayout>
      {view === 'login' && (
        <LoginForm
          onRegisterClick={() => setView('register')}
          onForgotClick={() => setView('forgot')}
        />
      )}
      {view === 'register' && <RegisterForm onLoginClick={() => setView('login')} />}
      {view === 'forgot' && <ForgotPasswordForm onLoginClick={() => setView('login')} />}
    </AuthLayout>
  );
};

export default Login;
