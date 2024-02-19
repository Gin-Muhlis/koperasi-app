import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // cek user sudah login
    const authPages = ["/login", "/register"];

    if (authPages.includes(pathname) && req.nextauth?.token)
      return NextResponse.redirect(new URL(`/${req.nextauth.token?.role}/dashboard`, req.url));

    // cek user belum login
    if ((pathname.startsWith('/super-admin') || pathname.startsWith("/member")) && !req.nextauth?.token)
      return NextResponse.redirect(
        new URL(`/`, req.url)
      );

    // cek role user access
    if (pathname.startsWith("/super-admin") && req.nextauth.token?.role !== 'super-admin')
      return NextResponse.redirect(
        new URL(`/${req.nextauth.token?.role}/dashboard?message=Anda tidak memiliki akses!`, req.url)
      );
    if (pathname.startsWith("/member") && req.nextauth.token?.role !== 'member')
      return NextResponse.redirect(
        new URL(`/${req.nextauth.token?.role}/dashboard?message=Anda tidak memiliki akses!`, req.url)
      );

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true
    },
  },
);

export const config = { matcher: ["/super-admin/:path*", "/member/:path*", "/login", "/register"] };
