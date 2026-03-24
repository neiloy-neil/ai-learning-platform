
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import { cn } from '@/lib/cn';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Desktop sidebar collapse state

  useEffect(() => {
    // Load collapse state from localStorage
    const storedState = localStorage.getItem('sidebarCollapsed');
    if (storedState !== null) {
      setIsSidebarCollapsed(JSON.parse(storedState));
    }
  }, []);

  const toggleSidebarCollapse = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar isOpen={isSidebarOpen} isCollapsed={isSidebarCollapsed} />
      <main className={cn(
        "flex-1 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "lg:ml-[5rem]" : "lg:ml-[16rem]" // Adjust main content margin based on collapse state
        )}>
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} onToggleCollapse={toggleSidebarCollapse} />
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
