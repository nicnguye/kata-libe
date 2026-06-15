type OfferCardProps = {
  title: string;
  price: number;
  description: string;
  advantage: string;
};

export default function OfferCard({
  title,
  price,
  description,
  advantage,
}: OfferCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm max-w-sm h-80 flex flex-col gap-4">
      <h2 className="text-sky-800 text-2xl font-bold ">{title}</h2>

      <p className="text-sky-800">{description}</p>
      <p className="text-xl font-bold text-sky-800 text-center">{price}€/mois</p>

      <p className="text-sky-800">{advantage}</p>
    </div>
  );
}
