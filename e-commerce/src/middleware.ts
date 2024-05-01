import { NextResponse, type NextRequest } from "next/server";
import { readPayloadJose } from "./app/api/lib/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    //   return NextResponse.redirect(new URL("/home", request.url));
    console.log("🚀 ~ middleware ~ request:", request.url);
    const tokenCookie = request.cookies.get("Authorization");
    console.log("🚀 ~ middleware ~ tokenCookie:", tokenCookie);
    if (!tokenCookie) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }
    const [type, token] = tokenCookie.value.split(" ");
    console.log("🚀 ~ middleware ~ type:", type, token);
    if (type !== "Bearer") {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    const decoded = await readPayloadJose<{ _id: string; email: string }>(token);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded._id);
    requestHeaders.set("x-user-email", decoded.email);

    return NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
  } catch (error: any) {
    console.log(error);
    if (error.name === "JWSInvalid") {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/products/:path*",
  // matcher: "/api/products/:path*",
  // matcher: "/api/wishlist/delete/:path*",
  matcher: "/api/wishlist/:path*",
};
