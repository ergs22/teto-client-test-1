import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/" || path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }

  // solo sale de seccion si me voy a login REVISAR ESTO AMBOS
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // if (!isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/verifyemail", request.nextUrl));
  // }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/chat"],
};
