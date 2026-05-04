"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/components/auth-provider";
import { getDefaultRouteForRole } from "@/lib/app-routes";

export default function Page() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(getDefaultRouteForRole(user.role));
    }
  }, [isLoading, router, user]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Skeleton className="h-64 w-full max-w-2xl rounded-3xl" />
    </div>
  );
}
