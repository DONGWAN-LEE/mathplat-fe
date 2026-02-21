import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared/api';
import type { UserProgress } from '../model/types';

export function useMyProgress() {
  return useQuery({
    queryKey: ['progress', 'list'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<UserProgress[]>>(
        '/progress/me',
      );
      return data.data!;
    },
  });
}

export function useMyTopicProgress(topicId: string | undefined) {
  return useQuery({
    queryKey: ['progress', 'topic', topicId],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<UserProgress>>(
        `/progress/me/topics/${topicId}`,
      );
      return data.data!;
    },
    enabled: !!topicId,
  });
}
