import { offerApi } from "@/lib/api/offer.api";
import { User } from "@/types/User";
import { Offer } from "@/types/Offer";
import { isFirstSubscription, getLastSubscription } from "@/lib/utils";

async function getAvailableOffers(user: User): Promise<Offer[]> {
  const offers = await offerApi.getOffers();

  // filter first subscription offers
  if (isFirstSubscription(user)) {
    return offers.filter((offer) => offer.allowFirstSubscription);
  }

  // filter resubscription offers
  const lastSubscription = getLastSubscription(user);
  const filteredOffers = offers.filter(
    (offer) =>
      offer.allowResubscription && offer.id !== lastSubscription.offerId,
  );
  return filteredOffers;
}

async function getUpgradedOffer(currentOffer: Offer): Promise<Offer> {
  const offers = await offerApi.getOffers();
  const offer = offers.find((offer) => {
    if (offer.price > currentOffer.price && offer.allowUpgrade) {
      return offer;
    }
  });
  return offer || currentOffer;
}

export const offerService = {
  getAvailableOffers,
  getUpgradedOffer,
};
