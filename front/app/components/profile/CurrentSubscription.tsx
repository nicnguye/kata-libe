import OfferCard from "@/app/components/OfferCard";

type OfferCardProps = {
  title: string;
  price: number;
  description: string;
  advantage: string;
};

export default function CurrentSubscription({
  offer,
}: {
  offer: OfferCardProps;
}) {
  return (
    <div className="p-8 flex flex-col justify-center items-center gap-8">
      {offer ? (
        <>
          <h1 className="mb-6 text-3xl font-bold text-sky-800">
            Abonnement en cours
          </h1>
          <OfferCard key={offer.title} {...offer} />
        </>
      ) : (
        <h1 className="mb-6 text-3xl font-bold text-sky-800">
          Aucun abonnement en cours
        </h1>
      )}
    </div>
  );
}
