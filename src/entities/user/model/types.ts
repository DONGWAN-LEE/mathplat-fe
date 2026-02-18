export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  id: string;
  userId: string;
  totalXp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalProblemsSolved: number;
  totalStudyTime: number;
  createdAt: string;
  updatedAt: string;
}
