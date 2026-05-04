'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem('sidebarCollapsed');
    if (storedState !== null) {
      setIsSidebarCollapsed(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen]);

  const toggleSidebarCollapse = () => {
    const nextState = !isSidebarCollapsed;
    setIsSidebarCollapsed(nextState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(nextState));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar isCollapsed={isSidebarCollapsed} isOpen={isSidebarOpen} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            isSidebarCollapsed={isSidebarCollapsed}
            onMenuClick={() => setIsSidebarOpen((current) => !current)}
            onToggleCollapse={toggleSidebarCollapse}
          />
          <main className="flex-1">
            <div className={cn('mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8')}>
              {children}
            </div>
          </main>
        </div>
      </div>

      {isSidebarOpen ? (
        <button
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      ) : null}
    </div>
  );
}
