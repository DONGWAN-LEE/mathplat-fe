import { io, Socket } from 'socket.io-client';
import { env } from '@/shared/config/env';

type ConnectionChangeListener = (connected: boolean) => void;

/**
 * Socket.io 클라이언트 싱글턴 매니저
 *
 * 인증 토큰 기반 WebSocket 연결을 관리합니다.
 * 매 재연결 시 localStorage에서 최신 토큰을 읽어 인증합니다.
 */
class SocketManager {
  private socket: Socket | null = null;
  private listeners = new Set<ConnectionChangeListener>();

  /** 소켓 연결을 시작합니다 */
  connect(): void {
    if (typeof window === 'undefined') return;
    if (this.socket?.connected) return;

    if (this.socket) {
      this.socket.connect();
      return;
    }

    this.socket = io(env.apiUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ['websocket', 'polling'],
      auth: () => {
        const token = this.getToken();
        return token ? { token } : {};
      },
    });

    this.socket.on('connect', () => {
      this.notifyListeners(true);
    });

    this.socket.on('disconnect', () => {
      this.notifyListeners(false);
    });
  }

  /** 소켓 연결을 해제합니다 */
  disconnect(): void {
    if (!this.socket) return;
    this.socket.removeAllListeners();
    this.socket.disconnect();
    this.socket = null;
    this.notifyListeners(false);
  }

  /** 현재 소켓 인스턴스를 반환합니다 */
  getSocket(): Socket | null {
    return this.socket;
  }

  /** 연결 상태를 반환합니다 */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /** 연결 상태 변경 리스너를 등록합니다. 해제 함수를 반환합니다. */
  onConnectionChange(listener: ConnectionChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(connected: boolean): void {
    this.listeners.forEach((fn) => fn(connected));
  }

  private getToken(): string | null {
    try {
      const stored = localStorage.getItem('auth-storage');
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return parsed?.state?.accessToken ?? null;
    } catch {
      return null;
    }
  }
}

export const socketManager = new SocketManager();
