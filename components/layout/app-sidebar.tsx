"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronLeft, ChevronRight, ClipboardList, LayoutDashboard, Menu, PenTool } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

type AppSidebarProps = {
  className?: string;
};

type NavItem = {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/learning-path", icon: BookOpen, label: "Learning Path" },
  { href: "/practice", icon: PenTool, label: "Practice" },
  { href: "/assessments", icon: ClipboardList, label: "Assessments" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Button
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        className="fixed left-4 top-4 z-50 lg:hidden"
        variant="secondary"
        onClick={() => setMobileOpen((current) => !current)}
      >
        <Menu className="size-4" />
      </Button>

      <div
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-30 bg-background/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-glass-stroke bg-glass-strong px-4 py-5 shadow-floating backdrop-blur-2xl transition-all duration-300 ease-out lg:sticky lg:translate-x-0",
          collapsed ? "lg:w-24" : "lg:w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "w-72",
          className,
        )}
      >
        <div className="flex items-center justify-between gap-3 px-2">
          <Link className="flex min-w-0 items-center gap-3" href="/" onClick={() => setMobileOpen(false)}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-dashboard-gradient text-sm font-semibold text-white shadow-glow">
              AI
            </div>
            <div className={cn("min-w-0 transition-all duration-300", collapsed ? "hidden lg:hidden" : "block")}>
              <p className="truncate text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Platform</p>
              <p className="truncate text-base font-semibold text-foreground">Learning Hub</p>
            </div>
          </Link>

          <Button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden px-3 lg:inline-flex"
            variant="ghost"
            onClick={() => setCollapsed((current) => !current)}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>

        <div className="mt-8 flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-dashboard-gradient text-white shadow-glow"
                    : "text-muted-foreground hover:bg-surface/70 hover:text-foreground",
                  collapsed && "lg:justify-center",
                )}
                href={item.href}
                key={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn("size-5 shrink-0 transition-transform duration-200", !active && "group-hover:scale-105")} />
                <span className={cn("transition-all duration-200", collapsed ? "lg:hidden" : "block")}>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-glass-stroke bg-surface/50 p-3 shadow-panel">
          <div className={cn("flex items-center justify-between gap-3", collapsed && "lg:justify-center")}>
            <div className={cn(collapsed ? "lg:hidden" : "block")}>
              <p className="text-sm font-semibold text-foreground">Display</p>
              <p className="text-xs text-muted-foreground">Theme controls</p>
            </div>
            <ThemeToggle className="px-3" />
          </div>
        </div>
      </aside>
    </>
  );
}
