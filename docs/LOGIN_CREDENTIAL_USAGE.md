/**
 * 登录凭证保存使用说明
 * 
 * 系统自动在用户成功登录/注册/重置密码后保存登录凭证
 * 可在后续页面中通过 useLoginCredential Hook 获取
 */

import { useLoginCredential } from '@/hooks';

/**
 * 使用示例 1：在其他页面中获取保存的登录凭证
 */
export const ExamplePage1 = () => {
  const { type, value, country, hasCredential, clear } = useLoginCredential();

  if (!hasCredential) {
    return <div>没有登录凭证</div>;
  }

  return (
    <div>
      <p>登录方式: {type === 'phone' ? '手机号' : '用户名'}</p>
      <p>登录凭证: {value}</p>
      {type === 'phone' && <p>国家代码: {country}</p>}
      <button onClick={clear}>清除凭证</button>
    </div>
  );
};

/**
 * 使用示例 2：预填表单
 */
export const ExamplePage2 = () => {
  const { type, value } = useLoginCredential();

  // 手机号登录情况下，可以在其他表单中预填手机号
  if (type === 'phone') {
    return (
      <form>
        <input type="text" defaultValue={value} placeholder="手机号" />
        {/* 其他表单项 */}
      </form>
    );
  }

  // 用户名登录情况下，可以在其他表单中预填用户名
  return (
    <form>
      <input type="text" defaultValue={value} placeholder="用户名" />
      {/* 其他表单项 */}
    </form>
  );
};

/**
 * 使用示例 3：发送验证码
 */
export const ExamplePage3 = () => {
  const { type, value, country } = useLoginCredential();

  const handleSendCode = async () => {
    if (type === 'phone') {
      // 使用保存的手机号发送验证码
      console.log(`发送验证码到 ${country}${value}`);
      // API 调用
    }
  };

  return <button onClick={handleSendCode}>发送验证码</button>;
};

/**
 * 存储的凭证结构：
 * 
 * interface LoginCredential {
 *   type: 'phone' | 'username';      // 登录方式
 *   value: string;                    // 凭证值（手机号或用户名）
 *   country?: string;                 // 国家代码（仅手机号有）
 * }
 */
