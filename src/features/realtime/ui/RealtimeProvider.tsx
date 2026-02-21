'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { socketManager } from '@/shared/api/socket';
import { useAuthStore } from '@/features/auth';
import type {
  NotificationPayload,
  ForceLogoutPayload,
} from '../model/types';
import { NOTIFICATION_INVALIDATION_MAP } from '../model/types';

/**
 * 실시간 이벤트 리스너 Provider
 *
 * 인증 상태에 따라 소켓 연결을 관리하고,
 * 서버 이벤트(notification, force_logout, error)를 처리합니다.
 * UI를 렌더링하지 않으며 children을 그대로 전달합니다.
 */
export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const listenersAttached = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      socketManager.disconnect();
      listenersAttached.current = false;
      return;
    }

    socketManager.connect();
    const socket = socketManager.getSocket();
    if (!socket || listenersAttached.current) return;
    listenersAttached.current = true;

    function handleConnected() {
      // Connection established; no action needed
    }

    function handleNotification(payload: NotificationPayload) {
      toast(payload.title, { description: payload.message });

      const queryKeys = NOTIFICATION_INVALIDATION_MAP[payload.type];
      if (queryKeys) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    }

    function handleForceLogout(payload: ForceLogoutPayload) {
      socketManager.disconnect();
      logout();
      toast.error('Session terminated', {
        description: payload.reason,
      });
      router.push('/login');
    }

    function handleError() {
      // Auth errors are handled by socket.io reconnection logic
    }

    socket.on('connected', handleConnected);
    socket.on('notification', handleNotification);
    socket.on('force_logout', handleForceLogout);
    socket.on('error', handleError);

    return () => {
      socket.off('connected', handleConnected);
      socket.off('notification', handleNotification);
      socket.off('force_logout', handleForceLogout);
      socket.off('error', handleError);
      listenersAttached.current = false;
    };
  }, [isAuthenticated, logout, queryClient, router]);

  return <>{children}</>;
}
