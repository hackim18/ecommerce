import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/db/models/products";

type RequestParams = {
  params: {
    slug: string;
  };
};

export async function GET(request: NextRequest, { params }: RequestParams) {
  const { slug } = params;

  try {
    const product = await Product.findBySlug(slug);
    console.log("🚀 ~ GET ~ product:", product);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
