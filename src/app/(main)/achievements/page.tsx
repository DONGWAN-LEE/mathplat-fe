import type { Metadata } from 'next';
import { AchievementsPage } from '@/views/achievements';

export const metadata: Metadata = {
  title: '업적',
  description: '학습 업적과 레벨 진행 상황을 확인하세요',
};

export default function AchievementsRoute() {
  return <AchievementsPage />;
}
