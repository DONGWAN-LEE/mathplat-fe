import type { ProblemType, AttemptResult } from '@/entities/problem';

/** GET /attempts/me 응답 항목 (problem join 포함) */
export interface AttemptListItem extends AttemptResult {
  problem: {
    id: string;
    content: string;
    type: ProblemType;
    difficulty: number;
  };
}

/** GET /attempts/me 쿼리 파라미터 */
export interface AttemptFilterParams {
  page?: number;
  limit?: number;
}
