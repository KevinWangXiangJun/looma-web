import { ApiResponse } from '@/types';

/**
 * HTTP 请求封装类
 * 包含所有基础 HTTP 操作
 * 后续可直接集成真实 API
 */
class HttpClient {
  private baseURL: string;

  constructor(baseURL: string = '', _timeout: number = 30000) {
    this.baseURL = baseURL;
    // 存储超时时间供后续使用（当实现超时逻辑时）
    void _timeout;
  }

  /**
   * GET 请求
   */
  async get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'GET',
      ...options,
    });
    return this.handleResponse<T>(response);
  }

  /**
   * POST 请求
   */
  async post<T>(url: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options,
    });
    return this.handleResponse<T>(response);
  }

  /**
   * PUT 请求
   */
  async put<T>(url: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options,
    });
    return this.handleResponse<T>(response);
  }

  /**
   * DELETE 请求
   */
  async delete<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
      ...options,
    });
    return this.handleResponse<T>(response);
  }

  /**
   * 处理响应
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  }
}

export default HttpClient;
