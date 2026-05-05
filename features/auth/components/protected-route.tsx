
'use client';

import { useAuth } from './auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProtectedRoute({ children, role }: { children: React.ReactNode, role: string }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
    if (!isLoading && user && user.role !== role) {
      router.replace('/unauthorized');
    }
  }, [isLoading, user, router, role]);

  if (isLoading || !user) {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Skeleton className="w-1/2 h-64" />
        </div>
    );
  }

  if (user.role !== role) {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <p>Unauthorized</p>
        </div>
    );
  }

  return <>{children}</>;
}
