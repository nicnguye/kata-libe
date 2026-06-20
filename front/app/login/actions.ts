"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authApi } from "@/lib/api/auth.api";
import { loginSchema } from "@/lib/validators/login";
import { tokenService } from "@/lib/services/token.service";

type State = {
  errors: {
    email?: string[];
  };
  success?: boolean;
  message?: string;
};

export async function userLogin(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return { errors: z.flattenError(validation.error).fieldErrors };
  }

  const response = await authApi.login({ email, password });
  if (!response.accessToken) {
    return { errors: {}, success: false, message: response.message };
  }

  await tokenService.setToken(response.accessToken);

  redirect("/");
}

export async function logout() {
  await tokenService.deleteToken();
  redirect("/");
}
