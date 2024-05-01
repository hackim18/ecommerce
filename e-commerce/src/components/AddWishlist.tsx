"use client";
import { addWishlist } from "@/app/action";
import Swal from "sweetalert2";

export default function AddWishlist({ productId, className }: { productId: string; className: string }) {
  const handleAddWishlist = async () => {
    try {
      const result = await addWishlist(productId);
      Swal.fire({
        title: "Success!",
        text: "The product has been added to the wishlist",
        icon: "success",
      });
      if (result) {
      }
      console.log("Product added to wishlist successfully!");
    } catch (error) {
      console.error("Failed to add product to wishlist:", error);
    }
  };

  return (
    <>
      <button onClick={handleAddWishlist} className={className}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
    </>
  );
}
