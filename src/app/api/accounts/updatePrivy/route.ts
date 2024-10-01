import { PrivyClient } from "@privy-io/server-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const userToken = request.cookies.get("privy-token");

  if (!userToken) {
    request.headers.set("Reason", "Unauthorized");
    return NextResponse.redirect(new URL("/", request.url));
  }
  const privy = new PrivyClient(
    process.env.APP_ID as string,
    process.env.APP_SECRET as string
  );
  const userClaims = await privy.verifyAuthToken(userToken?.value);
  console.log(userClaims);
  if (!userClaims || userClaims.expiration < Date.now() / 1000) {
    request.headers.set("Reason", "Unauthorized,Token Expired");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const responses: any[] = [];

  const name = request.headers.get("name");
  const email = request.headers.get("email");
  const dob = request.headers.get("dob");
  const inputs = [name, email, dob];
  const res = await privy.setCustomMetadata(userClaims.userId, {
    name: name as string,
    email: email as string,
    dob: dob as string,
  });
  console.log(res);

  return NextResponse.json({ responses }, { status: 200 });
}
