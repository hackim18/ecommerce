"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AllProduct, Product } from "./type";
import { cookies } from "next/headers";

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function fetchProducts(query: string, page: number, limit: number): Promise<Product[]> {
  let url = process.env.NEXT_PUBLIC_BASE_URL + `/api/products?page=${page}&limit=${limit}`;

  if (query) {
    url += `&search=${query}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function fetchProductsById(id: string): Promise<Product> {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products/id/" + id);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
}

export async function fetchProductsBySlug(slug: string): Promise<Product> {
  console.log("🚀🚀🚀 ~ fetchProductsBySlug ~ slug:", slug);
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products/" + slug);
  console.log("🚀 ~ fetchProductsBySlug ~ res:", res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function fetchWishlistByUserId() {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist/user-id");
  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }
  return response.json();
}

export async function deleteWishlist(id: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist/delete/" + id, {
    method: "DELETE",
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-cache",
  });
  if (res.ok) {
    console.log("🚀 ~ deleteWishlist ~ res:", res);
    revalidatePath("/wishlist");
    redirect("/products");
  }
  return res.ok;
}

export async function deleteProduct(id: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products/" + id, {
    method: "DELETE",
  });
  const result = await res.json();
  if (res.ok) {
    revalidatePath("/products");
  }
  console.log("🚀 ~ deleteProduct ~ result:", result);
}

export async function addWishlist(productId: string) {
  console.log("🚀 ~ addWishlist ~ wishlist:", productId);
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ productId: productId }),
  });
  const result = await res.json();
  if (res.ok) {
    revalidatePath("/products");
    redirect("/wishlist");
  }
  console.log("🚀 ~ addWishlist ~ result:", result);
  return res.ok;
}

export async function logoutServerAction() {
  cookies().get("Authorization") && cookies().delete("Authorization");
  redirect("/login");
}

export async function loginServerAction() {
  redirect("/login");
}

/////
export async function addProduct(product: Product) {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const result = await res.json();
  if (res.ok) {
    revalidatePath("/products");
    redirect("/products");
  }
  console.log("🚀 ~ addProduct ~ result:", result);
}
/////
