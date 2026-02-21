'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ProblemType, problemTypeLabel } from '@/entities/problem';
import type { ProblemFilterParams } from '@/entities/problem';

interface ProblemFilterProps {
  value: ProblemFilterParams;
  onChange: (params: ProblemFilterParams) => void;
}

const PROBLEM_TYPES = Object.values(ProblemType);
const DIFFICULTY_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export function ProblemFilter({ value, onChange }: ProblemFilterProps) {
  const hasFilter = value.type || value.difficultyMin || value.difficultyMax;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground shrink-0">유형</span>
        <Select
          value={value.type ?? 'ALL'}
          onValueChange={(v) =>
            onChange({ ...value, type: v === 'ALL' ? undefined : (v as ProblemType), page: 1 })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">전체</SelectItem>
            {PROBLEM_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {problemTypeLabel(t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground shrink-0">난이도</span>
        <Select
          value={value.difficultyMin != null ? String(value.difficultyMin) : 'ALL'}
          onValueChange={(v) =>
            onChange({ ...value, difficultyMin: v === 'ALL' ? undefined : Number(v), page: 1 })
          }
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="최소" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">최소</SelectItem>
            {DIFFICULTY_OPTIONS.map((d) => (
              <SelectItem key={d} value={String(d)}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">~</span>
        <Select
          value={value.difficultyMax != null ? String(value.difficultyMax) : 'ALL'}
          onValueChange={(v) =>
            onChange({ ...value, difficultyMax: v === 'ALL' ? undefined : Number(v), page: 1 })
          }
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="최대" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">최대</SelectItem>
            {DIFFICULTY_OPTIONS.map((d) => (
              <SelectItem key={d} value={String(d)}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilter && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange({ page: 1 })}
        >
          초기화
        </Button>
      )}
    </div>
  );
}
