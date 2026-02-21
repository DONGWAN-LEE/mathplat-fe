import type { Metadata } from 'next';
import { ProblemListPage } from '@/views/problems';

export const metadata: Metadata = {
  title: '문제 풀기',
  description: '수학 문제를 풀고 실력을 향상시키세요',
};

export default function ProblemsRoute() {
  return <ProblemListPage />;
}
