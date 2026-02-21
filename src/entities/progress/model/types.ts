/** 백엔드 ProgressResponseDto 매핑 */
export interface UserProgress {
  id: string;
  userId: string;
  topicId: string;
  masteryLevel: number; // 0~1
  problemsSolved: number;
  correctCount: number;
  topic?: {
    id: string;
    name: string;
    sectionId: string;
  };
  createdAt: string;
  updatedAt: string;
}

/** 숙달도 레벨 라벨 */
export type MasteryLevel =
  | 'beginner'
  | 'learning'
  | 'proficient'
  | 'advanced'
  | 'master';
