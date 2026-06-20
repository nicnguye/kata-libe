import { api } from "@/lib/api/api";
import { registerErrors } from "@/lib/errors";

type UserData = {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  email: string;
  password: string;
};

async function createUser(userData: UserData) {
  const response = await api('users', {
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    return { success: false, message: registerErrors[error?.statusCode] || "Inscription échoué" };
  }

  return { success: true, message: "Inscris avec succès" };
}

export const userApi = {
  createUser,
};
