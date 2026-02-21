'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MainLayoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Main layout error:', error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          페이지 오류
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {error.message || '이 페이지에서 오류가 발생했습니다. 다시 시도하거나 대시보드로 이동해 주세요.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            다시 시도
          </Button>
          <Button asChild className="gap-2">
            <Link href="/dashboard">
              <Home className="h-4 w-4" aria-hidden="true" />
              대시보드로 이동
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
