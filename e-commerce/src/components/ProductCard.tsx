import { Product } from "@/app/type";
import ButtonDetailProduct from "./DetailProduct";
import AddWishlist from "./AddWishlist";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const trimText = (text: string) => {
    if (text.length > 150) {
      return text.slice(0, 150) + "...";
    }
    return text;
  };

  return (
    <div className="max-w-md justify-self-center" key={product._id}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={product.thumbnail} alt={product.name} />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <p>{trimText(product.description)}</p>
          <div className="card-actions flex justify-between">
            <ButtonDetailProduct product={product} className="btn btn-outline btn-info" />
            <AddWishlist productId={product._id} className="btn btn-outline btn-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
