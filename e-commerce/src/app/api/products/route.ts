import Product from "@/app/db/models/products";
import { MyResponse } from "@/app/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") || "";
    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    console.log("🚀 ~ GET ~ searchQuery:", { search: search, page: page, limit: limit });

    const products = await Product.findAllProducts(page, limit, search);

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
