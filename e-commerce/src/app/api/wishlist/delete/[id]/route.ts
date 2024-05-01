import Wishlist from "@/app/db/models/wishlist";
import { MyResponse } from "@/app/type";
import { NextRequest, NextResponse } from "next/server";

type RequestParams = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, { params }: RequestParams) {
  console.log("🚀 ~ DELETE ~ params:", params);
  try {
    const itemId = params.id;
    const deletedCount = await Wishlist.removeWishlist(itemId);

    if (deletedCount === 1) {
      return NextResponse.json({ message: "Item deleted successfully" });
    } else {
      return NextResponse.json({ message: "Item not found or could not be deleted" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting item from wishlist:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
