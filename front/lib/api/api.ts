import { env } from "@/lib/env";

if (!env.apiUrl) {
  throw new Error("API_URL is missing");
}

export async function api(url: string, options?: RequestInit) {
  const response = await fetch(`${env.apiUrl}/${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });
  return response;
}
