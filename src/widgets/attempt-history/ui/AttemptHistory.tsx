'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useMyAttempts } from '@/entities/attempt';
import { problemTypeLabel } from '@/entities/problem';
import { formatDate } from '@/shared/lib/format';

interface AttemptHistoryProps {
  limit?: number;
  compact?: boolean;
  showViewAll?: boolean;
}

function HistoryHeader({ showViewAll }: { showViewAll?: boolean }) {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" aria-hidden="true" />
          <h2 className="text-lg font-semibold">최근 풀이 이력</h2>
        </div>
        {showViewAll && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/problems" className="gap-1">
              전체 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </CardHeader>
  );
}

export function AttemptHistory({
  limit = 10,
  compact = false,
  showViewAll = false,
}: AttemptHistoryProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useMyAttempts({ page, limit });
  const router = useRouter();

  if (isLoading) {
    return (
      <Card>
        <HistoryHeader />
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: Math.min(limit, 5) }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <HistoryHeader />
        <CardContent>
          <p className="text-sm text-muted-foreground">풀이 이력을 불러오지 못했습니다.</p>
        </CardContent>
      </Card>
    );
  }

  const items = data?.items ?? [];
  const meta = data?.meta;

  if (items.length === 0) {
    return (
      <Card>
        <HistoryHeader />
        <CardContent>
          <p className="text-sm text-muted-foreground">아직 풀이 이력이 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  const handleRowClick = (problemId: string) => {
    router.push(`/problems/${problemId}`);
  };

  return (
    <Card>
      <HistoryHeader showViewAll={showViewAll} />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead className="w-20">유형</TableHead>
              <TableHead>문제</TableHead>
              <TableHead className="w-20">결과</TableHead>
              <TableHead className="w-20 text-right">소요시간</TableHead>
              <TableHead className="w-28 text-right">제출일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={item.id}
                tabIndex={0}
                role="link"
                className="cursor-pointer"
                onClick={() => handleRowClick(item.problemId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRowClick(item.problemId);
                  }
                }}
              >
                <TableCell className="font-medium text-muted-foreground">
                  {(page - 1) * limit + index + 1}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {problemTypeLabel(item.problem.type)}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {item.problem.content}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.isCorrect === true
                        ? 'default'
                        : item.isCorrect === false
                          ? 'destructive'
                          : 'secondary'
                    }
                    className="text-xs"
                  >
                    {item.isCorrect === true
                      ? '정답'
                      : item.isCorrect === false
                        ? '오답'
                        : '채점 중'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {item.timeTaken}초
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatDate(item.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!compact && meta && meta.totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-disabled={page <= 1}
                    className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-3 text-sm text-muted-foreground">
                    {page} / {meta.totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                    aria-disabled={page >= meta.totalPages}
                    className={page >= meta.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
