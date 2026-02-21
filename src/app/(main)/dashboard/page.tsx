import type { Metadata } from 'next';
import { DashboardPage } from '@/views/dashboard';

export const metadata: Metadata = {
  title: '대시보드',
  description: '학습 현황과 진도를 한눈에 확인하세요',
};

export default function DashboardRoute() {
  return <DashboardPage />;
}
