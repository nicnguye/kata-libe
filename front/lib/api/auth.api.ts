import { api } from "@/lib/api/api";
import { User } from "@/types/User";
import { loginErrors } from "@/lib/errors";
import { tokenService } from "@/lib/services/token.service";

type UserLoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string | null;
  message?: string;
};

async function getCurrentUser(): Promise<User | null> {
  const token = await tokenService.getToken();

  if (!token) {
    return null;
  }

  const response = await api("auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function login(userLoginData: UserLoginData): Promise<LoginResponse> {
  const response = await api("auth/login", {
    method: "POST",
    body: JSON.stringify(userLoginData),
  });

  if (!response.ok) {
    const error = await response.json();
    return { message: loginErrors[error.statusCode], accessToken: null };
  }

  return response.json();
}

export const authApi = {
  login,
  getCurrentUser,
};
