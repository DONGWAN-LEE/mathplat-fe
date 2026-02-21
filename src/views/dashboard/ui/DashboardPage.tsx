'use client';

import { useAuthStore } from '@/features/auth';
import { StatsOverview } from '@/widgets/dashboard-stats';
import { AttemptHistory } from '@/widgets/attempt-history';

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {user ? `${user.name}님, 환영합니다!` : '대시보드'}
        </h1>
        <p className="text-muted-foreground">
          오늘도 수학 학습을 시작해 볼까요?
        </p>
      </div>
      <StatsOverview />
      <AttemptHistory compact limit={5} showViewAll />
    </div>
  );
}
