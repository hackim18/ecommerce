import User from "@/app/db/models/user";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("🚀 ~ POST ~ body:", body);

    await User.register(body);
    return Response.json({ message: "User registered successfully" });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error.message);
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((item) => {
        return item.path[0] + ": " + item.message;
      });
      console.log(JSON.stringify(error.issues, null, 2));
      return Response.json({ error: errorMessages }, { status: 400 });
    } else if (error.message) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
