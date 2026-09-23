'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/common/Logo';
import { Typography } from '@/components/common/Typography';
import { Menu, X, LayoutDashboard, Inbox, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import LogoutButton from '@/app/portal/LogoutButton';

interface NavProps {
  email: string;
}

export function PortalNavigation({ email }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
    { name: 'Enquiries & Quotes', href: '/portal/enquiries', icon: Inbox },
  ];

  return (
    <nav className="bg-teal-950 border-b border-teal-900/50 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          
          <div className="flex items-center gap-10">
            <Link href="/portal" className="flex items-center gap-3 relative z-50">
              <Logo variant="compact" theme="emerald" className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="font-serif text-white tracking-widest text-lg leading-none">VERDECOCO</span>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-medium italic mt-1">Client Portal</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/portal' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-4 py-2.5 rounded-sm text-sm transition-all duration-300 font-medium flex items-center gap-2",
                      isActive 
                        ? "bg-teal-900/40 text-emerald-400" 
                        : "text-teal-100/70 hover:text-white hover:bg-teal-900/20"
                    )}
                  >
                    <link.icon size={16} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-teal-100/50">
              <User size={16} />
              <span className="text-sm">{email}</span>
            </div>
            <div className="h-4 w-px bg-teal-800"></div>
            <LogoutButton />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-white relative z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-teal-950 z-40 md:hidden transition-transform duration-500 ease-[0.25,1,0.5,1] flex flex-col pt-24 px-6",
        isOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-serif text-white hover:text-emerald-400 transition-colors py-4 border-b border-teal-900/50 flex items-center gap-4"
            >
              <link.icon size={24} className="opacity-50" />
              {link.name}
            </Link>
          ))}
          <div className="pt-8 flex flex-col gap-4">
            <span className="text-teal-100/50 text-sm">{email}</span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
