import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSession } from './lib/auth';
import { verifyCustomerSession } from './lib/customer-auth';

export async function middleware(request: NextRequest) {
  // Only protect /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const session = await verifyAdminSession(request);
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect /api/admin routes (except /api/admin/login)
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (request.nextUrl.pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    const session = await verifyAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Protect /portal routes (except /portal/login and /portal/accept-invite)
  if (request.nextUrl.pathname.startsWith('/portal')) {
    const publicPortalRoutes = ['/portal/login', '/portal/accept-invite'];
    if (publicPortalRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    const session = await verifyCustomerSession(request);
    if (!session) {
      return NextResponse.redirect(new URL('/portal/login', request.url));
    }
  }

  // Protect /api/portal routes (except /api/portal/login and /api/portal/accept-invite)
  if (request.nextUrl.pathname.startsWith('/api/portal')) {
    const publicApiPortalRoutes = ['/api/portal/login', '/api/portal/accept-invite'];
    if (publicApiPortalRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    const session = await verifyCustomerSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/portal/:path*', '/api/portal/:path*'],
};
