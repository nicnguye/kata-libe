"use server";

import { revalidatePath } from "next/cache";
import { subscriptionApi } from "@/lib/api/subscription.api";
import { redirect } from "next/navigation";

type ChangeSubscriptionData = {
  subscriptionId: string;
  offerId: string;
};

type State = {
  success: boolean;
  message: string;
};

export async function changeSubscription(
  changeSubscriptionData: ChangeSubscriptionData,
  prevState: State,
  formData: FormData,
) {
  const { subscriptionId, offerId } = changeSubscriptionData;
  const response = await subscriptionApi.upgradeSubscription(subscriptionId, {
    offerId,
  });

  if (!response.success) {
    return response;
  }

  revalidatePath("/");
  redirect(`/offers/${offerId}/upgrade`);
}
