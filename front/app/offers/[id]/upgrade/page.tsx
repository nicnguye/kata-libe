import OfferCard from "@/app/components/OfferCard";
import { getOffer } from "@/lib/api";

export default async function OfferUpgradePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const offer = await getOffer(id);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col items-center">
        <h1 className="h-20 text-center text-3xl font-bold text-sky-800">
          🎉 Félicitations ! Voici votre nouvelle offre 🎉
        </h1>
        <OfferCard key={offer.title} {...offer} />
      </div>
    </div>
  );
}
