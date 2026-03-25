"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/cn";
import { AuthProvider } from "@/features/auth/components/auth-provider";
import { DemoDataProvider } from "@/features/demo/components/demo-data-provider";

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
            {children}
          </ThemeProvider>
        </DemoDataProvider>
      </AuthProvider>
    </div>
  );
}
