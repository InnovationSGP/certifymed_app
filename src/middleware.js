import { NextResponse } from "next/server";

const routes = {
  publicRoutes: ["/login", "/sign-up", "/reset-password", "/"],
  patientRoutes: ["/dashboard/patients"],
  doctorRoutes: ["/dashboard/doctor"],
};

export function middleware(request) {
  console.log(request.nextUrl, "request.nextUrl");

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

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
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
