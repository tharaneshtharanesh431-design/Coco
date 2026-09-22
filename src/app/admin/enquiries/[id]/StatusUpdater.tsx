'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuoteStatus } from '@prisma/client';
import { Button } from '@/components/common/Button';

interface StatusUpdaterProps {
  enquiryId: string;
  currentStatus: QuoteStatus;
}

export function StatusUpdater({ enquiryId, currentStatus }: StatusUpdaterProps) {
  const router = useRouter();
  const [status, setStatus] = useState<QuoteStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statuses: QuoteStatus[] = ['PENDING', 'REVIEWING', 'QUOTED', 'REJECTED'];

  const handleUpdate = async () => {
    if (status === currentStatus) return;
    
    setIsUpdating(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/admin/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to update status');
      }
    } catch (err) {
      setError('An error occurred while updating');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as QuoteStatus)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-teal-900"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      
      <Button 
        onClick={handleUpdate} 
        disabled={status === currentStatus || isUpdating}
        className="px-6 py-2"
      >
        {isUpdating ? 'Updating...' : 'Update Status'}
      </Button>

      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}
