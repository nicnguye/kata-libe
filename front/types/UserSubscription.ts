import { Offer } from "./Offer";

export type UserSubscription = {
  offerId: string;
  status: string;
  offer: Offer;
}