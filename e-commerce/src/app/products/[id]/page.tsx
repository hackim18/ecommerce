import { fetchProductsBySlug } from "@/app/action";
import { Product } from "@/app/type";
import AddWishlist from "@/components/AddWishlist";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  console.log("🚀 ~ generateMetadata ~ params:", params);
  const slug = params.id;
  console.log("🚀 ~ generateMetadata ~ slug:", slug);

  const product = await fetchProductsBySlug(slug);
  console.log("🚀 ~ generateMetadata ~ product:", product);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "E-Commerce - " + product.name,
    description: product.description,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

type ProductDetailProps = {
  params: {
    id: string;
    slug: string;
  };
};

export default async function ProductDetail({ params }: ProductDetailProps) {
  console.log("🚀-- ~ ProductDetail ~ params:", params);
  const product = await fetchProductsBySlug(params.id);

  return (
    <div className="container mx-auto px-40 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.thumbnail} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.excerpt}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">${product.price}</p>
          <div className="mb-4">
            {product.tags.map((tag, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm mr-2">
                {tag}
              </span>
            ))}
          </div>
          <div style={{ width: "100px" }}>
            <AddWishlist productId={product._id} className="btn btn-outline btn-info w-full" />
          </div>
        </div>
      </div>
      <div className="md:text-center mt-8">
        <h2 className="text-2xl font-semibold mb-4">Product Gallery</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg" />
        ))}
      </div>
    </div>
  );
}
