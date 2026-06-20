import { api } from "@/lib/api/api";
import { Offer } from "@/types/Offer";

async function getOffer(id: string): Promise<Offer> {
  const response = await api(`offers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch offer");
  }

  return response.json();
}
async function getOffers(): Promise<Offer[]> {
  const response = await api("offers");

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  return response.json();
}
async function getUpgradedOffer(currentOffer: Offer): Promise<Offer> {
  const offers = await getOffers();
  const offer = offers.find((offer) => {
    if (offer.price > currentOffer.price && offer.allowUpgrade) {
      return offer;
    }
  });
  return offer || currentOffer;
}

export const offerApi = {
  getOffer,
  getOffers,
  getUpgradedOffer,
};
