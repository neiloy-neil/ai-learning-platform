'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/features/auth/components/auth-provider';
import { getDefaultRouteForRole } from '@/lib/app-routes';

export default function DashboardRouterPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    router.replace(getDefaultRouteForRole(user.role));
  }, [isLoading, router, user]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Skeleton className="h-32 w-1/2" />
    </div>
  );
}
