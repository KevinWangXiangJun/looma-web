import HttpClient from '@/services/http';
import { LoginRequest, LoginResponse } from '@/types';
import { mockUsers } from '@/__mock__';

/**
 * 认证相关 API 服务
 * 包含登录、登出等认证操作
 * 注意：当前使用 Mock 数据，生产环境需要连接真实 API
 */
class AuthService {
  constructor(_httpClient: HttpClient) {
    // 存储供后续使用（当实现真实 API 时）
    void _httpClient;
  }

  /**
   * 用户登录
   * @param loginRequest 登录请求数据
   * @returns 登录响应（包含 token 和用户信息）
   * 
   * 后续集成真实 API 时，取消注释下面的真实请求代码：
   * return this.httpClient.post<LoginResponse>('/auth/login', loginRequest);
   * 
   * Mock 逻辑：
   * - 手机号登录：返回第一条 mockUsers 数据（李明）
   * - 用户名登录：返回第二条 mockUsers 数据（user2）
   */
  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    // 当前使用 Mock 数据，需要调用真实 API 时取消注释下面的代码
    // const response = await this.httpClient.post<LoginResponse>('/auth/login', loginRequest);
    // return response.data;

    // Mock 数据返回 - 根据登录类型返回不同的 mockUsers 数据
    const user = loginRequest.phone ? mockUsers[0] : mockUsers[1];
    
    return Promise.resolve({
      token: 'mock_token_' + Date.now(),
      user: {
        ...user,
        phone: loginRequest.phone || user.phone,
        username: loginRequest.username || user.username,
        createdAt: user.createdAt,
      },
    });
  }

  /**
   * 用户登出
   * 后续集成真实 API 时取消注释下面的代码：
   * return this.httpClient.post('/auth/logout', {});
   */
  async logout(): Promise<void> {
    // 当前使用 Mock，真实 API 集成时使用：
    // await this.httpClient.post('/auth/logout', {});
    return Promise.resolve();
  }

  /**
   * 获取当前用户信息
   * 后续集成真实 API 时取消注释下面的代码：
   * const response = await this.httpClient.get('/auth/profile');
   * return response.data;
   */
  async getCurrentUser() {
    // Mock 数据 - 返回第一条 mockUsers 数据
    return Promise.resolve(mockUsers[0]);
  }
}

// 创建 HTTP 客户端实例（暂不连接真实 API）
const httpClient = new HttpClient('');

// 创建并导出认证服务实例
export const authService = new AuthService(httpClient);

export default AuthService;
