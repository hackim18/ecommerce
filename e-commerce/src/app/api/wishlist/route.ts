import Wishlist from "@/app/db/models/wishlist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const wishlists = await Wishlist.findAllWishlist();
  return NextResponse.json(wishlists);
}
