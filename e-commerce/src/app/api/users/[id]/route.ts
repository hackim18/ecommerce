import User from "@/app/db/models/user";
import { MyResponse } from "@/app/type";
import { NextResponse } from "next/server";

type RequestParams = {
  params: {
    id: string;
  };
};
export async function GET(request: Request, { params }: RequestParams) {
  const user = await User.findById(params.id);
  if (!user) {
    return NextResponse.json<MyResponse>({ error: ["User not found"] }, { status: 404 });
  }
  return NextResponse.json<MyResponse<User>>({ data: user });
}
