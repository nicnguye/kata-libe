import { Offer } from "./Offer";

export type UserSubscription = {
  id: string;
  offerId: string;
  status: string;
  updatedAt: Date;
  offer: Offer;
}