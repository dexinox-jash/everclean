import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// Protected route patterns
const portalRoutes = ["/portal"];
const adminRoutes = ["/admin"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as UserRole | undefined;

  const isPortalRoute = portalRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Redirect unauthenticated users from portal
  if (isPortalRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/portal/login", nextUrl));
  }

  // Redirect non-admin users from admin routes
  if (isAdminRoute && (!isLoggedIn || (userRole !== "ADMIN" && userRole !== "MANAGER"))) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
