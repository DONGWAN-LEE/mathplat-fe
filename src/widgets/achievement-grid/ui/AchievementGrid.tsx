'use client';

import { useMemo } from 'react';
import { Trophy, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useAchievements,
  useMyAchievements,
} from '@/entities/achievement';
import type { Achievement, AchievementCondition } from '@/entities/achievement';
import { formatDate, formatNumber } from '@/shared/lib/format';

function conditionText(condition: AchievementCondition): string {
  const parts: string[] = [];
  if (condition.totalProblemsSolved != null) {
    parts.push(`${formatNumber(condition.totalProblemsSolved)}문제 풀기`);
  }
  if (condition.currentStreak != null) {
    parts.push(`${formatNumber(condition.currentStreak)}일 연속 학습`);
  }
  if (condition.level != null) {
    parts.push(`레벨 ${condition.level} 달성`);
  }
  if (condition.totalXp != null) {
    parts.push(`${formatNumber(condition.totalXp)} XP 획득`);
  }
  return parts.length > 0 ? parts.join(', ') : '조건 확인 불가';
}

interface AchievementItemProps {
  achievement: Achievement;
  earned: boolean;
  earnedAt?: string;
}

function AchievementItem({ achievement, earned, earnedAt }: AchievementItemProps) {
  return (
    <Card
      className={
        earned
          ? 'border-primary/50 hover:border-primary/70 hover:shadow-md transition-all'
          : 'opacity-50'
      }
    >
      <CardContent className="flex items-start gap-4 pt-6">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            earned ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
          }`}
        >
          {earned ? (
            <Trophy className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Lock className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium truncate">{achievement.name}</h3>
            {earned && (
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                +{formatNumber(achievement.xpReward)} XP
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {achievement.description}
          </p>
          {earned && earnedAt ? (
            <p className="mt-1.5 text-xs text-muted-foreground">
              {formatDate(earnedAt)} 달성
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-muted-foreground">
              {conditionText(achievement.condition)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function AchievementGrid() {
  const { data: achievements, isLoading: loadingAll, error: errorAll } = useAchievements();
  const { data: myAchievements, isLoading: loadingMy, error: errorMy } = useMyAchievements();

  const isLoading = loadingAll || loadingMy;

  const earnedMap = useMemo(() => {
    if (!myAchievements) return new Map<string, string>();
    return new Map(
      myAchievements.map((ua) => [ua.achievement.id, ua.earnedAt]),
    );
  }, [myAchievements]);

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[130px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (errorAll || errorMy || !achievements) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm text-muted-foreground">
            업적 데이터를 불러올 수 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (achievements.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <Trophy className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <p className="mt-2 text-sm text-muted-foreground">
            등록된 업적이 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  const sorted = [...achievements].sort((a, b) => {
    const aEarned = earnedMap.has(a.id);
    const bEarned = earnedMap.has(b.id);
    if (aEarned !== bEarned) return aEarned ? -1 : 1;
    return 0;
  });

  const earnedCount = earnedMap.size;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">업적 목록</h2>
        <span className="text-sm text-muted-foreground">
          {earnedCount} / {achievements.length} 달성
        </span>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((achievement) => (
          <AchievementItem
            key={achievement.id}
            achievement={achievement}
            earned={earnedMap.has(achievement.id)}
            earnedAt={earnedMap.get(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
}
