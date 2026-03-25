'use client';

import { LogOut, Settings, UserCircle2 } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { useAuth } from './auth-provider';

export default function ProfileDropdown() {
  const { logout, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          aria-label="Open profile menu"
          className="flex h-10 min-w-10 items-center justify-center rounded-2xl border border-border/70 bg-surface px-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-muted/70"
          type="button"
        >
          {user?.name?.charAt(0) ?? 'D'}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuItem>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserCircle2 className="size-5" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{user?.name ?? 'Demo User'}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{user?.role ?? 'demo'}</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <UserCircle2 className="size-4" />
            Account
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <Settings className="size-4" />
            Demo Settings
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={logout}>
          <div className="flex items-center gap-2 text-danger">
            <LogOut className="size-4" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
