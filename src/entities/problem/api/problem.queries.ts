import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import type { ApiResponse, PaginatedMeta } from '@/shared/api';
import type {
  Problem,
  ProblemDetail,
  ProblemFilterParams,
  SubmitAttemptPayload,
  AttemptResult,
} from '../model/types';

export function useProblemList(params?: ProblemFilterParams) {
  return useQuery({
    queryKey: ['problem', 'list', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.topicId) searchParams.set('topicId', params.topicId);
      if (params?.objectiveId) searchParams.set('objectiveId', params.objectiveId);
      if (params?.difficultyMin != null) searchParams.set('difficultyMin', String(params.difficultyMin));
      if (params?.difficultyMax != null) searchParams.set('difficultyMax', String(params.difficultyMax));
      if (params?.type) searchParams.set('type', params.type);
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.limit) searchParams.set('limit', String(params.limit));
      const query = searchParams.toString();
      const url = query ? `/problems?${query}` : '/problems';
      const { data } = await apiClient.get<ApiResponse<Problem[]>>(url);
      return { items: data.data!, meta: data.meta as PaginatedMeta };
    },
  });
}

export function useProblemDetail(id: string) {
  return useQuery({
    queryKey: ['problem', id],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ProblemDetail>>(
        `/problems/${id}`,
      );
      return data.data!;
    },
    enabled: !!id,
  });
}

export function useMyProblemAttempts(problemId: string) {
  return useQuery({
    queryKey: ['attempt', 'problem', problemId],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<AttemptResult[]>>(
        `/attempts/me/problems/${problemId}`,
      );
      return data.data!;
    },
    enabled: !!problemId,
  });
}

export function useSubmitAttempt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SubmitAttemptPayload) => {
      const { data } = await apiClient.post<ApiResponse<AttemptResult>>(
        '/attempts',
        payload,
      );
      return data.data!;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['attempt', 'problem', variables.problemId],
      });
      queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['attempt', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['progress', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['achievements', 'me'] });
    },
  });
}
