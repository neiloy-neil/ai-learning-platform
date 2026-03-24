
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { UserRole } from '@/lib/pcdc-types';
import { Skeleton } from '@/components/ui/skeleton';

// This page acts as a router, redirecting users to their specific dashboard based on their role.
export default function DashboardRouterPage() {
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndRedirect() {
      try {
        // In a real app, this would be a protected route and the user would be from a session.
        // We call our mock API to get the current "logged in" user.
        const res = await fetch('/api/auth/me');
        if (!res.ok) throw new Error('Not authenticated');
        
        const user = await res.json();

        // Redirect based on role
        switch (user.role) {
          case UserRole.STUDENT:
            router.replace('/student/dashboard');
            break;
          case UserRole.TEACHER:
            router.replace('/teacher/dashboard');
            break;
          case UserRole.PARENT:
            router.replace('/parent/dashboard');
            break;
          default:
            // Redirect to a generic page or login if role is unknown
            router.replace('/login');
            break;
        }
      } catch (error) {
        console.error(error);
        router.replace('/login');
      }
    }

    fetchUserAndRedirect();
  }, [router]);

  // Render a full-page skeleton while redirecting
  return (
    <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-1/2 h-32" />
    </div>
  );
}
