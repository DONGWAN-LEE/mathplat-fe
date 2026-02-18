'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/features/auth';
import { decodeJwt } from '@/features/auth';

export function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken || !refreshToken) {
      router.replace('/login');
      return;
    }

    const payload = decodeJwt(accessToken);
    if (!payload) {
      router.replace('/login');
      return;
    }

    setAuth(
      {
        id: payload.sub,
        email: payload.email,
        name: payload.email.split('@')[0],
      },
      accessToken,
      refreshToken,
    );

    router.replace('/dashboard');
  }, [searchParams, setAuth, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">로그인 처리 중...</p>
      </div>
    </div>
  );
}
