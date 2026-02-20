import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared/api';
import type { Curriculum, CurriculumListParams } from '../model/types';

export function useCurriculumList(params?: CurriculumListParams) {
  return useQuery({
    queryKey: ['curriculum', 'list', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.grade) searchParams.set('grade', String(params.grade));
      if (params?.semester) searchParams.set('semester', String(params.semester));
      const query = searchParams.toString();
      const url = query ? `/curricula?${query}` : '/curricula';
      const { data } = await apiClient.get<ApiResponse<Curriculum[]>>(url);
      return data.data!;
    },
  });
}

export function useCurriculumDetail(id: string) {
  return useQuery({
    queryKey: ['curriculum', id],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Curriculum>>(
        `/curricula/${id}`,
      );
      return data.data!;
    },
    enabled: !!id,
  });
}
