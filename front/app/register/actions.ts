"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createUser, UserData } from "@/lib/api";
import { registerSchema } from "@/lib/validators/register";
import { z } from "zod";

export async function register(formData: FormData): Promise<UserData> {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const gender = formData.get("gender");
  const age = formData.get("age");
  const email = formData.get("email");
  const password = formData.get("password");

  const validation = registerSchema.safeParse({
    firstName,
    lastName,
    gender,
    age: parseInt(age as string),
    email,
    password,
  });
  if (!validation.success) {
    return { errors: z.flattenError(validation.error).fieldErrors };
  }

  //   const response = await createUser({ email, password });
  //   const cookiesStore = await cookies();
  //   cookiesStore.set("accessToken", response.accessToken, {
  //     httpOnly: true,
  //     secure: true,
  //   });

  redirect("/");
}

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete("accessToken");
  redirect("/");
}
