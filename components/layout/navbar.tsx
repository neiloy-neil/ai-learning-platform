
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import NotificationsPanel from "@/features/notifications/components/notifications-panel";
import ProfileDropdown from "@/features/auth/components/profile-dropdown";
import Breadcrumbs from "./breadcrumbs";

interface NavbarProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void; // New prop for toggling desktop sidebar
}

export default function Navbar({ onMenuClick, onToggleCollapse }: NavbarProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-surface border-b border-border flex-shrink-0">
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button variant="ghost" size="sm" onClick={onMenuClick}>
            Menu
          </Button>
        </div>
        {/* Desktop Sidebar Toggle Button */}
        <div className="hidden lg:block">
          <Button variant="ghost" size="sm" onClick={onToggleCollapse}>
            Toggle Sidebar
          </Button>
        </div>
        <Breadcrumbs />
      </div>

      {/* Right side content */}
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <NotificationsPanel />
        <ProfileDropdown />
      </div>
    </header>
  );
}
