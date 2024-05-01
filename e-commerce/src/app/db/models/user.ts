import { ObjectId } from "mongodb";
import { db } from "../config";
import bcryptjs from "bcryptjs";
import { z } from "zod";

// type UserType = {
//   _id: ObjectId;
//   name: string;
//   username: string;
//   email: string;
//   password: string;
// };
// type NewUserInput = Omit<UserType, "_id">;

const userSchema = z.object({
  name: z.string().min(5),
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
});

type UserType = z.infer<typeof userSchema>;

export default class User {
  static userCollection() {
    return db.collection<UserType>("users");
  }

  static async findAllUsers() {
    return await this.userCollection().find().toArray();
  }

  static async findById(_id: string) {
    return await this.userCollection().findOne({ _id: new ObjectId(_id) });
  }

  static async findByEmail(email: string) {
    return await this.userCollection().findOne({ email });
  }

  static async isUsernameUnique(username: string) {
    const existingUser = await this.userCollection().findOne({ username });
    console.log("🚀 ~ User ~ isUsernameUnique ~ existingUser:", existingUser);
    return !existingUser;
  }

  static async isEmailUnique(email: string) {
    const existingUser = await this.userCollection().findOne({ email });
    console.log("🚀 ~ User ~ isEmailUnique ~ existingUser:", existingUser);
    return !existingUser;
  }

  static async register(newUser: UserType) {
    const isUsernameUnique = await this.isUsernameUnique(newUser.username);
    if (!isUsernameUnique) {
      throw new Error("Username already exists");
    }

    const isEmailUnique = await this.isEmailUnique(newUser.email);
    if (!isEmailUnique) {
      throw new Error("Email already exists");
    }

    const newUserParsed = userSchema.parse(newUser);
    console.log("🚀 ~ User ~ create ~ newUserParsed:", newUserParsed);
    return await this.userCollection().insertOne({
      ...newUserParsed,
      _id: new ObjectId(),
      password: await bcryptjs.hash(newUserParsed.password, 10),
    });
  }
}
