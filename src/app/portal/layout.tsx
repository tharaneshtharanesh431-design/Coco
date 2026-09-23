import React from 'react';
import { getCustomerSession } from '@/lib/customer-auth';
import { PortalNavigation } from '@/components/layout/PortalNavigation';

export default async function CustomerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCustomerSession();

  // If there is no session (e.g. login page, accept-invite page), render just the content without navigation
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col font-sans">
      <PortalNavigation email={session.email} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
        {children}
      </main>
    </div>
  );
}
