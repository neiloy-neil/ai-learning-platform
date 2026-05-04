import { LayoutGrid, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import Breadcrumbs from './breadcrumbs';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import NotificationsPanel from '@/features/notifications/components/notifications-panel';
import ProfileDropdown from '@/features/auth/components/profile-dropdown';

interface NavbarProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void;
  isSidebarCollapsed: boolean;
}

export default function Navbar({ onMenuClick, onToggleCollapse, isSidebarCollapsed }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Button aria-label="Open navigation menu" className="lg:hidden" onClick={onMenuClick} size="sm" variant="secondary">
            <Menu className="size-4" />
          </Button>
          <Button
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:inline-flex"
            onClick={onToggleCollapse}
            size="sm"
            variant="secondary"
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </Button>
          <div className="hidden min-w-0 items-center gap-3 md:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LayoutGrid className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">Dashboard Workspace</p>
              <Breadcrumbs />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <NotificationsPanel />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
