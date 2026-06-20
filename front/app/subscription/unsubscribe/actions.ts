"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { subscriptionApi } from "@/lib/api/subscription.api";

type UnsubscribeData = {
  subscriptionId: string;
};

type State = {
  success: boolean;
  message: string;
};

export async function unsubscribe(
  unsubscribeData: UnsubscribeData,
  prevState: State,
  formData: FormData,
) {
  const { subscriptionId } = unsubscribeData;
  const response = await subscriptionApi.cancelSubscription(subscriptionId);

  if (!response.success) {
    return response;
  }

  revalidatePath("/");
  redirect("/");
}
