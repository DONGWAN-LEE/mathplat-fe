'use client';

import { LevelProgress } from '@/widgets/level-progress';
import { AchievementGrid } from '@/widgets/achievement-grid';

export function AchievementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">업적</h1>
        <p className="text-muted-foreground">
          달성한 업적과 레벨 진행 상황을 확인하세요.
        </p>
      </div>
      <LevelProgress />
      <AchievementGrid />
    </div>
  );
}
