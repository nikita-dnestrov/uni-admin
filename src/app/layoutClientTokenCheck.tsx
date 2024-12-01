"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ClientTokenChecker = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  return null;
};
