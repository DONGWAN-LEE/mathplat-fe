export const ProblemType = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SHORT_ANSWER: 'SHORT_ANSWER',
  ESSAY: 'ESSAY',
  TRUE_FALSE: 'TRUE_FALSE',
  FILL_IN_BLANK: 'FILL_IN_BLANK',
} as const;
export type ProblemType = (typeof ProblemType)[keyof typeof ProblemType];

/** 문제 목록용 (answer/solution 제외) */
export interface Problem {
  id: string;
  topicId: string;
  objectiveId?: string;
  content: string;
  type: ProblemType;
  difficulty: number;
  hints?: unknown;
  conceptTags?: string[];
  estimatedTime: number;
  solveCount: number;
  correctRate: number;
  createdAt: string;
  updatedAt: string;
}

/** 문제 상세용 (answer/solution 포함) */
export interface ProblemDetail extends Problem {
  answer: unknown;
  solution: unknown;
}

/** 필터 파라미터 (백엔드 ProblemFilterDto와 매칭) */
export interface ProblemFilterParams {
  topicId?: string;
  objectiveId?: string;
  difficultyMin?: number;
  difficultyMax?: number;
  type?: ProblemType;
  page?: number;
  limit?: number;
}

/** 답안 제출 페이로드 */
export interface SubmitAttemptPayload {
  problemId: string;
  submittedAnswer: unknown;
  timeTaken?: number;
}

/** 채점 결과 응답 */
export interface AttemptResult {
  id: string;
  userId: string;
  problemId: string;
  isCorrect: boolean | null;
  submittedAnswer: unknown;
  timeTaken: number;
  attemptNumber: number;
  createdAt: string;
}
