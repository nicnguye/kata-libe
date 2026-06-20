import { cookies } from "next/headers";

async function getToken() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  return accessToken;
}

async function setToken(token: string) {
  const cookiesStore = await cookies();
  cookiesStore.set("accessToken", token, {
    httpOnly: true,
    secure: true,
  });

  return token;
}

async function deleteToken() {
  const cookiesStore = await cookies();
  cookiesStore.delete("accessToken");
}

export const tokenService = {
  getToken,
  setToken,
  deleteToken,
};
