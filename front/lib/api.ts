import { env } from "@/lib/env";

if (!env.apiUrl) {
  throw new Error("API_URL is missing");
}

type Offer = {
  id: string;
  title: string;
  description: string;
  advantage: string;
  price: number;
};

export async function getOffer(id: string): Promise<Offer> {
  const response = await fetch(`${env.apiUrl}/offers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch offer");
  }

  return response.json();
}

export async function getOffers(): Promise<Offer[]> {
  const response = await fetch(`${env.apiUrl}/offers`);

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  return response.json();
}
