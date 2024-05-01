import User from "@/app/db/models/user";
import { MyResponse } from "@/app/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");
  console.log("🚀 ~ GET ~ search:", search);
  const users = await User.findAllUsers();

  return NextResponse.json<MyResponse<User[]>>({ data: users });
}
