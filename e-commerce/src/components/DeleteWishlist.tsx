"use client";

import { deleteWishlist } from "@/app/action";
import Swal from "sweetalert2";

export default function DeleteWishlist({ id }: { id: string }) {
  console.log("🚀 ~ DeleteWishlist ~ id:", id);
  return (
    <>
      <button
        onClick={async () => {
          const result = await deleteWishlist(id);
          if (result) {
            Swal.fire({
              title: "Success",
              text: "Item has been deleted",
              icon: "success",
            });
          }
        }}
        className="btn btn-outline btn-error"
      >
        Delete
      </button>
    </>
  );
}
