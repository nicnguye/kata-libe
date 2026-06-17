import { redirect } from "next/navigation";
import SubscriptionForm from "@/app/components/SubscriptionForm";
import OfferCard from "@/app/components/OfferCard";
import { getOffer } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const offer = await getOffer(id);

  return (
    <div className="flex flex-row flew-wrap gap-2 justify-center items-center p-6">
      <OfferCard {...offer} />
      <SubscriptionForm offerId={offer.id} user={user} />
    </div>
  );
}
