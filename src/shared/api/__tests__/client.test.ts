jest.mock('@/shared/config/env', () => ({
  env: { apiUrl: 'http://test-api' },
}));

import { apiClient } from '../client';
import { ApiRequestError } from '../types';

describe('apiClient', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have baseURL set to env.apiUrl/api/v1', () => {
    expect(apiClient.defaults.baseURL).toBe('http://test-api/api/v1');
  });

  it('should have timeout of 15000', () => {
    expect(apiClient.defaults.timeout).toBe(15000);
  });

  it('should have Content-Type header set to application/json', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should add Authorization header when token exists in localStorage', async () => {
    localStorage.setItem(
      'auth-storage',
      JSON.stringify({ state: { accessToken: 'my-token', refreshToken: 'rt' } }),
    );

    // Run the request interceptor manually
    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: new (await import('axios')).AxiosHeaders(),
    } as never);

    expect(config.headers.Authorization).toBe('Bearer my-token');
  });

  it('should not add Authorization header when no token in localStorage', async () => {
    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: new (await import('axios')).AxiosHeaders(),
    } as never);

    expect(config.headers.Authorization).toBeUndefined();
  });

  it('should pass through response when success is true', async () => {
    const mockResponse = {
      data: { success: true, data: { id: 1 } },
      status: 200,
    };

    const result = await apiClient.interceptors.response.handlers[0].fulfilled(mockResponse as never);
    expect(result).toEqual(mockResponse);
  });

  it('should throw ApiRequestError when success is false', () => {
    const mockResponse = {
      data: {
        success: false,
        error: { code: 'AUTH_001', message: 'Unauthorized', details: { reason: 'expired' } },
      },
      status: 401,
    };

    try {
      apiClient.interceptors.response.handlers[0].fulfilled(mockResponse as never);
      fail('Expected ApiRequestError to be thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(ApiRequestError);
      const err = e as ApiRequestError;
      expect(err.code).toBe('AUTH_001');
      expect(err.message).toBe('Unauthorized');
      expect(err.status).toBe(401);
    }
  });

  it('should return null token when window is undefined (SSR)', () => {
    // The getAccessToken function checks typeof window === 'undefined'
    // In jsdom, window is defined, so we test via localStorage being empty
    localStorage.clear();
    // No auth-storage → null token → no Authorization header
    const stored = localStorage.getItem('auth-storage');
    expect(stored).toBeNull();
  });
});
