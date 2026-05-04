"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/cn";
import { AuthProvider } from "@/features/auth/components/auth-provider";
import { DemoDataProvider } from "@/features/demo/components/demo-data-provider";
import LegacyServiceWorkerCleanup from "@/components/layout/legacy-service-worker-cleanup";

type AppProvidersProps = {
  children: ReactNode;
  className?: string;
};

export function AppProviders({ children, className }: AppProvidersProps) {
  return (
    <div className={cn(className)}>
      <AuthProvider>
        <DemoDataProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LegacyServiceWorkerCleanup />
            {children}
          </ThemeProvider>
        </DemoDataProvider>
      </AuthProvider>
    </div>
  );
}
