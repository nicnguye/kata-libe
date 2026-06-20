import { User } from "@/types/User";
import { UserSubscription } from "@/types/UserSubscription";

export function getCurrentSubscription (user: User): UserSubscription | undefined {
    return user.subscription.find((s) => s.status === "ACTIVE");
}

export function isCurrentOffer (user: User, offerId: string): boolean {
    return getCurrentSubscription(user)?.offerId === offerId;
}

export function isFirstSubscription (user: User): boolean {
    return !user.subscription.length;
}

export function isResubscription (user: User): boolean {
    return user.subscription.length > 1;
}

export function getLastSubscription(user: User): UserSubscription {
  return user.subscription.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateB.getTime() - dateA.getTime();
  })[0];
}