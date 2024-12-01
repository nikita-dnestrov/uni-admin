"use client";

import { LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminToken");
    router.push("/");
  };

  return (
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4 cursor-pointer">
      <LogOut onClick={logout} className="h-5 w-5" />
    </nav>
  );
};
