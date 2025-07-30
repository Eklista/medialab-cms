import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { env } from '../../config/env';

export interface ApiConfig {
  baseURL: string;
  token?: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiListResponse<T> {
  data: T[];
  meta?: {
    total_count: number;
    filter_count: number;
  };
}

class ApiClient {
  private client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: env.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        ...(config.token && { Authorization: `Bearer ${config.token}` }),
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        if (env.ENABLE_LOGGING) {
          console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => {
        if (env.ENABLE_LOGGING) {
          console.error('Request error:', error);
        }
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (env.ENABLE_LOGGING) {
          console.error('Response error:', error.response?.data || error.message);
        }
        
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        
        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized() {
    localStorage.removeItem(env.AUTH_TOKEN_KEY);
    localStorage.removeItem(env.AUTH_REFRESH_KEY);
    window.location.href = '/auth/login';
  }

  updateToken(token: string) {
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url);
    return response.data;
  }
}

const apiClient = new ApiClient({
  baseURL: env.API_BASE_URL,
  token: localStorage.getItem(env.AUTH_TOKEN_KEY) || undefined,
});

export default apiClient;