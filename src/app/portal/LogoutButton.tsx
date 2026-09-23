'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/portal/logout', { method: 'POST' });
      router.push('/portal/login');
      router.refresh();
    } catch (error) {
      console.error('Failed to logout', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
    >
      {isLoading ? 'Logging out...' : 'Log out'}
    </button>
  );
}
