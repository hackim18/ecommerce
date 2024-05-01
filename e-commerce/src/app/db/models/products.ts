import { ObjectId } from "mongodb";
import { db } from "../config";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(10),
  price: z.number().positive(),
});

type ProductType = z.infer<typeof productSchema>;

export default class Product {
  static productCollection() {
    return db.collection<ProductType>("products");
  }

  static async findAllProducts(page: number, limit: number, search: string) {
    const pipeline = [];

    if (search) {
      const regex = new RegExp(search, "i");
      pipeline.push({ $match: { name: { $regex: regex } } });
    }

    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    return await this.productCollection().aggregate(pipeline).toArray();
  }

  static async findProductById(_id: string) {
    return await this.productCollection().findOne({ _id: new ObjectId(_id) });
  }

  static async searchProducts(searchQuery: string) {
    const regex = new RegExp(searchQuery, "i");
    return await this.productCollection()
      .find({
        $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
      })
      .toArray();
  }

  static async findBySlug(slug: string) {
    return await this.productCollection().findOne({ slug });
  }

  static async findPaginatedProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const products = await this.productCollection().find().skip(skip).limit(limit).toArray();
    return products;
  }
}
