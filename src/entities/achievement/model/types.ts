/** 업적 달성 조건 */
export interface AchievementCondition {
  totalProblemsSolved?: number;
  currentStreak?: number;
  level?: number;
  totalXp?: number;
}

/** 백엔드 AchievementResponseDto 매핑 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  condition: AchievementCondition;
  xpReward: number;
  createdAt: string;
}

/** 백엔드 UserAchievementResponseDto 매핑 */
export interface UserAchievement {
  id: string;
  achievement: Achievement;
  earnedAt: string;
}
