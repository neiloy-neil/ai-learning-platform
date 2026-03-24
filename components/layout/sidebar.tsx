
'use client';

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User, UserRole } from "@/lib/pcdc-types";

// Role-specific navigation items
const navItems = {
  [UserRole.STUDENT]: [
    { href: "/student/dashboard", label: "Dashboard" },
    { href: "/student/learning-path", label: "Learning Path" },
    { href: "/student/goals", label: "My Goals" },
    { href: "/student/practice", label: "Practice" },
    { href: "/student/assessments", label: "Assessments" },
    { href: "/student/progress", label: "Progress" },
  ],
  [UserRole.TEACHER]: [
    { href: "/teacher/dashboard", label: "Class Dashboard" },
    // { href: "/teacher/students", label: "Students" },
    // { href: "/teacher/assessments", label: "Assessments" },
  ],
  [UserRole.PARENT]: [
    { href: "/parent/dashboard", label: "My Child's Progress" },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
}

export default function Sidebar({ isOpen, isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // A simple way to get the role. In a real app, this would come from a global session context.
    async function fetchUser() {
        // This is a mock way to determine the role from the URL for testing
        const currentRole = pathname.split('/')[1] as UserRole;
        if(Object.values(UserRole).includes(currentRole)) {
            const res = await fetch(`/api/auth/me?role=${currentRole}`);
            setUser(await res.json());
        } else {
            // Fallback for non-dashboard pages
            const res = await fetch(`/api/auth/me`);
            setUser(await res.json());
        }
    }
    fetchUser();
  }, [pathname]);

  const currentNavItems = user ? navItems[user.role] || [] : [];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 bg-surface border-r border-border p-6 flex flex-col transition-all duration-300 ease-in-out lg:relative",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0 lg:w-20 lg:translate-x-0", // Mobile and desktop collapse
        isCollapsed ? "lg:w-20" : "lg:w-64", // Desktop collapse
        "flex" // Ensure flex properties are always applied
      )}
    >
      <div className={cn("text-2xl font-bold mb-10 overflow-hidden", isCollapsed && "lg:text-xl lg:text-center")}>PCDC</div>
      <nav className="flex flex-col space-y-2">
        {currentNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center",
              pathname.startsWith(item.href)
                ? "bg-primary/10 text-primary font-semibold"
                : "hover:bg-muted/80",
              isCollapsed && "lg:justify-center"
            )}
          >
            <span className={cn(isCollapsed ? "lg:hidden" : "lg:inline")}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
