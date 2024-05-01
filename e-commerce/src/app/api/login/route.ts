import User from "@/app/db/models/user";
import { comparePassword } from "@/app/utils/bcryptjs";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { createToken } from "../lib/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();
    console.log("🚀 ~ POST ~ body:", body);
    const validation = z.object({ email: z.string().email(), password: z.string().min(5) }).safeParse(body);
    if (!validation.success) {
      throw validation.error;
    }
    const userByEmail = await User.findByEmail(body.email);
    if (!userByEmail) {
      return NextResponse.json(
        {
          message: "Email is not registered",
        },
        {
          status: 401,
        }
      );
    }
    const passwordValidation = comparePassword(body.password, userByEmail.password);
    if (!passwordValidation) {
      return NextResponse.json(
        {
          message: "Password doesn't match",
        },
        {
          status: 401,
        }
      );
    }
    const payload = {
      _id: userByEmail._id,
      email: userByEmail.email,
    };
    const access_token = createToken(payload);
    cookies().set("Authorization", "Bearer " + access_token);
    return NextResponse.json(
      {
        data: {
          access_token,
        },
        message: "Login Successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error,
          message: error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        error: error,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
