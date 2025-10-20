import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin pages. Allow the verify page and API routes.
  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/verify') return NextResponse.next();
  if (pathname.startsWith('/api/admin')) return NextResponse.next();

  const auth = req.cookies.get('admin_auth')?.value;
  if (auth === '1') return NextResponse.next();

  // Redirect to verify page with the original path as 'next'
  const url = req.nextUrl.clone();
  url.pathname = '/admin/verify';
  url.searchParams.set('next', req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
