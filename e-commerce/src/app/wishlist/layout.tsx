import ServerProtectedComponent from "@/components/ServerProtectedComponents";
import { ReactNode } from "react";

export default function WishLayout({ children }: { children: ReactNode }) {
  return <ServerProtectedComponent>{children}</ServerProtectedComponent>;
}
