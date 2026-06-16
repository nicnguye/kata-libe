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

type UserLoginData = {
  email: string;
  password: string;
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
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

export async function login(userLoginData: UserLoginData): Promise<LoginResponse> {
  const response = await fetch(`${env.apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLoginData),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
}

export async function createUser(userData: UserData) {
  const response = await fetch(`${env.apiUrl}/users`, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}