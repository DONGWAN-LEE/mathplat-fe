import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared/api';
import type { Achievement, UserAchievement } from '../model/types';

export function useAchievements() {
  return useQuery({
    queryKey: ['achievements', 'list'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Achievement[]>>(
        '/achievements',
      );
      return data.data!;
    },
  });
}

export function useMyAchievements() {
  return useQuery({
    queryKey: ['achievements', 'me'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<UserAchievement[]>>(
        '/achievements/me',
      );
      return data.data!;
    },
  });
}
