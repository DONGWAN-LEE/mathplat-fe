'use client';

import { ProgressOverview } from '@/widgets/progress-overview';
import { ProgressChart } from '@/widgets/progress-chart';

export function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">학습 진도</h1>
        <p className="text-muted-foreground">
          토픽별 학습 진도를 확인하세요.
        </p>
      </div>
      <ProgressOverview />
      <ProgressChart />
    </div>
  );
}
