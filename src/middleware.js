import { NextResponse } from "next/server";

const routes = {
  publicRoutes: [
    "/login",
    "/sign-up",
    "/sign-up/patient",
    "/sign-up/doctor",
    "/reset-password",
    "/reset-password/authentication-code",
    "/",
  ],
  patientRoutes: ["/dashboard/patients"],
  doctorRoutes: ["/dashboard/doctor"],
};

// Add paths that should always bypass middleware
const publicPaths = [
  "/images/", // public images
  "/_next/", // next.js resources
  "/api/", // API routes
  "/favicon.ico", // favicon
  "/static/", // static files
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the path should bypass middleware
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  // Handle authentication and redirection
  if (accessToken && routes.publicRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(
        userRole === "CUSTOMER" ? "/dashboard/patients" : "/dashboard/doctor",
        request.url
      )
    );
  }

  const isProtectedRoute = !routes.publicRoutes.includes(pathname);
  if (!accessToken && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  if (accessToken && userRole) {
    if (userRole === "CUSTOMER" && pathname.startsWith("/dashboard/doctor")) {
      return NextResponse.redirect(new URL("/dashboard/patients", request.url));
    }

    if (
      userRole === "CARE_COORDINATOR" &&
      pathname.startsWith("/dashboard/patients")
    ) {
      return NextResponse.redirect(new URL("/dashboard/doctor", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /images
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api|_next|_static|images|favicon.ico|sitemap.xml).*)",
  ],
};

// http://localhost:8080/auth/api/users/679bd539c58c85e24275285a
