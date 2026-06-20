"use server";

import { revalidatePath } from "next/cache";
import { subscriptionApi } from "@/lib/api/subscription.api";
import { subscribeSchema } from "@/lib/validators/subscribe";
import { z } from "zod";
import { User } from "@/types/User";

type State = {
  errors?: {
    email?: string[];
    address?: string[];
    phone?: string[];
    creditCard?: string[];
  };
  success?: boolean;
  message?: string;
};

type SubscribeData = {
  user: User;
  offerId: string;
};

export async function subscribe(
  subscribeData: SubscribeData,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const email = formData.get("email") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const creditCard = formData.get("creditCard") as string;

  const data = {
    email,
    address,
    phone,
    creditCard,
  };

  const validation = subscribeSchema.safeParse(data);
  if (!validation.success) {
    return { errors: z.flattenError(validation.error).fieldErrors };
  }

  const hasSubscription = subscribeData.user.subscription.find(
    (s) => s.status === "ACTIVE",
  );
  if (hasSubscription) {
    return { success: false, message: "Vous avez déjà une abonnement actif" };
  }

  const response = await subscriptionApi.subscribeOffer({
    userId: subscribeData.user.id,
    offerId: subscribeData.offerId,
  });

  revalidatePath("/");

  return response;
}
