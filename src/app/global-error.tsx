'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen items-center justify-center p-6" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <svg className="h-8 w-8" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold">
              문제가 발생했습니다
            </h1>
            <p className="mb-6 text-sm" style={{ color: '#64748b' }}>
              {error.message || '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.'}
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: '#3b82f6' }}
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
