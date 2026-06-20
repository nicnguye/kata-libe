import { cookies } from "next/headers";
import { User } from "@/types/User";
import { env } from "@/lib/env";
import { loginErrors } from "./errors";

type UserLoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string | null;
  message?: string;
};

export async function getToken() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  return accessToken;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(`${env.apiUrl}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function login(
  userLoginData: UserLoginData,
): Promise<LoginResponse> {
  const response = await fetch(`${env.apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLoginData),
  });
  if (!response.ok) {
    const error = await response.json();
    return { message: loginErrors[error.statusCode], accessToken: null };
  }

  return response.json();
}
