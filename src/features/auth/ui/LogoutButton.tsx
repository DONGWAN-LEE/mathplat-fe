'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../model/auth.store';
import { logout as logoutApi } from '../api/auth.api';

export function LogoutButton() {
  const router = useRouter();
  const logoutStore = useAuthStore((s) => s.logout);

  async function handleLogout() {
    try {
      await logoutApi();
    } catch {
      // proceed with local logout even if API fails
    } finally {
      logoutStore();
      router.push('/login');
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-2 text-sm"
    >
      <LogOut className="h-4 w-4" />
      로그아웃
    </button>
  );
}
