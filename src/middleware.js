import { NextResponse } from 'next/server';

// Define routes for public, patient, and doctor access
const routes = {
    publicRoutes: [
        '/login',
        '/sign-up',
        '/sign-up/patient',
        '/sign-up/doctor',
        '/reset-password',
        '/reset-password/authentication-code',
        '/'
    ],
    patientRoutes: ['/dashboard/patients'], // Only accessible by CUSTOMER
    doctorRoutes: ['/dashboard/doctor'] // Only accessible by CARE_COORDINATOR
};

// Paths that should always bypass middleware (public assets, API routes, etc.)
const publicPaths = [
    '/images/', // Public images
    '/_next/', // Next.js internal resources
    '/api/', // API routes
    '/favicon.ico', // Favicon
    '/static/' // Static files
];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if the path should bypass middleware (public paths)
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Retrieve access token and user role from cookies
    const accessToken = request.cookies.get('jwt')?.value;
    const userRole = request.cookies.get('userRole')?.value;

    // Redirect authenticated users away from public routes
    if (accessToken && routes.publicRoutes.includes(pathname)) {
        return NextResponse.redirect(
            new URL(
                userRole === 'USER'
                    ? '/dashboard/patients'
                    : '/dashboard/doctor',
                request.url
            )
        );
    }

    // Redirect unauthenticated users away from protected routes
    const isProtectedRoute = !routes.publicRoutes.includes(pathname);
    if (!accessToken && isProtectedRoute) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Role-based access control
    if (accessToken && userRole) {
        // CUSTOMER cannot access doctor routes
        if (
            userRole === 'USER' &&
            routes.doctorRoutes.some((route) => pathname.startsWith(route))
        ) {
            return NextResponse.redirect(
                new URL('/dashboard/patients', request.url)
            );
        }

        // CARE_COORDINATOR cannot access patient routes
        if (
            userRole === 'CARE_COORDINATOR' &&
            routes.patientRoutes.some((route) => pathname.startsWith(route))
        ) {
            return NextResponse.redirect(
                new URL('/dashboard/doctor', request.url)
            );
        }
    }

    // Allow access to the requested route
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|_static|images|favicon.ico|sitemap.xml).*)']
};