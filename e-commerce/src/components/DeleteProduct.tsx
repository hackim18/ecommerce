"use client";

import { deleteProduct } from "@/app/action";

export default function DeleteProduct({ id }: { id: string }) {
  return (
    <>
      <button
        onClick={() => {
          deleteProduct(id);
        }}
        className="btn btn-warning"
      >
        Delete
      </button>
    </>
  );
}
