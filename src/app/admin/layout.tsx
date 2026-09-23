'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Inbox, Users, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/common/Typography';
import { Logo } from '@/components/common/Logo';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
    { name: 'Customers', href: '/admin/customers', icon: Users, disabled: true },
    { name: 'Settings', href: '/admin/settings', icon: Settings, disabled: true },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col md:flex-row font-sans text-teal-950">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-teal-950 text-white p-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Logo variant="compact" theme="emerald" className="w-6 h-6" />
          <Typography variant="label" className="text-emerald-400 m-0">Admin</Typography>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-teal-950/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 h-screen z-50 bg-teal-950 text-white w-72 flex-shrink-0 flex flex-col transition-transform duration-500 ease-cinematic",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-8 pb-12 flex flex-col gap-2 border-b border-teal-900/50">
          <Logo variant="full" theme="emerald" className="w-32 mb-2" />
          <Typography variant="label" className="text-teal-400 opacity-60">Operations Center</Typography>
        </div>

        <nav className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            const Icon = item.icon;
            
            return item.disabled ? (
              <div key={item.name} className="flex items-center gap-4 px-4 py-3 text-teal-800 cursor-not-allowed group">
                <Icon size={20} className="opacity-50" />
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
                <span className="ml-auto text-[9px] uppercase tracking-wider border border-teal-800 px-1.5 py-0.5 rounded opacity-50">Soon</span>
              </div>
            ) : (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "text-emerald-400 bg-teal-900/40" 
                    : "text-teal-100 hover:text-white hover:bg-teal-900/20"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-md"></div>
                )}
                <Icon size={20} className={cn("transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
                
                {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-teal-900/50">
          <button className="flex items-center gap-4 px-4 py-3 w-full text-teal-400 hover:text-emerald-400 hover:bg-teal-900/20 transition-all rounded-md group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none -z-10"></div>
        {children}
      </main>

    </div>
  );
}
