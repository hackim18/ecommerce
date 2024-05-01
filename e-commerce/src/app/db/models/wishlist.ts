import { WishlistItem } from "@/app/type";
import { db } from "../config";
import { ObjectId } from "mongodb";

export default class Wishlist {
  static wishlistCollection() {
    return db.collection<WishlistItem>("wishlist");
  }

  static async findAllWishlist() {
    return await this.wishlistCollection().find().toArray();
  }

  static async removeWishlist(itemId: string) {
    const result = await this.wishlistCollection().deleteOne({ _id: new ObjectId(itemId) });
    return result.deletedCount;
  }

  static async addWishlist(userId: ObjectId, productId: ObjectId) {
    try {
      const newItem: WishlistItem = {
        _id: new ObjectId(),
        userId: userId,
        productId: productId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await this.wishlistCollection().insertOne(newItem);
      return result.insertedId !== undefined;
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      return false;
    }
  }

  static async findWishlistByUserId(userId: ObjectId) {
    return await this.wishlistCollection()
      .find({ userId: new ObjectId(userId) })
      .toArray();
  }
}
