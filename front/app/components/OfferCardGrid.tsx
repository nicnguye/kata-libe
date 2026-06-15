import Link from "next/link";
import OfferCard from "@/app/components/OfferCard";

type OfferCardProps = {
  id: string;
  title: string;
  price: number;
  description: string;
  advantage: string;
};

export default function OfferCardGrid({
  offers,
}: {
  offers: OfferCardProps[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {offers.map((offer) => (
        <Link key={offer.title} href={`/offers/${offer.id}`}>
          <OfferCard key={offer.title} {...offer} />
        </Link>
      ))}
    </div>
  );
}
