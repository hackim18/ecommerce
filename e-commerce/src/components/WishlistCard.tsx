import { Product } from "@/app/type";
import { useEffect, useState } from "react";
import ButtonDetailProduct from "./DetailProduct";
import DeleteWishlist from "./DeleteWishlist";
import { fetchProductsById } from "@/app/action";

type WishlistItemProps = {
  item: {
    productId: string;
    _id: string;
  };
  wishlistId: string;
};

export default function WishlistItem({ item, wishlistId }: WishlistItemProps) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await fetchProductsById(item.productId);
        console.log("🚀 ~ fetchProduct ~ data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [item.productId]);

  if (!product) {
    return (
      <div className="flex justify-center items-center mt-8">
        <span className="loading loading-spinner loading-md"></span>
        <p className="ml-4 text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md justify-self-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={product.thumbnail} alt={product.name} />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.excerpt}</p>
          <div className="card-actions justify-end">
            <ButtonDetailProduct product={product} className="btn btn-outline btn-info" />
            <DeleteWishlist id={wishlistId} />
          </div>
        </div>
      </div>
    </div>
  );
}
