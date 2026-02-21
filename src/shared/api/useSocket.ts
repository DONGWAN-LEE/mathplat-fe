'use client';

import { useSyncExternalStore } from 'react';
import type { Socket } from 'socket.io-client';
import { socketManager } from './socket';

function subscribe(callback: () => void) {
  return socketManager.onConnectionChange(callback);
}

function getSnapshot(): boolean {
  return socketManager.isConnected();
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * 소켓 연결 상태를 리액티브하게 추적하는 훅
 *
 * @returns socket 인스턴스와 연결 상태
 */
export function useSocket(): { socket: Socket | null; isConnected: boolean } {
  const isConnected = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    socket: socketManager.getSocket(),
    isConnected,
  };
}
