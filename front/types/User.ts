import { UserSubscription } from "@/types/UserSubscription";

export type User = {
  id: string;
  lastName: string;
  firstName: string;
  gender: string;
  age: number;
  email: string;
  subscription: Array<UserSubscription>;
};