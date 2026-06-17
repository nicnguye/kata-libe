"use server";

import { revalidatePath } from "next/cache";
import { subscribeOffer } from "@/lib/api";
import { subscribeSchema } from "@/lib/validators/subscribe";
import { z } from "zod";

type State = {
  errors?: {
    email?: string[];
    address?: string[];
    phone?: string[];
    creditCard?: string[];
  };
  success?: boolean;
};

type SubscribeData = {
    userId: string;
    offerId: string;
}

export async function subscribe(subscribeData: SubscribeData, prevState: State, formData: FormData): Promise<State> {
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

    await subscribeOffer({ ...subscribeData, status: "ACTIVE" });

    revalidatePath("/")

    return { success: true };
}
