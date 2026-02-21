import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/shared/config/env';
import { ApiRequestError, type ApiResponse } from './types';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
}

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('auth-storage');
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.state?.accessToken ?? null;
  } catch {
    return null;
  }
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('auth-storage');
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.state?.refreshToken ?? null;
  } catch {
    return null;
  }
}

export const apiClient = axios.create({
  baseURL: `${env.apiUrl}/api/v1`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const data = response.data as ApiResponse;
    if (data && data.success === false && data.error) {
      throw new ApiRequestError(
        data.error.code,
        data.error.message,
        response.status,
        data.error.details,
      );
    }
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearAuthStorage();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${env.apiUrl}/api/v1/auth/refresh`, { refreshToken });
        const newAccessToken = data.accessToken ?? data.data?.accessToken;
        const newRefreshToken = data.refreshToken ?? data.data?.refreshToken;

        if (newAccessToken) {
          updateTokensInStorage(newAccessToken, newRefreshToken);
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthStorage();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const apiError = error.response?.data?.error;
    if (apiError) {
      throw new ApiRequestError(
        apiError.code,
        apiError.message,
        error.response?.status ?? 500,
        apiError.details,
      );
    }

    throw error;
  },
);

function updateTokensInStorage(accessToken: string, refreshToken?: string) {
  if (typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem('auth-storage');
    if (!stored) return;
    const parsed = JSON.parse(stored);
    parsed.state.accessToken = accessToken;
    if (refreshToken) parsed.state.refreshToken = refreshToken;
    localStorage.setItem('auth-storage', JSON.stringify(parsed));
  } catch {
    // silently fail
  }
}

function clearAuthStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth-storage');
}
