
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-surface border-b border-border flex-shrink-0">
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Button variant="ghost" size="sm" onClick={onMenuClick}>
          Menu
        </Button>
      </div>
      
      {/* Spacer to push the right content */}
      <div className="hidden lg:flex flex-1"></div>

      {/* Right side content */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {/* Notifications placeholder */}
        <Button variant="ghost" size="sm">Alerts</Button>
        {/* User profile placeholder */}
        <div className="w-8 h-8 rounded-full bg-primary/20"></div>
      </div>
    </header>
  );
}
