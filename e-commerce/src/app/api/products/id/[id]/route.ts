import Product from "@/app/db/models/products";
import { NextResponse } from "next/server";

type RequestParams = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RequestParams) {
  const { id } = params;

  try {
    const product = await Product.findProductById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
