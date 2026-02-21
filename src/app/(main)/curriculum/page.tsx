import type { Metadata } from 'next';
import { CurriculumListPage } from '@/views/curriculum';

export const metadata: Metadata = {
  title: '교육과정',
  description: '수학 교육과정을 단원별로 탐색하세요',
};

export default function CurriculumRoute() {
  return <CurriculumListPage />;
}
