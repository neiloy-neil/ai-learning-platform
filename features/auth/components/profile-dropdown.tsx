'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { useAuth } from './auth-provider';

export default function ProfileDropdown() {
  const { logout, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          aria-label="Open profile menu"
          className="flex h-9 min-w-9 items-center justify-center rounded-full bg-primary/20 px-3 text-sm font-semibold text-primary transition-all hover:ring-2 hover:ring-primary/40"
          type="button"
        >
          {user?.name?.charAt(0) ?? 'D'}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuItem>
          <div className="space-y-1">
            <p className="font-semibold">{user?.name ?? 'Demo User'}</p>
            <p className="text-xs text-muted-foreground">{user?.role ?? 'demo'}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem>Demo Settings</DropdownMenuItem>
        <div className="cursor-pointer" onClick={logout}>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
