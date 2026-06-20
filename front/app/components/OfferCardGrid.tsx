import Link from "next/link";
import OfferCard from "@/app/components/OfferCard";
import { Offer } from "@/types/Offer";

export default function OfferCardGrid({
  offers,
  currentOfferId,
}: {
  offers: Offer[];
  currentOfferId?: string;
}) {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {offers.map((offer) => (
        <Link key={offer.title} href={`/offers/${offer.id}`}>
          <OfferCard key={offer.title} isCurrentOffer={offer.id === currentOfferId} {...offer} />
        </Link>
      ))}
    </div>
  );
}
