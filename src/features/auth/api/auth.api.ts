import { apiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared/api';

interface AuthUserData {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthTokensData {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
  tokenType: string;
}

export interface AuthResponseData {
  user: AuthUserData;
  tokens: AuthTokensData;
  isNewUser: boolean;
}

interface TokenRefreshData {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

export async function devLogin(email: string, password: string): Promise<AuthResponseData> {
  const { data } = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/dev/login', {
    email,
    password,
  });
  return data.data!;
}

export async function devSignup(
  email: string,
  password: string,
  name: string,
): Promise<AuthResponseData> {
  const { data } = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/dev/signup', {
    email,
    password,
    name,
  });
  return data.data!;
}

export async function refreshTokens(refreshToken: string): Promise<TokenRefreshData> {
  const { data } = await apiClient.post<TokenRefreshData>('/auth/refresh', { refreshToken });
  return data;
}

export async function logout(allDevices = false): Promise<void> {
  await apiClient.post('/auth/logout', { allDevices });
}
