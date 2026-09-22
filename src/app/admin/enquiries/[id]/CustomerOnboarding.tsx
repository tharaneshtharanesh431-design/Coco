'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';

interface CustomerOnboardingProps {
  enquiryId: string;
  hasCompany: boolean;
}

export function CustomerOnboarding({ enquiryId, hasCompany }: CustomerOnboardingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCreateCustomer = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/enquiries/${enquiryId}/create-customer`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Customer account created and invitation sent!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create customer account' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  if (hasCompany) {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-4 rounded-md">
        <p className="text-sm font-medium">Customer Account has already been created for this enquiry.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-6">
      <h3 className="text-lg font-serif text-teal-900 mb-2">Onboarding</h3>
      <p className="text-sm text-gray-600 mb-4">
        Create a secure customer portal account for this client. They will receive an email with a one-time link to set their password and access their account.
      </p>
      <Button
        onClick={handleCreateCustomer}
        disabled={isLoading}
        className="w-full sm:w-auto"
      >
        {isLoading ? 'Processing...' : 'Create Customer Account & Send Invite'}
      </Button>

      {message && (
        <div
          className={`mt-4 p-3 rounded text-sm font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
