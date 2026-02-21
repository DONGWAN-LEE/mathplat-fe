/** 서버 'connected' 이벤트 페이로드 */
export interface ConnectedPayload {
  socketId: string;
  userId: string;
  rooms: string[];
}

/** 서버 'notification' 이벤트 페이로드 */
export interface NotificationPayload {
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

/** 서버 'force_logout' 이벤트 페이로드 */
export interface ForceLogoutPayload {
  reason: string;
  newDeviceInfo?: {
    deviceType?: string;
    browser?: string;
    ip?: string;
  } | null;
  timestamp: string;
}

/** 서버 'error' 이벤트 페이로드 */
export interface SocketErrorPayload {
  code: string;
  message: string;
}

/**
 * notification.type → 무효화할 TanStack Query 키 매핑
 *
 * 서버에서 특정 타입의 알림이 오면 해당하는 쿼리 캐시를 자동으로 무효화합니다.
 */
export const NOTIFICATION_INVALIDATION_MAP: Record<string, string[][]> = {
  stats_updated: [['user', 'stats']],
  achievement_unlocked: [['achievements', 'me']],
  progress_updated: [['progress', 'list']],
  attempt_graded: [
    ['attempt', 'list'],
    ['user', 'stats'],
  ],
  level_up: [['user', 'stats']],
};
