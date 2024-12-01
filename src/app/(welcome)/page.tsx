"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { welcomePageApiService } from "./api";
import { useCallback } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  type Inputs = {
    email: string;
    password: string;
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
    const response = await welcomePageApiService.login(data);
    localStorage.setItem("adminToken", response.adminToken);
    localStorage.setItem("adminId", response.adminId);
    router.push("/products");
  }, []);

  return (
    <div className="w-full h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col items-center justify-center h-full">
        <div>
          <Label htmlFor="email">Email {errors.email && <span className="text-red-500">*</span>}</Label>
          <Input {...register("email", { required: true })} />
        </div>
        <div>
          <Label htmlFor="password">Password {errors.password && <span className="text-red-500">*</span>}</Label>
          <Input type="password" {...register("password", { required: true })} />
        </div>
        <Button className="w-fit" variant="default" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
