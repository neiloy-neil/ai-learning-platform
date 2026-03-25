'use client';

import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/cn';
import { useAuth } from '@/features/auth/components/auth-provider';
import { getNotificationsForUser } from '@/lib/mocks';

export default function NotificationsPanel() {
  const { user } = useAuth();
  const notifications = useMemo(() => getNotificationsForUser(user?.id), [user?.id]);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="relative" size="sm" variant="ghost">
          <span>Bell</span>
          {unreadCount > 0 && (
            <span className="absolute right-0 top-0 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="border-b p-2 font-semibold">Notifications</div>
        {notifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <div className={cn(!notification.read && 'font-bold')}>{notification.text}</div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
