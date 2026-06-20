import { api } from "@/lib/api/api";
import { subscriptionErrors } from "@/lib/errors";
import { tokenService } from "@/lib/services/token.service";

type SubscribeData = {
  userId: string;
  offerId: string;
};

type UpgradeSubscriptionData = {
  offerId: string;
};

async function subscribeOffer(subscribeData: SubscribeData) {
  const response = await api("subscriptions", {
    method: "POST",
    body: JSON.stringify(subscribeData),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      success: false,
      message: subscriptionErrors[error?.statusCode] || "Abonnement échoué",
    };
  }

  return { success: true, message: "Abonné avec succès" };
}

async function upgradeSubscription(
  subscriptionId: string,
  upgradeSubscriptionData: UpgradeSubscriptionData,
) {
  const token = await tokenService.getToken();

  if (!token) {
    return {
      success: false,
      message: "Changement d'abonnement échoué",
    };
  }

  const response = await api(`subscriptions/${subscriptionId}/change`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(upgradeSubscriptionData),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      success: false,
      message:
        subscriptionErrors[error?.statusCode] ||
        "Changement d'abonnement échoué",
    };
  }

  return { success: true, message: "Abonné avec succès" };
}

async function cancelSubscription(subscriptionId: string) {
  const token = await tokenService.getToken();

  if (!token) {
    return {
      success: false,
      message: "Désabonnement échoué",
    };
  }

  const response = await api(`subscriptions/${subscriptionId}/cancel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      success: false,
      message: subscriptionErrors[error?.statusCode] || "Désabonnement échoué",
    };
  }

  return { success: true, message: "Désabonné avec succès" };
}

export const subscriptionApi = {
  subscribeOffer,
  upgradeSubscription,
  cancelSubscription,
};
