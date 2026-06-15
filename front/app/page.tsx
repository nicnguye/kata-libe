import { getOffers } from "@/lib/api";
import OfferCardGrid from "@/app/components/OfferCardGrid";

export default async function Home() {
  const offers = await getOffers();

  return (
    <div className="p-8 flex flex-col items-center gap-8">
      <h1 className="mb-6 text-3xl font-bold text-sky-800">
        Nos offres mobiles
      </h1>
      <OfferCardGrid offers={offers} />
    </div>
  );
}
