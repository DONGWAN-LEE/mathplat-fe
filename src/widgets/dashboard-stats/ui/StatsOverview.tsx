'use client';

import { Star, TrendingUp, Flame, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useMyStats } from '@/entities/user';
import { formatNumber } from '@/shared/lib/format';
import { StatCard } from './StatCard';

export function StatsOverview() {
  const { data: stats, isLoading, error } = useMyStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total XP" value="--" icon={Star} />
        <StatCard title="Level" value="--" icon={TrendingUp} />
        <StatCard title="Streak" value="--" icon={Flame} />
        <StatCard title="Solved" value="--" icon={CheckCircle} />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="총 경험치"
        value={formatNumber(stats.totalXp)}
        icon={Star}
        description="XP"
      />
      <StatCard
        title="레벨"
        value={stats.level}
        icon={TrendingUp}
        description={`경험치 ${formatNumber(stats.totalXp)} XP`}
      />
      <StatCard
        title="연속 학습"
        value={`${stats.currentStreak}일`}
        icon={Flame}
        description={`최장 ${stats.longestStreak}일`}
      />
      <StatCard
        title="총 풀이 수"
        value={formatNumber(stats.totalProblemsSolved)}
        icon={CheckCircle}
        description="문제"
      />
    </div>
  );
}
