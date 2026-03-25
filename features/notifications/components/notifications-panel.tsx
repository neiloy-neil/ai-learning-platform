'use client';

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
        <Button aria-label="Open notifications" className="relative" size="sm" variant="ghost">
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
          <DropdownMenuItem>
            <div className="space-y-1">
              <p className="font-semibold">No new notifications</p>
              <p className="text-xs text-muted-foreground">Role-specific updates will appear here as the demo state changes.</p>
            </div>
          </DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <div className="space-y-2">
                <div className={cn('text-sm', !notification.read && 'font-bold')}>{notification.text}</div>
                <div className="flex gap-2">
                  {!notification.read ? (
                    <Button size="sm" variant="secondary" onClick={() => markNotificationRead(notification.id)}>
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
