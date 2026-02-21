import type { MasteryLevel } from '../model/types';

export function getMasteryLevel(level: number): MasteryLevel {
  if (level >= 0.8) return 'master';
  if (level >= 0.6) return 'advanced';
  if (level >= 0.4) return 'proficient';
  if (level >= 0.2) return 'learning';
  return 'beginner';
}

export function masteryLabel(level: MasteryLevel): string {
  const labels: Record<MasteryLevel, string> = {
    beginner: '초급',
    learning: '학습중',
    proficient: '숙련',
    advanced: '고급',
    master: '마스터',
  };
  return labels[level];
}

export function masteryColor(level: MasteryLevel): string {
  const colors: Record<MasteryLevel, string> = {
    beginner: 'bg-gray-500',
    learning: 'bg-blue-500',
    proficient: 'bg-green-500',
    advanced: 'bg-purple-500',
    master: 'bg-amber-500',
  };
  return colors[level];
}

export function masteryBadgeVariant(
  level: MasteryLevel,
): 'secondary' | 'default' | 'outline' | 'destructive' {
  if (level === 'master') return 'default';
  if (level === 'advanced') return 'default';
  if (level === 'proficient') return 'secondary';
  return 'outline';
}
