import { ObjectId } from "mongodb";

export type Product = {
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export type WishlistItem = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type AllProduct = {
  data: Product[];
};

export type MyResponse<T = null> = {
  data?: T;
  error?: string[];
  message?: string;
};
