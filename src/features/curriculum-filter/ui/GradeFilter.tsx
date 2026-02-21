'use client';

import type { CurriculumListParams } from '@/entities/curriculum';

const GRADE_GROUPS = [
  { label: '초등', grades: [1, 2, 3, 4, 5, 6] },
  { label: '중등', grades: [7, 8, 9] },
  { label: '고등', grades: [10, 11, 12] },
] as const;

function gradeLabel(grade: number): string {
  if (grade <= 6) return `초${grade}`;
  if (grade <= 9) return `중${grade - 6}`;
  return `고${grade - 9}`;
}

interface GradeFilterProps {
  value: CurriculumListParams;
  onChange: (params: CurriculumListParams) => void;
}

export function GradeFilter({ value, onChange }: GradeFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">학년</span>
        <select
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          value={value.grade ?? ''}
          onChange={(e) =>
            onChange({
              ...value,
              grade: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        >
          <option value="">전체</option>
          {GRADE_GROUPS.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.grades.map((g) => (
                <option key={g} value={g}>
                  {gradeLabel(g)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">학기</span>
        <select
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          value={value.semester ?? ''}
          onChange={(e) =>
            onChange({
              ...value,
              semester: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        >
          <option value="">전체</option>
          <option value="1">1학기</option>
          <option value="2">2학기</option>
        </select>
      </div>
    </div>
  );
}
