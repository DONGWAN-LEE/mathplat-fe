import type { Metadata } from 'next';
import { LoginPage } from '@/views/login';

export const metadata: Metadata = {
  title: '로그인',
  description: 'MathPlat에 로그인하여 학습을 시작하세요',
};

export default function LoginRoute() {
  return <LoginPage />;
}
