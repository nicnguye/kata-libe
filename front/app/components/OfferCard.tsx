import Image from "next/image";
import { Offer } from "@/types/Offer";

export default function OfferCard({
  title,
  price,
  description,
  advantage,
}: Offer) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-80 flex flex-col gap-4 hover:shadow-xl w-sm">
      <h2 className="text-sky-800 text-2xl font-bold">{title}</h2>

      <p className="text-sky-800">{description}</p>
      <p className="text-xl font-bold text-sky-800 text-center mt-auto">
        {price}€/mois
      </p>

      <div className="flex gap-2 items-center mt-auto">
        <Image
          src="/mobile.svg"
          alt="advantage"
          width={24}
          height={24}
        ></Image>
        <p className="text-sky-800">{advantage}</p>
      </div>
    </div>
  );
}
