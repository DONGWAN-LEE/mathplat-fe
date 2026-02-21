import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import type { ApiResponse, PaginatedMeta } from '@/shared/api';
import type { AttemptListItem, AttemptFilterParams } from '../model/types';

export function useMyAttempts(params?: AttemptFilterParams) {
  return useQuery({
    queryKey: ['attempt', 'list', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.limit) searchParams.set('limit', String(params.limit));
      const query = searchParams.toString();
      const url = query ? `/attempts/me?${query}` : '/attempts/me';
      const { data } = await apiClient.get<ApiResponse<AttemptListItem[]>>(url);
      return { items: data.data!, meta: data.meta as PaginatedMeta };
    },
  });
}
