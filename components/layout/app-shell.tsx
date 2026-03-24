import type { HTMLAttributes, ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/cn";

type AppShellProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export function AppShell({ children, className, ...props }: AppShellProps) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden bg-grid-fade", className)} {...props}>
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgb(37_99_235_/_0.14),_transparent_48%),radial-gradient(circle_at_20%_20%,_rgb(124_58_237_/_0.12),_transparent_28%)]" />
      <div className="relative z-10 flex min-h-screen">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col transition-all duration-300 ease-out">
          <SiteHeader className="pl-16 lg:pl-0" />
          <main className="relative z-10 flex-1 px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
