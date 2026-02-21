'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useProblemDetail, problemTypeLabel } from '@/entities/problem';
import { ProblemSolver } from '@/widgets/problem-solver';

interface ProblemSolvePageProps {
  id: string;
}

export function ProblemSolvePage({ id }: ProblemSolvePageProps) {
  const { data: problem, isLoading, error } = useProblemDetail(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[200px] rounded-xl" />
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="space-y-4">
        <Link
          href="/problems"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          문제 목록
        </Link>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
          {error ? '문제를 불러오는 중 오류가 발생했습니다.' : '문제를 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/problems">문제 풀기</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/problems?type=${problem.type}`}>
                {problemTypeLabel(problem.type)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>문제 풀이</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProblemSolver problem={problem} />
    </div>
  );
}
