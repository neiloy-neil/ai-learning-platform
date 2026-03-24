"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/cn";
import { AuthProvider } from "@/features/auth/components/auth-provider";

type AppProvidersProps = {
  children: ReactNode;
  className?: string;
};

export function AppProviders({ children, className }: AppProvidersProps) {
  return (
    <div className={cn(className)}>
        <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </AuthProvider>
    </div>
  );
}
