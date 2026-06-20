"use server";

import { revalidatePath } from "next/cache";
import { upgradeSubscription } from "@/lib/api";
import { redirect } from "next/navigation";

type ChangeSubscriptionData = {
  subscriptionId: string;
  userId: string;
  offerId: string;
};

type State = {
  success: boolean;
  message: string;
};

export async function changeSubscription(
  changeSubscriptionData: ChangeSubscriptionData,
  prevState: State,
  formData: FormData
) {
  const { subscriptionId, ...subscribeData } = changeSubscriptionData;
  try {
    await upgradeSubscription(subscriptionId, {
      ...subscribeData,
      status: "ACTIVE",
    });
    revalidatePath("/");
    redirect(`/offers/${subscribeData.offerId}/upgrade`);
  } catch (e) {
    return { success: false, message: "Une erreur est survenue" };
  }
}
