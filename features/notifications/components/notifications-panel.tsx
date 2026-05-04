'use client';

import { Bell, CheckCheck, Inbox } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/cn';
import { useAuth } from '@/features/auth/components/auth-provider';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function NotificationsPanel() {
  const { user } = useAuth();
  const { archiveNotification, getNotifications, markNotificationRead } = useDemoData();
  const notifications = getNotifications(user?.id);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button aria-label="Open notifications" className="relative h-10 w-10 rounded-2xl border border-border/70 bg-surface p-0 shadow-sm hover:bg-muted/70" size="sm" variant="ghost">
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px]">
        <div className="border-b border-border/70 px-4 py-3">
          <p className="font-semibold text-foreground">Notifications</p>
          <p className="text-xs text-muted-foreground">{unreadCount} unread updates in the current demo session.</p>
        </div>
        {notifications.length === 0 ? (
          <DropdownMenuItem>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Inbox className="size-4" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">No new notifications</p>
                <p className="text-xs text-muted-foreground">Role-specific updates will appear here as the demo state changes.</p>
              </div>
            </div>
          </DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <div className="space-y-3">
                <div className={cn('text-sm leading-6', !notification.read && 'font-semibold text-foreground')}>
                  {notification.text}
                </div>
                <div className="flex gap-2">
                  {!notification.read ? (
                    <Button size="sm" variant="secondary" onClick={() => markNotificationRead(notification.id)}>
                      <CheckCheck className="size-4" />
                      Mark read
                    </Button>
                  ) : null}
                  <Button size="sm" variant="ghost" onClick={() => archiveNotification(notification.id)}>
                    Archive
                  </Button>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
