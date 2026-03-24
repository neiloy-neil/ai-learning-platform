
'use client';

import React, { useState } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import { cn } from '@/lib/cn';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar isOpen={isSidebarOpen} />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
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
