"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientFlashComponent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  const messageSplit = errorMessage?.split(",");
  console.log("🚀 ~ ClientFlashComponent ~ messageSplit:", messageSplit);

  useEffect(() => {
    if (messageSplit && messageSplit.length > 0) {
      messageSplit.forEach((message) => {
        toast.error(message.trim());
      });
    }
  }, [messageSplit]);

  return <ToastContainer />;
}
