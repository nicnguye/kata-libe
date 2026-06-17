import Link from "next/link";
import OfferCard from "@/app/components/OfferCard";
import { Offer } from "@/types/Offer";

export default function OfferCardGrid({
  offers,
}: {
  offers: Offer[];
}) {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {offers.map((offer) => (
        <Link key={offer.title} href={`/offers/${offer.id}`}>
          <OfferCard key={offer.title} {...offer} />
        </Link>
      ))}
    </div>
  );
}
