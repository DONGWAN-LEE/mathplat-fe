import type { Metadata } from 'next';
import { ProgressPage } from '@/views/progress';

export const metadata: Metadata = {
  title: '학습 진도',
  description: '토픽별 학습 진도와 숙달도를 확인하세요',
};

export default function ProgressRoute() {
  return <ProgressPage />;
}
