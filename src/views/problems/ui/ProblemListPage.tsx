'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useProblemList, ProblemType } from '@/entities/problem';
import type { ProblemFilterParams } from '@/entities/problem';
import { ProblemFilter } from '@/features/problem-filter';
import { ProblemList } from '@/widgets/problem-list';

function parseInitialParams(searchParams: URLSearchParams): ProblemFilterParams {
  const type = searchParams.get('type');
  const difficultyMin = searchParams.get('difficultyMin');
  const difficultyMax = searchParams.get('difficultyMax');
  const page = searchParams.get('page');
  return {
    type: type && Object.values(ProblemType).includes(type as ProblemType)
      ? (type as ProblemType)
      : undefined,
    difficultyMin: difficultyMin ? Number(difficultyMin) : undefined,
    difficultyMax: difficultyMax ? Number(difficultyMax) : undefined,
    page: page ? Number(page) : undefined,
  };
}

export function ProblemListPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<ProblemFilterParams>(() =>
    parseInitialParams(searchParams),
  );
  const { data, isLoading, error } = useProblemList(params);

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">문제 풀기</h1>
        <p className="text-muted-foreground">
          다양한 유형의 수학 문제를 풀어보세요. 난이도와 유형으로 필터링할 수 있습니다.
        </p>
      </div>

      <ProblemFilter value={params} onChange={setParams} />

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[140px] rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
          문제 목록을 불러오는 중 오류가 발생했습니다.
        </div>
      )}

      {!isLoading && !error && data && data.items.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          해당 조건의 문제가 없습니다.
        </div>
      )}

      {!isLoading && !error && data && data.items.length > 0 && (
        <ProblemList
          items={data.items}
          meta={data.meta}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
