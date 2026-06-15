import OfferCard from "@/app/components/OfferCard";
import { getOffer } from "@/lib/api";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const offer = await getOffer(id);

  return (
    <div className="p-8">
      <OfferCard key={offer.title} {...offer} />
    </div>
  );
}
