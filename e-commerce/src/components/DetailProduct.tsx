import { Product } from "@/app/type";
import Link from "next/link";

export default function ButtonDetailProduct({ product, className }: { product: Product; className: string }) {
  return (
    <Link href={`/products/${product.slug}`} className={className}>
      Detail
    </Link>
  );
}
