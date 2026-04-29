import { NextResponse } from 'next/server';

export function middleware(request) {
  // Middleware runs in Edge Runtime - can't run cron jobs here
  // Cron scheduler runs from API routes instead
  return NextResponse.next();
}

// Only run middleware on specific paths to avoid excessive calls
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}