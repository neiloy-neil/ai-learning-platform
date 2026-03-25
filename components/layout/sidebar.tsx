'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  Bot,
  CalendarClock,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

import { cn } from '@/lib/cn';
import { appRoutes } from '@/lib/app-routes';
import { UserRole } from '@/lib/pcdc-types';
import { useAuth } from '@/features/auth/components/auth-provider';

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const navItems: Record<UserRole, NavItem[]> = {
  [UserRole.STUDENT]: [
    { href: appRoutes.student.dashboard, label: 'Dashboard', icon: LayoutDashboard },
    { href: appRoutes.student.aiTutor, label: 'AI Tutor', icon: Bot },
    { href: appRoutes.student.practice, label: 'Practice', icon: GraduationCap },
    { href: appRoutes.student.assessments, label: 'Assessments', icon: BarChart3 },
    { href: appRoutes.student.revision, label: 'Revision', icon: ClipboardCheck },
    { href: appRoutes.student.studyPlan, label: 'Study Plan', icon: CalendarClock },
    { href: appRoutes.student.learningPath, label: 'Learning Path', icon: BookOpen },
    { href: appRoutes.student.goals, label: 'Goals', icon: Target },
    { href: appRoutes.student.progress, label: 'Progress', icon: LineChart },
  ],
  [UserRole.TEACHER]: [
    { href: appRoutes.teacher.dashboard, label: 'Dashboard', icon: LayoutDashboard },
    { href: appRoutes.teacher.classes, label: 'Classes', icon: Users },
    { href: appRoutes.teacher.assignments, label: 'Assignments', icon: FileText },
    { href: appRoutes.teacher.review, label: 'Review', icon: ClipboardCheck },
    { href: appRoutes.teacher.analytics, label: 'Analytics', icon: LineChart },
    { href: appRoutes.teacher.aiTools, label: 'AI Tools', icon: Sparkles },
    { href: appRoutes.teacher.messages, label: 'Messages', icon: MessageSquare },
  ],
  [UserRole.PARENT]: [
    { href: appRoutes.parent.dashboard, label: 'Dashboard', icon: LayoutDashboard },
    { href: appRoutes.parent.children, label: 'Children', icon: Users },
    { href: appRoutes.parent.reports, label: 'Reports', icon: FileText },
    { href: appRoutes.parent.alerts, label: 'Alerts', icon: ShieldAlert },
    { href: appRoutes.parent.messages, label: 'Messages', icon: MessageSquare },
    { href: appRoutes.parent.supportTips, label: 'Support Tips', icon: Sparkles },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
}

export default function Sidebar({ isOpen, isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const currentNavItems = user ? navItems[user.role] ?? [] : [];

  return (
    <aside
      aria-label="Primary navigation"
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-border/80 bg-surface/95 px-4 py-5 shadow-floating backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0',
        isCollapsed ? 'lg:w-[92px]' : 'lg:w-[280px]',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      <div className={cn('mb-8 flex items-center gap-3 px-2', isCollapsed && 'lg:justify-center')}>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-dashboard-gradient text-white shadow-glow">
          <GraduationCap className="size-5" />
        </div>
        <div className={cn(isCollapsed && 'lg:hidden')}>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Demo</p>
          <p className="text-lg font-semibold text-foreground">AI Learning</p>
        </div>
      </div>

      {user ? (
        <div className={cn('mb-6 rounded-3xl border border-border/70 bg-muted/50 p-4', isCollapsed && 'lg:hidden')}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{user.role}</p>
          <p className="mt-2 text-base font-semibold text-foreground">{user.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
      ) : null}

      <nav className="flex flex-1 flex-col gap-2">
        {currentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              className={cn(
                'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
                isCollapsed && 'lg:justify-center',
              )}
              href={item.href}
              key={item.href}
            >
              <Icon className="size-4 shrink-0" />
              <span className={cn(isCollapsed && 'lg:hidden')}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={cn('rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 to-secondary/10 p-4', isCollapsed && 'lg:hidden')}>
        <p className="text-sm font-semibold text-foreground">Client demo branch</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Shared mock state drives the student, teacher, and parent walkthroughs.
        </p>
      </div>
    </aside>
  );
}
