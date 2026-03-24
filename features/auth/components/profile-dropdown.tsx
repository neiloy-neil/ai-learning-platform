'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { useAuth } from './auth-provider';

export default function ProfileDropdown() {
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          aria-label="Open profile menu"
          className="h-8 w-8 rounded-full bg-primary/20 transition-all hover:ring-2 hover:ring-primary/40"
          type="button"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <div className="cursor-pointer" onClick={logout}>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
