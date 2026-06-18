"use client";

import { useActionState } from "react";
import { unsubscribe } from "@/app/subscription/unsubscribe/actions";

export default function UnsubscribeButton({
  subscriptionId,
}: {
  subscriptionId: string;
}) {
  const [state, action, isPending] = useActionState(
    unsubscribe.bind(null, { subscriptionId }),
    {
      success: false,
      message: "",
    },
  );

  return (
    <>
      <form action={action}>
        <button
          className="mt-4 w-sm text-white bg-sky-800 border border-transparent rounded-xs px-4 py-2.5 hover:bg-sky-900 cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Annulation en cours..." : "Se désabonner"}
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
