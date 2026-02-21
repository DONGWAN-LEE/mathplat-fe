'use client';

import { BookOpen, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMyProgress } from '@/entities/progress';
import { formatNumber } from '@/shared/lib/format';
import type { LucideIcon } from 'lucide-react';

interface StatItemProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

function StatItem({ title, value, icon: Icon, description }: StatItemProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function ProgressOverview() {
  const { data: progressList, isLoading, error } = useMyProgress();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (error || !progressList) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatItem title="학습한 토픽" value="--" icon={BookOpen} />
        <StatItem title="전체 문제 수" value="--" icon={FileText} />
        <StatItem title="전체 정답 수" value="--" icon={CheckCircle2} />
        <StatItem title="평균 숙달도" value="--" icon={TrendingUp} />
      </div>
    );
  }

  const topicCount = progressList.length;
  const totalSolved = progressList.reduce((s, p) => s + p.problemsSolved, 0);
  const totalCorrect = progressList.reduce((s, p) => s + p.correctCount, 0);
  const avgMastery =
    topicCount > 0
      ? Math.round(
          (progressList.reduce((s, p) => s + p.masteryLevel, 0) / topicCount) *
            100,
        )
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatItem
        title="학습한 토픽"
        value={formatNumber(topicCount)}
        icon={BookOpen}
        description="토픽"
      />
      <StatItem
        title="전체 문제 수"
        value={formatNumber(totalSolved)}
        icon={FileText}
        description="풀이"
      />
      <StatItem
        title="전체 정답 수"
        value={formatNumber(totalCorrect)}
        icon={CheckCircle2}
        description={
          totalSolved > 0
            ? `정답률 ${Math.round((totalCorrect / totalSolved) * 100)}%`
            : undefined
        }
      />
      <StatItem
        title="평균 숙달도"
        value={`${avgMastery}%`}
        icon={TrendingUp}
        description={`${topicCount}개 토픽 기준`}
      />
    </div>
  );
}
