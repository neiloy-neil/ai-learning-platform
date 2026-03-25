'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/cn';
import { appRoutes } from '@/lib/app-routes';
import { UserRole } from '@/lib/pcdc-types';
import { useAuth } from '@/features/auth/components/auth-provider';

const navItems = {
  [UserRole.STUDENT]: [
    { href: appRoutes.student.dashboard, label: 'Dashboard' },
    { href: appRoutes.student.learningPath, label: 'Learning Path' },
    { href: appRoutes.student.goals, label: 'My Goals' },
    { href: appRoutes.student.practice, label: 'Practice' },
    { href: appRoutes.student.assessments, label: 'Assessments' },
    { href: appRoutes.student.progress, label: 'Progress' },
  ],
  [UserRole.TEACHER]: [
    { href: appRoutes.teacher.dashboard, label: 'Class Dashboard' },
    { href: appRoutes.teacher.messages, label: 'Messages' },
  ],
  [UserRole.PARENT]: [
    { href: appRoutes.parent.dashboard, label: 'My Child\'s Progress' },
    { href: appRoutes.parent.messages, label: 'Messages' },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
}

export default function Sidebar({ isOpen, isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const currentNavItems = user ? navItems[user.role] || [] : [];

  return (
    <aside
      aria-label="Primary navigation"
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-surface p-6 transition-all duration-300 ease-in-out lg:relative',
        isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0 lg:w-20 lg:translate-x-0',
        isCollapsed ? 'lg:w-20' : 'lg:w-64',
      )}
    >
      <div className={cn('mb-10 overflow-hidden text-2xl font-bold', isCollapsed && 'lg:text-center lg:text-xl')}>PCDC</div>
      <nav className="flex flex-col space-y-2">
        {currentNavItems.map((item) => (
          <Link
            className={cn(
              'flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
              pathname.startsWith(item.href) ? 'bg-primary/10 font-semibold text-primary' : 'hover:bg-muted/80',
              isCollapsed && 'lg:justify-center',
            )}
            href={item.href}
            key={item.href}
          >
            <span className={cn(isCollapsed ? 'lg:hidden' : 'lg:inline')}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
