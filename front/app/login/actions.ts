"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { login } from "@/lib/auth";
import { loginSchema } from "@/lib/validators/login";

type State = {
  errors: {
    email?: string[];
    password?: string[];
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

  try {
    const response = await login({ email, password });
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", response.accessToken, {
      httpOnly: true,
      secure: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return { errors: {}, success: false, message: error.message };
    }
  }
  
  redirect("/");
}

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete("accessToken");
  redirect("/");
}
