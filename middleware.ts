import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - _static (inside /public)
    // - files with extensions (e.g. favicon.ico)
    '/((?!api|_next|_static|.*\\..*).*)',
  ],
};
