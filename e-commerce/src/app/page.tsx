import Image from "next/image";
import Link from "next/link";
import banner from "@/image/banner.jpg";
import { AllProduct, Product } from "./type";
import ButtonDetailProduct from "@/components/DetailProduct";
import AddWishlist from "@/components/AddWishlist";
import { fetchAllProducts } from "./action";
import { cookies } from "next/headers";

export default async function Home() {
  cookies().get("Authorization");
  const products = await fetchAllProducts();
  console.log("🚀 ~ Home ~ products:", products);
  const featuredProducts = products.slice(0, 5);
  return (
    <>
      <section className="bg-gray-200">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <Image src={banner} alt="Banner Image" width={80000} height={400} />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Welcome to Our Ecommerce Store!</h2>
            <p className="text-lg text-gray-600">Explore our wide range of products and enjoy great deals!</p>
          </div>
        </div>
      </section>

      <section className="py-1">
        <div className="container mx-auto px-40 py-8">
          <h2 className="text-3xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {featuredProducts.map((product) => {
              return <ProductCard product={product} key={product._id} />;
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/products" className="text-blue-500 hover:underline">
              <div className="md:text-center mt-8">
                <h2 className="text-2xl font-semibold mb-4">See All</h2>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const trimText = (text: string) => {
    if (text.length > 50) {
      return text.slice(0, 50) + "...";
    }
    return text;
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between h-full">
      <figure>
        <img src={product.thumbnail} alt={product.name} />
      </figure>
      <div className="p-4 flex flex-col">
        <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
        <p className="text-gray-600">{trimText(product.description)}</p>
        <span className="font-bold text-xl">${product.price}</span>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex-1 mr-2">
            <ButtonDetailProduct product={product} className="btn btn-outline btn-info w-full" />
          </div>
          {cookies().get("Authorization") ? (
            <div className="flex-1 ml-2">
              <AddWishlist productId={product._id} className="btn btn-outline btn-secondary w-full" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
