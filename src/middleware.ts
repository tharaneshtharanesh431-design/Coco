import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSession } from './lib/auth';

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

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
