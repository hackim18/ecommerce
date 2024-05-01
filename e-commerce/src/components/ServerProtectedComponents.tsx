import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ServerProtectedComponent({ children }: { children: React.ReactNode }) {
  const tokenCookie = cookies().get("Authorization");
  if (!tokenCookie) {
    return redirect("/login");
  }
  return children;
}
