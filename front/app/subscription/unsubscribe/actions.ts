"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cancelSubscription } from "@/lib/api";

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
  try {
    await cancelSubscription(subscriptionId, {
      status: "CANCELLED",
    });
  } catch (e) {
    return { success: false, message: "Une erreur est survenue" };
  }
  revalidatePath("/");

  redirect("/");
}
