"use client";

import { useActionState } from "react";
import { changeSubscription } from "@/app/subscription/change/actions";

export default function ChangeSubscriptionButton({
  subscriptionId,
  userId,
  offerId,
}: {
  subscriptionId: string;
  userId: string;
  offerId: string;
}) {
  const [state, action, isPending] = useActionState(
    changeSubscription.bind(null, { subscriptionId, userId, offerId }),
    {
      success: false,
      message: "",
    },
  );

  return (
    <>
      <form action={action}>
        <button
          className="mt-4 w-full text-white bg-sky-800 border border-transparent rounded-xs px-4 py-2.5 hover:bg-sky-900 cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Changement en cours..." : "Changer mon offre"}
        </button>
      </form>
      {state?.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}
    </>
  );
}
