import { env } from "@/lib/env";
import { Offer } from "@/types/Offer";
import { User } from "@/types/User";
import { isFirstSubscription, getLastSubscription } from "@/lib/utils";
import { subscriptionErrors, registerErrors } from "./errors";

if (!env.apiUrl) {
  throw new Error("API_URL is missing");
}

type UserData = {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  email: string;
  password: string;
};

type SubscribeData = {
  userId: string;
  offerId: string;
  status: string;
};

type UnsubscribeData = {
  status: string;
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

export async function getAvailableOffers(user: User): Promise<Offer[]> {
  const offers = await getOffers();

  // first subscription
  if (isFirstSubscription(user)) {
    return offers.filter((offer) => offer.allowFirstSubscription);
  }

  // resubscription
  const lastSubscription = getLastSubscription(user);
  const filteredOffers = offers.filter(
    (offer) =>
      offer.allowResubscription && offer.id !== lastSubscription.offerId,
  );
  return filteredOffers;
}

export async function getUpgradedOffer(currentOffer: Offer): Promise<Offer> {
  const offers = await getOffers();
  const offer = offers.find((offer) => {
    if (offer.price > currentOffer.price && offer.allowUpgrade) {
      return offer;
    }
  });
  return offer || currentOffer;
}

export async function createUser(userData: UserData) {
  const response = await fetch(`${env.apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    return { success: false, message: registerErrors[error?.statusCode] || "Inscription échoué" };
  }

  return { success: true, message: "Inscris avec succès" };
}

export async function subscribeOffer(subscribeData: SubscribeData) {
  const response = await fetch(`${env.apiUrl}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscribeData),
  });

  if (!response.ok) {
    const error = await response.json();
    return { success: false, message: subscriptionErrors[error?.statusCode] || "Abonnement échoué" };
  }

  return { success: true, message: "Abonné avec succès" };
}

export async function upgradeSubscription(
  subscriptionId: string,
  subscribeData: SubscribeData,
) {
  const response = await fetch(
    `${env.apiUrl}/subscriptions/${subscriptionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscribeData),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    return { success: false, message: subscriptionErrors[error?.statusCode] || "Changement d'abonnement échoué" };
  }

    return { success: true, message: "Abonné avec succès" };
}

export async function cancelSubscription(
  subscriptionId: string,
  unsubscribeData: UnsubscribeData,
) {
  const response = await fetch(
    `${env.apiUrl}/subscriptions/${subscriptionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unsubscribeData),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    return { success: false, message: subscriptionErrors[error?.statusCode] || "Désabonnement échoué" };
  }

  return { success: true, message: "Désabonné avec succès" };
}
