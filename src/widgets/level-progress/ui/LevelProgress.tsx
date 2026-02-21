'use client';

import { Zap, Star, Flame, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useMyStats } from '@/entities/user';
import { formatNumber } from '@/shared/lib/format';
import type { LucideIcon } from 'lucide-react';

interface StatItemProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  children?: React.ReactNode;
}

function StatItem({ title, value, icon: Icon, description, children }: StatItemProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

export function LevelProgress() {
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
        <StatItem title="레벨" value="--" icon={Zap} />
        <StatItem title="총 XP" value="--" icon={Star} />
        <StatItem title="연속 학습일" value="--" icon={Flame} />
        <StatItem title="총 풀이 수" value="--" icon={Target} />
      </div>
    );
  }

  const xpForNextLevel = 100;
  const currentLevelXp = stats.totalXp % xpForNextLevel;
  const xpPercent = Math.round((currentLevelXp / xpForNextLevel) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatItem
        title="레벨"
        value={`Lv. ${stats.level}`}
        icon={Zap}
        description={`다음 레벨까지 ${xpForNextLevel - currentLevelXp} XP`}
      >
        <Progress
          value={xpPercent}
          className="mt-2 h-1.5"
          aria-label={`다음 레벨까지 ${xpPercent}% 진행`}
        />
      </StatItem>
      <StatItem
        title="총 XP"
        value={formatNumber(stats.totalXp)}
        icon={Star}
        description="경험치"
      />
      <StatItem
        title="연속 학습일"
        value={`${formatNumber(stats.currentStreak)}일`}
        icon={Flame}
        description={`최장 ${formatNumber(stats.longestStreak)}일`}
      />
      <StatItem
        title="총 풀이 수"
        value={formatNumber(stats.totalProblemsSolved)}
        icon={Target}
        description="문제"
      />
    </div>
  );
}
