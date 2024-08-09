import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://"),
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    console.log("User session:", session);

  } else {

    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard"],
};
