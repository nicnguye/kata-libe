import { getCurrentUser } from "@/lib/auth";
import { getOffers, getAvailableOffers } from "@/lib/api";
import { getCurrentSubscription } from "@/lib/utils";
import OfferCardGrid from "@/app/components/OfferCardGrid";

export default async function Home() {
  const user = await getCurrentUser();
  const offers = user ? await getAvailableOffers(user) : await getOffers();
  const subscription = user && getCurrentSubscription(user);

  return (
    <div className="p-8 flex flex-col justify-center items-center gap-8">
      <h1 className="mb-6 text-3xl font-bold text-sky-800">
        Nos offres mobiles
      </h1>
      <OfferCardGrid offers={offers} currentOfferId={subscription?.offerId} />
    </div>
  );
}
