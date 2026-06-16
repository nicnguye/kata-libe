import { cookies } from "next/headers";

export async function getToken() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  return accessToken;
}

export async function getCurrentUser() {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(`${process.env.API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
