import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrivyClient } from "@privy-io/server-auth";

export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get("privy-token");

  if (!userToken) {
    request.headers.set("Reason", "Unauthorized");
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const privy = new PrivyClient(
      process.env.APP_ID as string,
      process.env.APP_SECRET as string
    );
    const userClaims = await privy?.verifyAuthToken(userToken?.value);
    if (!userClaims || userClaims.expiration < Date.now() / 1000) {
      request.headers.set("Reason", "Unauthorized,Token Expired");
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    request.headers.set("Reason", "Unauthorized");
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/api/:path((?!products/getProducts||onramp/getSession).*)",
    "/profile/:path*",
  ],
};
