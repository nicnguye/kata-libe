import { redirect } from "next/navigation";
import SubscriptionForm from "@/app/components/SubscriptionForm";
import OfferCard from "@/app/components/OfferCard";
import { offerApi } from "@/lib/api/offer.api";
import { authApi } from "@/lib/api/auth.api";

export default async function OfferSubscribePage({ params }: { params: { id: string } }) {
  const user = await authApi.getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const offer = await offerApi.getOffer(id);

  return (
    <div className="flex flex-row flew-wrap gap-2 justify-center items-center p-6">
      <OfferCard {...offer} />
      <SubscriptionForm offerId={offer.id} user={user} />
    </div>
  );
}
