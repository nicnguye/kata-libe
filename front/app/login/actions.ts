"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login, LoginResponse } from "@/lib/api";

export async function userLogin(formData: FormData): Promise<LoginResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Invalid form data");
  }

  const response = await login({ email, password });
  const cookiesStore = await cookies();
  cookiesStore.set("accessToken", response.accessToken, {
    httpOnly: true,
    secure: true,
  });

  redirect("/");
}

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete("accessToken");
  redirect("/");
}
