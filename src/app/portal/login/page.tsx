import { redirect } from 'next/navigation';
import { getCustomerSession } from '@/lib/customer-auth';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function CustomerLoginPage() {
  const session = await getCustomerSession();
  
  if (session) {
    redirect('/portal');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-teal-900">
          Customer Portal Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
