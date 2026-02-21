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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurriculumDetail, gradeLabel } from '@/entities/curriculum';
import { CurriculumTree } from '@/widgets/curriculum-tree';

interface CurriculumDetailPageProps {
  id: string;
}

export function CurriculumDetailPage({ id }: CurriculumDetailPageProps) {
  const { data: curriculum, isLoading, error } = useCurriculumDetail(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    );
  }

  if (error || !curriculum) {
    return (
      <div className="space-y-4">
        <Link
          href="/curriculum"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          교육과정 목록
        </Link>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
          {error ? '교육과정을 불러오는 중 오류가 발생했습니다.' : '교육과정을 찾을 수 없습니다.'}
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
              <Link href="/curriculum">교육과정</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/curriculum?grade=${curriculum.grade}&semester=${curriculum.semester}`}>
                {gradeLabel(curriculum.grade)} {curriculum.semester}학기
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{curriculum.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">{curriculum.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{gradeLabel(curriculum.grade)}</Badge>
          <Badge variant="outline">{curriculum.semester}학기</Badge>
          {curriculum.subject && (
            <Badge variant="outline">{curriculum.subject}</Badge>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <h2 className="text-lg font-semibold">교육과정 구조</h2>
        </CardHeader>
        <CardContent>
          <CurriculumTree curriculum={curriculum} />
        </CardContent>
      </Card>
    </div>
  );
}
