'use client';

import Link from 'next/link';
import { Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import type { Problem } from '@/entities/problem';
import { problemTypeLabel, difficultyLabel, difficultyColor } from '@/entities/problem';
import type { PaginatedMeta } from '@/shared/api';
import { formatNumber } from '@/shared/lib/format';

interface ProblemListProps {
  items: Problem[];
  meta?: PaginatedMeta;
  onPageChange: (page: number) => void;
}

function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link href={`/problems/${problem.id}`}>
      <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-2 text-sm font-medium leading-snug">
              {problem.content}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Badge variant="secondary" className="text-xs">
              {problemTypeLabel(problem.type)}
            </Badge>
            <Badge variant="outline" className={`text-xs ${difficultyColor(problem.difficulty)}`}>
              난이도 {problem.difficulty} · {difficultyLabel(problem.difficulty)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5" />
              정답률 {problem.correctRate}%
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {problem.estimatedTime}분
            </span>
            <span>{formatNumber(problem.solveCount)}명 풀이</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function getPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [1];
  if (currentPage > 3) pages.push('ellipsis');
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (currentPage < totalPages - 2) pages.push('ellipsis');
  pages.push(totalPages);
  return pages;
}

export function ProblemList({ items, meta, onPageChange }: ProblemListProps) {
  const currentPage = meta?.page ?? 1;
  const totalPages = meta?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {getPageNumbers(currentPage, totalPages).map((page, i) =>
              page === 'ellipsis' ? (
                <PaginationItem key={`e-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => onPageChange(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
