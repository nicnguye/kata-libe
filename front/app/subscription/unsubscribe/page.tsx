import { redirect } from "next/navigation";

import OfferCard from "@/app/components/OfferCard";
import UnsubscribeButton from "@/app/components/UnsubscribeButton";
import { getCurrentUser } from "@/lib/auth";
import { getCurrentSubscription } from "@/lib/utils";

export default async function UnsubscribePage() {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }

  const subscription = getCurrentSubscription(user);

  if (!subscription) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col items-center">
        <h1 className="h-20 text-center text-3xl font-bold text-sky-800">
          Voulez-vous annuler votre abonnement ?
        </h1>
        <OfferCard key={subscription.offer.title} {...subscription.offer} />
        <UnsubscribeButton subscriptionId={subscription.id} />
      </div>
    </div>
  );
}
