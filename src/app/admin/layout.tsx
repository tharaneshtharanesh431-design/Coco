import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-teal-950 text-white flex flex-col pt-16 lg:pt-20">
      {/* Admin specific header to distinguish it from the public site */}
      <header className="bg-teal-900 border-b border-teal-800 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-serif text-xl tracking-wider text-emerald-400">
            VERDECOCO Admin
          </Link>
          <nav className="hidden md:flex gap-6 ml-8">
            <Link href="/admin" className="text-teal-100 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/enquiries" className="text-teal-100 hover:text-white transition-colors">
              Enquiries
            </Link>
          </nav>
        </div>
        <div>
           {/* We can add a logout link/form later if needed */}
        </div>
      </header>

      <div className="flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
}
