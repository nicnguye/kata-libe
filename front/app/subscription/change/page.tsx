import { redirect } from "next/navigation";

import OfferCard from "@/app/components/OfferCard";
import ChangeSubscriptionButton from "@/app/components/ChangeSubscriptionButton";
import { offerService } from "@/lib/services/offer.service";
import { authApi } from "@/lib/api/auth.api";
import { getCurrentSubscription } from "@/lib/utils";

export default async function SubscriptionChangePage() {
  const user = await authApi.getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }

  const subscription = getCurrentSubscription(user);

  if (!subscription) {
    redirect("/");
  }

  const upgradedOffer = await offerService.getUpgradedOffer(subscription.offer);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col items-center">
          <h1 className="h-20 text-center text-3xl font-bold text-sky-800">
            Votre offre actuelle
          </h1>
          <OfferCard key={subscription.offer.title} {...subscription.offer} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="h-20 text-center text-3xl font-bold text-sky-800">
            {"L'offre supérieure 🚀"}
          </h1>
          {upgradedOffer.id === subscription.offer.id ? (
            <p>Aucune offre supérieure disponible</p>
          ) : (
            <>
              <OfferCard key={upgradedOffer.title} {...upgradedOffer} />
              <ChangeSubscriptionButton  subscriptionId={subscription.id} offerId={upgradedOffer.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
