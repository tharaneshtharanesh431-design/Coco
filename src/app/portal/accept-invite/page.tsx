import { Suspense } from 'react';
import AcceptInviteForm from './AcceptInviteForm';

export const dynamic = 'force-dynamic';

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const token = typeof resolvedParams.token === 'string' ? resolvedParams.token : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-teal-900">
          Accept Invitation
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Set up your VERDECOCO Customer Portal account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!token ? (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">
                Invalid invitation link. No token provided.
              </p>
            </div>
          ) : (
            <AcceptInviteForm token={token} />
          )}
        </div>
      </div>
    </div>
  );
}
