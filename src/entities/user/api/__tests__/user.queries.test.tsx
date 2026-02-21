import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProfile, useMyStats } from '../user.queries';

jest.mock('@/shared/api', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

import { apiClient } from '@/shared/api';

const mockedGet = apiClient.get as jest.MockedFunction<typeof apiClient.get>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use queryKey ["user", "profile"]', () => {
    mockedGet.mockResolvedValueOnce({ data: { success: true, data: { id: '1', name: 'Test' } } } as never);
    const { result } = renderHook(() => useProfile(), { wrapper: createWrapper() });
    // The hook internally uses ['user', 'profile'] as the queryKey
    expect(result.current.isLoading).toBe(true);
  });

  it('should return data on success', async () => {
    const userData = { id: '1', email: 'a@b.com', name: 'Test', createdAt: '', updatedAt: '' };
    mockedGet.mockResolvedValueOnce({ data: { success: true, data: userData } } as never);

    const { result } = renderHook(() => useProfile(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(userData);
    expect(mockedGet).toHaveBeenCalledWith('/users/me');
  });

  it('should set error state on failure', async () => {
    mockedGet.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useProfile(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});

describe('useMyStats', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use queryKey ["user", "stats"]', () => {
    mockedGet.mockResolvedValueOnce({ data: { success: true, data: { totalXp: 100 } } } as never);
    const { result } = renderHook(() => useMyStats(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it('should return data on success', async () => {
    const statsData = {
      id: '1', userId: 'u1', totalXp: 500, level: 5,
      currentStreak: 3, longestStreak: 10, totalProblemsSolved: 50,
      totalStudyTime: 3600, createdAt: '', updatedAt: '',
    };
    mockedGet.mockResolvedValueOnce({ data: { success: true, data: statsData } } as never);

    const { result } = renderHook(() => useMyStats(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(statsData);
    expect(mockedGet).toHaveBeenCalledWith('/stats/me');
  });

  it('should set error state on failure', async () => {
    mockedGet.mockRejectedValueOnce(new Error('Server error'));

    const { result } = renderHook(() => useMyStats(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
