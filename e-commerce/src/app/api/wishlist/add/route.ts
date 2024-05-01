import Wishlist from "@/app/db/models/wishlist";
import { ObjectId } from "mongodb";

type WishlistRequestBody = {
  userId: string;
  productId: string;
};

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    console.log("🚀 ~ POST ~ userId:", userId);
    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required in headers" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const body: WishlistRequestBody = await request.json();
    console.log("🚀 ~ POST ~ body:", body);
    const { productId } = body;

    if (!productId) {
      return new Response(JSON.stringify({ message: "Product ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const result = await Wishlist.addWishlist(new ObjectId(userId), new ObjectId(productId));

    if (!result) {
      return new Response(JSON.stringify({ message: "Failed to add item to wishlist" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ message: "Item added to wishlist successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
