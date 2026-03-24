"use client";

import Link from "next/link";
import { Bell, ChevronDown, Settings, User } from "lucide-react";
import { useState, type HTMLAttributes } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

type SiteHeaderProps = HTMLAttributes<HTMLElement> & {
  className?: string;
};

const profileLinks = [
  { href: "/student", label: "Profile", icon: User },
  { href: "/teacher", label: "Workspace", icon: Settings },
] as const;

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-20 px-6 py-4 lg:px-8", className)} {...props}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-glass-stroke bg-glass px-4 py-3 shadow-panel backdrop-blur-xl lg:px-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Premium SaaS workspace</p>
          <h1 className="truncate text-lg font-semibold text-foreground">Mastery Dashboard</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Notifications"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-glass-stroke bg-surface/55 text-muted-foreground shadow-panel transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground hover:shadow-floating focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            type="button"
          >
            <Bell className="size-4" />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-dashboard-gradient" />
          </button>

          <ThemeToggle className="px-3" />

          <div className="relative">
            <button
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-3 rounded-2xl border border-glass-stroke bg-surface/55 px-3 py-2 shadow-panel transition-all duration-200 hover:-translate-y-0.5 hover:shadow-floating focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-dashboard-gradient text-sm font-semibold text-white shadow-glow">
                NN
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-foreground">Neiloy N.</p>
                <p className="text-xs text-muted-foreground">Product owner</p>
              </div>
              <ChevronDown className={cn("size-4 text-muted-foreground transition-transform duration-200", menuOpen && "rotate-180")} />
            </button>

            <div
              className={cn(
                "absolute right-0 mt-3 w-60 rounded-2xl border border-glass-stroke bg-glass-strong p-2 shadow-floating backdrop-blur-2xl transition-all duration-200",
                menuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
              )}
              role="menu"
            >
              <div className="border-b border-glass-stroke px-3 pb-3 pt-2">
                <p className="text-sm font-semibold text-foreground">Neiloy N.</p>
                <p className="text-xs text-muted-foreground">neiloy@example.com</p>
              </div>
              <div className="py-2">
                {profileLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-surface/70 hover:text-foreground"
                      href={item.href}
                      key={item.label}
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
