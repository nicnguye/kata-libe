import Link from "next/link";
import OfferCard from "@/app/components/OfferCard";
import { getOffer } from "@/lib/api";

export default async function OfferPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const offer = await getOffer(id);

  return (
    <div className="flex flex-col justify-center items-center px-6 py-12 gap-4">
      <OfferCard key={offer.title} {...offer} />
      <Link href={`/offers/${offer.id}/subscribe`}>
        <button
          type="button"
          className="w-sm text-white bg-sky-800 border border-transparent rounded-xs px-4 py-2.5 hover:bg-sky-900 cursor-pointer"
        >
          {"S'abonner"}
        </button>
      </Link>
    </div>
  );
}
