"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createUser } from "@/lib/api";
import { registerSchema } from "@/lib/validators/register";

type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    gender?: string[];
    age?: string[];
    email?: string[];
    password?: string[];
  };
  success?: boolean;
};

export async function register(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const gender = formData.get("gender") as string;
  const age = formData.get("age") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data = {
    firstName,
    lastName,
    gender,
    age: parseInt(age),
    email,
    password,
  };

  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return { errors: z.flattenError(validation.error).fieldErrors };
  }

  await createUser(data);
  return { success: true };
}
