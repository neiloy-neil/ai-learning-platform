
'use client';

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mock data for navigation
const navItems = [
  { href: "/student/dashboard", label: "Dashboard" },
  { href: "/student/learning-path", label: "Learning Path" },
  { href: "/student/practice", label: "Practice" },
  { href: "/student/assessments", label: "Assessments" },
  { href: "/student/progress", label: "Progress" },
];

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 bg-surface border-r border-border p-6 flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="text-2xl font-bold mb-10">PCDC</div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "bg-primary/10 text-primary font-semibold"
                : "hover:bg-muted/80"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
