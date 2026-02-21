import type { ProblemType } from '../model/types';

export function problemTypeLabel(type: ProblemType): string {
  const labels: Record<ProblemType, string> = {
    MULTIPLE_CHOICE: '객관식',
    SHORT_ANSWER: '단답형',
    ESSAY: '서술형',
    TRUE_FALSE: '참/거짓',
    FILL_IN_BLANK: '빈칸 채우기',
  };
  return labels[type] ?? type;
}

export function difficultyLabel(difficulty: number): string {
  if (difficulty <= 3) return '쉬움';
  if (difficulty <= 6) return '보통';
  if (difficulty <= 8) return '어려움';
  return '최상';
}

export function difficultyColor(difficulty: number): string {
  if (difficulty <= 3) return 'text-green-600';
  if (difficulty <= 6) return 'text-yellow-600';
  if (difficulty <= 8) return 'text-orange-600';
  return 'text-red-600';
}
