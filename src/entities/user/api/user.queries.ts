import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared/api';
import type { User, UserStats } from '../model/types';

export function useProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<User>>('/users/me');
      return data.data!;
    },
  });
}

export function useMyStats() {
  return useQuery({
    queryKey: ['user', 'stats'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<UserStats>>('/stats/me');
      return data.data!;
    },
  });
}
