'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurriculumList, gradeLabel } from '@/entities/curriculum';
import type { CurriculumListParams, Curriculum } from '@/entities/curriculum';
import { GradeFilter } from '@/features/curriculum-filter';

function CurriculumCard({ curriculum }: { curriculum: Curriculum }) {
  const chapterCount = curriculum.chapters?.length ?? 0;

  return (
    <Link href={`/curriculum/${curriculum.id}`}>
      <Card className="transition-colors hover:border-primary/50 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base">{curriculum.name}</CardTitle>
            <BookOpen className="h-5 w-5 shrink-0 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{gradeLabel(curriculum.grade)}</Badge>
            <Badge variant="outline">{curriculum.semester}학기</Badge>
            {curriculum.subject && (
              <Badge variant="outline">{curriculum.subject}</Badge>
            )}
          </div>
          {chapterCount > 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              {chapterCount}개 챕터
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

function parseInitialParams(searchParams: URLSearchParams): CurriculumListParams {
  const grade = searchParams.get('grade');
  const semester = searchParams.get('semester');
  return {
    grade: grade ? Number(grade) : undefined,
    semester: semester ? Number(semester) : undefined,
  };
}

export function CurriculumListPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<CurriculumListParams>(() =>
    parseInitialParams(searchParams),
  );
  const { data: curricula, isLoading, error } = useCurriculumList(params);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">교육과정</h1>
        <p className="text-muted-foreground">
          학년과 학기별 교육과정을 확인하고 학습 내용을 살펴보세요.
        </p>
      </div>

      <GradeFilter value={params} onChange={setParams} />

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[160px] rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
          교육과정을 불러오는 중 오류가 발생했습니다.
        </div>
      )}

      {!isLoading && !error && curricula && curricula.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          해당 조건의 교육과정이 없습니다.
        </div>
      )}

      {!isLoading && !error && curricula && curricula.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curricula.map((c) => (
            <CurriculumCard key={c.id} curriculum={c} />
          ))}
        </div>
      )}
    </div>
  );
}
