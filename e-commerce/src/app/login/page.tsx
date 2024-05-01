import Link from "next/link";
import { MyResponse } from "../type";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClientFlashComponent from "@/components/ClientFlashComponent";

export default function Login() {
  async function loginServerAction(formData: FormData) {
    "use server";

    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("🚀 ~ loginServerAction ~ rawFormData:", rawFormData);
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/login", {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
    });
    const result = (await response.json()) as MyResponse<{
      access_token: string;
    }>;
    if (!response.ok) {
      redirect("/login?error=" + result.message);
    }
    if (result.data) {
      cookies().set("Authorization", "Bearer " + result.data.access_token);
    }
    return redirect("/");
  }

  return (
    <>
      <ClientFlashComponent />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">Login Your Account</h2>
          <form className="space-y-4" action={loginServerAction}>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input name="email" type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input name="password" type="password" className="grow" placeholder="password" />
            </label>
            <div className="text-gray-600">
              Don't have an account?{" "}
              <Link href={"/register"} className="text-blue-500">
                Registers here
              </Link>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-outline btn-info">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
