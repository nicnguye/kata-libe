import { Offer } from "./Offer";

export type UserSubscription = {
  id: string;
  offerId: string;
  status: string;
  offer: Offer;
}