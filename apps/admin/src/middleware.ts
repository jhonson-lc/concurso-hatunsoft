import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("session", session);

  // if (!session) {
  //   return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_WEB_URL}`, request.url));
  // }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/:path*"],
};
