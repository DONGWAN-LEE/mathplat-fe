import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { label: '교육과정', href: '/curriculum', icon: BookOpen },
  { label: '문제풀이', href: '/problems', icon: FileQuestion },
  { label: '학습진도', href: '/progress', icon: TrendingUp },
  { label: '업적', href: '/achievements', icon: Trophy },
];
