"use client";

import { useState, useEffect } from "react";
import WishlistItem from "@/components/WishlistCard";
export const dynamic = "force-dynamic";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist/user-id", {
          cache: "no-cache",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }

    fetchWishlist();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">My Wishlist</h1>
        <div className="grid grid-cols-3 gap-4 justify-center">
          {wishlistItems.map((item, index) => (
            <WishlistItem key={index} item={item} wishlistId={item._id} />
          ))}
        </div>
      </div>
      <div className="mt-4"></div>
    </>
  );
}
