import Wishlist from "@/app/db/models/wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  console.log("🚀 ~ GET ~ userId:", userId);
  if (!userId) {
    return NextResponse.json({ message: "User ID is missing" }, { status: 400 });
  }

  try {
    const wishlists = await Wishlist.findWishlistByUserId(new ObjectId(userId));
    return NextResponse.json(wishlists);
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
