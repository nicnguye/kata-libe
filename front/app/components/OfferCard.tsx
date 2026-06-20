import Image from "next/image";
import { Offer } from "@/types/Offer";

export default function OfferCard({
  title,
  price,
  description,
  advantage,
  isCurrentOffer,
}: Offer & { isCurrentOffer?: boolean }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-80 flex flex-col gap-4 hover:shadow-xl w-sm">
      <div>
        <h2 className="text-sky-800 text-2xl font-bold">{title}</h2>
        {isCurrentOffer && (
          <div className="flex gap-2 items-center">
            <Image
              src="/valid.png"
              alt="currentOffer"
              width={16}
              height={16}
            ></Image>
            <p className="text-sky-800">Abonné</p>
          </div>
        )}
      </div>

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
